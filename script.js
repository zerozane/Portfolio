// ========================================
// Typing Effect
// ========================================
const typingTexts = [
    "Frontend Developer",
    "UX/UI Designer",
    "Business Analyst",
    "IT Support"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 300;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Active Nav Link Highlight
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Mobile Nav Toggle
// ========================================
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
    });
});

// ========================================
// Premium Smooth Scroll (Lenis-style easing)
// ========================================
function smoothScrollTo(targetEl, duration = 1000) {
    const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - 80;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Cubic bezier easing for premium feel
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);

        window.scrollTo(0, startPosition + distance * eased);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            smoothScrollTo(target, 1200); // 1.2s for premium feel
        }
    });
});

// ========================================
// Scroll Reveal Animation
// ========================================
const revealElements = document.querySelectorAll(
    '.about-card, .skill-card, .contact-item, .contact-form, .section-header, .project-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========================================
// Staggered Animation for Grid Items
// ========================================
const skillCards = document.querySelectorAll('.skill-card');

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const index = Array.from(skillCards).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.08}s`;
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
});

skillCards.forEach(card => staggerObserver.observe(card));

// ========================================
// Contact Form Handler
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-primary');
    const originalText = btn.textContent;

    btn.textContent = '✓ ส่งเรียบร้อยแล้ว!';
    btn.style.background = 'linear-gradient(135deg, #5dad76, #7cc98f)';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
    }, 2500);
});

// ========================================
// Project Image Carousel
// ========================================
(function () {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImg = document.getElementById('fullscreenImg');
    const closeBtn = document.getElementById('closeFullscreenBtn');
    const fullscreenBtnAlt = document.getElementById('fullscreenBtnAlt');
    const fsPrev = document.getElementById('fullscreenPrev');
    const fsNext = document.getElementById('fullscreenNext');

    if (!slides.length) return;

    let current = 0;
    let autoPlayTimer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function updateFullscreenImg() {
        fullscreenImg.src = slides[current].src;
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(() => goTo(current + 1), 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); resetAutoPlay(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); resetAutoPlay(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); resetAutoPlay(); });
    });

    // Click slide to open fullscreen
    function openFullscreen() {
        updateFullscreenImg();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        clearInterval(autoPlayTimer);
    }

    slides.forEach(slide => {
        slide.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = Array.from(slides).indexOf(slide);
            goTo(idx);
            openFullscreen();
        });
    });

    if (fullscreenBtnAlt) {
        fullscreenBtnAlt.addEventListener('click', openFullscreen);
    }

    // Fullscreen navigation
    fsPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        goTo(current - 1);
        updateFullscreenImg();
    });

    fsNext.addEventListener('click', (e) => {
        e.stopPropagation();
        goTo(current + 1);
        updateFullscreenImg();
    });

    function closeFullscreen() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        startAutoPlay();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeFullscreen);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeFullscreen();
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeFullscreen();
        if (e.key === 'ArrowLeft') { goTo(current - 1); updateFullscreenImg(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); updateFullscreenImg(); }
    });

    startAutoPlay();
})();

