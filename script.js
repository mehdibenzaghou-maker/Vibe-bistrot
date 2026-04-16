// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // 3D Model Viewer Toggle Functionality
    const menuItems = document.querySelectorAll('.menu-item.has-3d');
    
    menuItems.forEach(item => {
        const button = item.querySelector('.btn-3d');
        const modelContainer = item.querySelector('.model-container');
        const modelViewer = modelContainer ? modelContainer.querySelector('model-viewer') : null;
        const glbUrl = item.getAttribute('data-glb');
        
        if (button && modelContainer && modelViewer && glbUrl) {
            // Initially hide the model container
            modelContainer.style.display = 'none';
            
            button.addEventListener('click', () => {
                if (modelContainer.style.display === 'none') {
                    // Set the GLB source if not already set
                    if (!modelViewer.src) {
                        modelViewer.src = glbUrl;
                    }
                    modelContainer.style.display = 'block';
                    button.innerHTML = '<i class="fas fa-eye-slash"></i> cacher le plat 🙈';
                    button.style.backgroundColor = '#c9a96e';
                } else {
                    modelContainer.style.display = 'none';
                    button.innerHTML = '<i class="fas fa-utensils"></i> montrez le plat 🍽️';
                    button.style.backgroundColor = '';
                }
            });
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add animation on scroll for menu items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Set current year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Vibe Bistrot - Tous droits réservés`;
    }
});
