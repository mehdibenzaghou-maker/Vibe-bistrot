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
    
    // ========== CATEGORY FILTER SYSTEM ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    function filterSections(category) {
        menuSections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            if (category === 'all' || sectionCategory === category) {
                section.classList.remove('hidden');
                // Add animation
                section.style.animation = 'fadeInUp 0.5s ease';
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter sections
            const category = btn.getAttribute('data-category');
            filterSections(category);
        });
    });
    
    // ========== 3D MODEL VIEWER TOGGLE ==========
    const menuItems = document.querySelectorAll('.menu-item.has-3d');
    
    menuItems.forEach(item => {
        const button3d = item.querySelector('.btn-3d');
        const buttonAr = item.querySelector('.btn-ar');
        const modelContainer = item.querySelector('.model-container');
        const modelViewer = modelContainer ? modelContainer.querySelector('model-viewer') : null;
        const glbUrl = item.getAttribute('data-glb');
        
        if (button3d && modelContainer && modelViewer && glbUrl) {
            // Initially hide the model container
            modelContainer.style.display = 'none';
            
            // 3D View Button
            button3d.addEventListener('click', () => {
                if (modelContainer.style.display === 'none') {
                    if (!modelViewer.src) {
                        modelViewer.src = glbUrl;
                    }
                    modelContainer.style.display = 'block';
                    button3d.innerHTML = '<i class="fas fa-eye-slash"></i> cacher le plat 🙈';
                    button3d.style.backgroundColor = '#D4A373';
                } else {
                    modelContainer.style.display = 'none';
                    button3d.innerHTML = '<i class="fas fa-utensils"></i> montrez le plat 🍽️';
                    button3d.style.backgroundColor = '';
                }
            });
            
            // AR Quick Look Button
            if (buttonAr) {
                buttonAr.addEventListener('click', () => {
                    // For AR Quick Look on iOS
                    if (modelViewer && glbUrl) {
                        // Method 1: Use model-viewer's AR capabilities
                        modelViewer.src = glbUrl;
                        modelViewer.activateAR();
                        
                        // Method 2: Fallback - open in USDZ if available
                        // Show notification
                        buttonAr.innerHTML = '<i class="fas fa-vr-cardboard"></i> Lancement AR... 📱';
                        setTimeout(() => {
                            buttonAr.innerHTML = '<i class="fas fa-vr-cardboard"></i> AR Quick Look 📱';
                        }, 2000);
                    }
                });
            }
        }
    });
    
    // ========== ANIMATION ON SCROLL ==========
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
    
    // Set current year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Vibe Bistrot - Tous droits réservés`;
    }
    
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
});
