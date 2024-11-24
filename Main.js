import { initNavigation } from './components/navigation.js';
import { ExpenseTracker } from './components/expenseTracker.js';
import { initContactForm } from './components/contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    new ExpenseTracker();
    initContactForm();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});