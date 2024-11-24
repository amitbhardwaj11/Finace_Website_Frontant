export function initNavigation() {
    const nav = document.querySelector('nav');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuButton?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}