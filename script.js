// Page Loader
// window.addEventListener('load', () => {
//     const loader = document.getElementById('loader');
//     setTimeout(() => {
//         loader.classList.add('hidden');
//     }, 1000);
// });

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const warnDiv = document.querySelector('.warn');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    warnDiv.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        warnDiv.classList.remove('hidden')
    });
});

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Staggered animations for cards
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(13, 8, 24, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(13, 8, 24, 0.9)';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Add hover effect to collection cards
const collectionCards = document.querySelectorAll('.collection-card');
collectionCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Random color generation for avatars
function getRandomGradient() {
    const colors = [
        'linear-gradient(135deg, #8b2fc9, #d946ef)',
        'linear-gradient(135deg, #f59e0b, #ef4444)',
        'linear-gradient(135deg, #10b981, #14b8a6)',
        'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'linear-gradient(135deg, #ec4899, #f43f5e)',
        'linear-gradient(135deg, #06b6d4, #6366f1)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Apply random gradients to avatars
const avatars = document.querySelectorAll('.collection-avatar');
avatars.forEach(avatar => {
    avatar.style.background = getRandomGradient();
});

// Parallax effect on hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.innerWidth > 768) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
    const buttons = document.querySelectorAll('.btn, .collection-card, .creator-card');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('touchend', function () {
            this.style.transform = '';
        });
    });
}

// Prevent horizontal scroll
document.body.style.overflowX = 'hidden';

// ========================================
// Product Cards Animation
// ========================================

const productCards = document.querySelectorAll('.product-card');

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            productObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

productCards.forEach(card => {
    productObserver.observe(card);
});



// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") != "true") {
        ageModal.style.display = "flex";
    } else {
        ageModal.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Dostęp zabroniony. Strona tylko dla osób 18+");
    window.close();
    window.location.href = "https://www.google.pl";
});

// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
if (warn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            warn.style.display = "none";
        } else {
            warn.style.display = "";
        }
    });
}


const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");
city.addEventListener("click", toggleCont);
function toggleCont() {
    city.classList.toggle("active");
    Array.from(cont).forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}


// ========================================
// Image Slider Functionality
// ========================================

const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.slider-btn-prev');
const nextBtn = document.querySelector('.slider-btn-next');
const indicators = document.querySelectorAll('.slider-indicator');

let currentSlide = 0;
const totalSlides = sliderItems.length;
let autoPlayInterval;

// Function to update slider position
function updateSlider(animate = true) {
    if (!sliderTrack) return;

    // Update track position
    const translateX = -currentSlide * 100;
    if (animate) {
        sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        sliderTrack.style.transition = 'none';
    }
    sliderTrack.style.transform = `translateX(${translateX}%)`;

    // Update active states
    sliderItems.forEach((item, index) => {
        if (index === currentSlide) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Navigate to specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    updateSlider();
    resetAutoPlay();
}

// Next slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Auto-play functionality
// function startAutoPlay() {
//     autoPlayInterval = setInterval(() => {
//         nextSlide();
//     }, 5000); Change slide every 5 seconds
// }

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Event listeners for navigation buttons
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
const sliderContainer = document.querySelector('.slider-container');

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoPlay();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left, go to next
            nextSlide();
        } else {
            // Swiped right, go to previous
            prevSlide();
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!sliderContainer) return;

    // Check if slider is in viewport
    const rect = sliderContainer.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (isInViewport) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }
});

// Pause auto-play when user hovers over slider
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
}

// Initialize slider
if (sliderTrack && sliderItems.length > 0) {
    updateSlider(false);
    startAutoPlay();
}

// Pause auto-play when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
});