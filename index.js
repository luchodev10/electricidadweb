// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navigation functionality for desktop
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        navBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get the section to scroll to
        const sectionId = btn.getAttribute('data-tab');
        scrollToSection(sectionId);
    });
});

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');

mobileMenuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
});

// Navigation functionality for mobile
mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all mobile buttons
        mobileNavBtns.forEach(b => b.classList.remove('active'));
        // Remove active class from all desktop buttons
        navBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Find corresponding desktop button and make it active too
        const sectionId = btn.getAttribute('data-tab');
        navBtns.forEach(b => {
            if (b.getAttribute('data-tab') === sectionId) {
                b.classList.add('active');
            }
        });
        
        // Hide mobile menu
        mobileNav.classList.remove('show');
        
        // Scroll to section
        scrollToSection(sectionId);
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu')) {
        mobileNav.classList.remove('show');
    }
});

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px extra margin
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Update active nav button on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    if (current) {
        // Update desktop navigation
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === current) {
                btn.classList.add('active');
            }
        });
        
        // Update mobile navigation
        mobileNavBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === current) {
                btn.classList.add('active');
            }
        });
    }
});

// Animaciones al hacer scroll con IntersectionObserver
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Si quieres que solo se animen una vez:
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 }); // 0.2 = cuando el 20% sea visible

reveals.forEach(reveal => {
    observer.observe(reveal);
});
