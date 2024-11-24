export function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Simulate form submission
        console.log({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        });
        
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
}