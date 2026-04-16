document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Category Filter System
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    function filterSections(category) {
        menuSections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            if (category === 'all' || sectionCategory === category) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            filterSections(category);
        });
    });
    
    // 3D Model Toggle
    const menuItems = document.querySelectorAll('.menu-item.has-3d');
    
    menuItems.forEach(item => {
        const tableButton = item.querySelector('.btn-table');
        const modelContainer = item.querySelector('.model-container');
        const modelViewer = modelContainer ? modelContainer.querySelector('model-viewer') : null;
        const glbUrl = item.getAttribute('data-glb');
        
        if (tableButton && modelContainer && modelViewer && glbUrl) {
            modelContainer.style.display = 'none';
            
            tableButton.addEventListener('click', () => {
                if (modelContainer.style.display === 'none') {
                    if (!modelViewer.src) {
                        modelViewer.src = glbUrl;
                    }
                    modelContainer.style.display = 'block';
                    tableButton.innerHTML = '<i class="fas fa-eye-slash"></i> cacher le plat';
                } else {
                    modelContainer.style.display = 'none';
                    tableButton.innerHTML = '<i class="fas fa-eye"></i> voir le plat à table';
                }
            });
        }
    });
    
    // Animation on scroll
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
    
    document.querySelectorAll('.menu-item, .feature-card, .info-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Current year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Vibe Bistrot - Tous droits réservés`;
    }
});
