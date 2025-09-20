// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navigation functionality
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
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === current) {
                btn.classList.add('active');
            }
        });
    }
});