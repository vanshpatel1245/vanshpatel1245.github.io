// ============================================
// INITIALIZE FEATHER ICONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    
    // Initialize magnetic button effect after DOM is ready
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
            opacity: 0;
        }
        
        .custom-cursor.active {
            opacity: 1;
        }
        
        .custom-cursor.hover {
            transform: scale(1.5);
            border-color: rgba(255, 255, 255, 0.8);
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-link, .skill-tag, .tech-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// CONTACT FORM HANDLING (Frontend Only)
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form (basic validation)
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message (frontend only)
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ============================================
// AUTO-UPDATE COPYRIGHT YEAR
// ============================================
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// KEYBOARD ACCESSIBILITY - ESC TO CLOSE MOBILE MENU
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// ADD SCROLL EFFECT TO NAVBAR
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// ANIMATE LANGUAGE PROGRESS BARS ON SCROLL INTO VIEW
// ============================================
const languageBars = document.querySelectorAll('.language-bar');

function animateLanguageBars() {
    languageBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, index * 200);
        }
    });
}

const languagesSection = document.getElementById('languages');

if (languagesSection && languageBars.length > 0) {
    let languageBarsAnimated = false;

    function triggerLanguageBarsOnce() {
        if (languageBarsAnimated) return;
        languageBarsAnimated = true;
        animateLanguageBars();
    }

    if ('IntersectionObserver' in window) {
        const langObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerLanguageBarsOnce();
                    langObserver.disconnect(); // Only animate once
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        langObserver.observe(languagesSection);
    }

    // Scroll-based fallback in case the observer never fires
    // (e.g. section already in view on load, or edge-case browser behavior)
    function checkLanguagesInView() {
        const rect = languagesSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            triggerLanguageBarsOnce();
            window.removeEventListener('scroll', checkLanguagesInView);
        }
    }

    window.addEventListener('scroll', checkLanguagesInView);
    window.addEventListener('load', () => {
        setTimeout(checkLanguagesInView, 300);
    });
}

// ============================================
// SCROLL ANIMATIONS FOR SECTIONS - Palantir Style
// ============================================
// Removed section animations to ensure all content is visible immediately

// ============================================
// SUBTLE PARALLAX EFFECT - Palantir Style
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});
