// ========================================
// Testimonials Slider Functionality
// ========================================

const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialsItems = document.querySelectorAll('.testimonial-card');
const testimonialsPrevBtn = document.querySelector('.testimonials-btn-prev');
const testimonialsNextBtn = document.querySelector('.testimonials-btn-next');
const testimonialsIndicatorsContainer = document.querySelector('.testimonials-indicators');

let currentTestimonialSlide = 0;
const totalTestimonialSlides = testimonialsItems.length;
let testimonialsAutoPlayInterval;

// Get slides per view based on screen size
function getSlidesPerView() {
    if (window.innerWidth >= 1024) {
        return 3;
    } else if (window.innerWidth >= 768) {
        return 2;
    } else {
        return 1;
    }
}

// Get number of dots based on screen width - ALIGNED WITH SLIDES PER VIEW
function getDotsCount() {
    if (window.innerWidth >= 1024) {
        return 2; // Desktop: 3 cards visible. Groups: [0,1,2], [3,4,5]
    } else if (window.innerWidth >= 768) {
        return 3; // Tablet: 2 cards visible. Groups: [0,1], [2,3], [4,5]
    } else {
        return 6; // Mobile: 1 card visible. Groups: [0], [1], [2], [3], [4], [5]
    }
}

// Generate indicator dots dynamically
function generateIndicators() {
    if (!testimonialsIndicatorsContainer) return;

    // Fixed syntax error here (removed 'y')
    const dotsCount = getDotsCount();
    testimonialsIndicatorsContainer.innerHTML = '';

    for (let i = 0; i < dotsCount; i++) {
        const button = document.createElement('button');
        button.className = 'testimonials-indicator';
        button.setAttribute('data-slide', i);
        button.setAttribute('aria-label', `Review ${i + 1}`);
        button.type = "button"; // Explicitly set button type

        // Add click listener
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent accidental double-tap zoom or weird behaviors
            goToTestimonialSlide(i);
        });

        testimonialsIndicatorsContainer.appendChild(button);
    }
    // Update active state immediately after generation
    updateActiveIndicator();
}

// Separate function to update just the active indicator visual state
function updateActiveIndicator() {
    const indicators = document.querySelectorAll('.testimonials-indicator');
    const dotsCount = getDotsCount();

    // Calculate which dot should be active based on current slide
    let activeDotIndex = 0;

    if (dotsCount === 6) {
        // Mobile: 1-to-1 mapping
        activeDotIndex = currentTestimonialSlide;
    } else if (dotsCount === 3) {
        // Tablet: 2 cards per view (indices 0,1 -> dot 0; 2,3 -> dot 1; 4,5 -> dot 2)
        activeDotIndex = Math.floor(currentTestimonialSlide / 2);
    } else if (dotsCount === 2) {
        // Desktop: 3 cards per view (indices 0,1,2 -> dot 0; 3,4,5 -> dot 1)
        activeDotIndex = Math.floor(currentTestimonialSlide / 3);
    }

    indicators.forEach((indicator, index) => {
        if (index === activeDotIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Function to update testimonials slider position
function updateTestimonialsSlider(animate = true) {
    if (!testimonialsTrack) return;

    const slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    const translateX = -currentTestimonialSlide * slideWidth;

    if (animate) {
        testimonialsTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        testimonialsTrack.style.transition = 'none';
    }
    testimonialsTrack.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    updateActiveIndicator();
}

// Navigate to specific testimonial slide
function goToTestimonialSlide(dotIndex) {
    const dotsCount = getDotsCount();

    // Convert dot index to target slide index based on screen size
    if (dotsCount === 6) {
        currentTestimonialSlide = dotIndex;
    } else if (dotsCount === 3) {
        currentTestimonialSlide = dotIndex * 2;
    } else if (dotsCount === 2) {
        currentTestimonialSlide = dotIndex * 3;
    }

    // Boundary checks
    if (currentTestimonialSlide < 0) {
        currentTestimonialSlide = 0;
    }
    if (currentTestimonialSlide >= totalTestimonialSlides) {
        currentTestimonialSlide = 0;
    }

    updateTestimonialsSlider();
    resetTestimonialsAutoPlay();
}

// Next testimonial slide
function nextTestimonialSlide() {
    currentTestimonialSlide++;

    if (currentTestimonialSlide >= totalTestimonialSlides) {
        currentTestimonialSlide = 0;
    }

    updateTestimonialsSlider();
    resetTestimonialsAutoPlay();
}

// Previous testimonial slide
function prevTestimonialSlide() {
    currentTestimonialSlide--;

    if (currentTestimonialSlide < 0) {
        currentTestimonialSlide = totalTestimonialSlides - 1;
    }

    updateTestimonialsSlider();
    resetTestimonialsAutoPlay();
}

// Auto-play functionality for testimonials
function startTestimonialsAutoPlay() {
    testimonialsAutoPlayInterval = setInterval(() => {
        nextTestimonialSlide();
    }, 5000);
}

function stopTestimonialsAutoPlay() {
    if (testimonialsAutoPlayInterval) {
        clearInterval(testimonialsAutoPlayInterval);
    }
}

function resetTestimonialsAutoPlay() {
    stopTestimonialsAutoPlay();
    startTestimonialsAutoPlay();
}

// Event listeners for navigation buttons
if (testimonialsPrevBtn && testimonialsNextBtn) {
    testimonialsPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevTestimonialSlide();
    });

    testimonialsNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextTestimonialSlide();
    });
}

// Touch/Swipe support
let testimonialTouchStartX = 0;
let testimonialTouchEndX = 0;
const testimonialsContainer = document.querySelector('.testimonials-slider-container');

if (testimonialsContainer) {
    testimonialsContainer.addEventListener('touchstart', (e) => {
        testimonialTouchStartX = e.changedTouches[0].screenX;
        stopTestimonialsAutoPlay();
    }, { passive: true });

    testimonialsContainer.addEventListener('touchend', (e) => {
        testimonialTouchEndX = e.changedTouches[0].screenX;
        handleTestimonialSwipe();
        resetTestimonialsAutoPlay();
    }, { passive: true });
}

function handleTestimonialSwipe() {
    const swipeThreshold = 50;
    const diff = testimonialTouchStartX - testimonialTouchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextTestimonialSlide();
        } else {
            prevTestimonialSlide();
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!testimonialsContainer) return;
    const rect = testimonialsContainer.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (isInViewport) {
        if (e.key === 'ArrowLeft') {
            prevTestimonialSlide();
        } else if (e.key === 'ArrowRight') {
            nextTestimonialSlide();
        }
    }
});

// Hover pause
if (testimonialsContainer) {
    testimonialsContainer.addEventListener('mouseenter', stopTestimonialsAutoPlay);
    testimonialsContainer.addEventListener('mouseleave', startTestimonialsAutoPlay);
}

// Resize handler
let testimonialsResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(testimonialsResizeTimeout);
    testimonialsResizeTimeout = setTimeout(() => {
        currentTestimonialSlide = 0;
        generateIndicators();
        updateTestimonialsSlider(false);
    }, 250);
});

// Initialize
if (testimonialsTrack && testimonialsItems.length > 0) {
    generateIndicators();
    updateTestimonialsSlider(false);
    startTestimonialsAutoPlay();
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTestimonialsAutoPlay();
    } else {
        startTestimonialsAutoPlay();
    }
});
