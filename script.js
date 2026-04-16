// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
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
                section.classList.add('active-section');
                section.style.animation = 'fadeInUp 0.5s ease';
            } else {
                section.classList.remove('active-section');
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
    
    document.querySelectorAll('.dish-card, .feature-card, .info-card').forEach(item => {
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

// ============================================
// CHARGEMENT MANUEL DES MODÈLES 3D
// ============================================
window.loadModel = function(modelId, button) {
    const modelViewer = document.getElementById(modelId);
    const arButtonId = 'ar-' + modelId.replace('model-', '');
    const arButton = document.getElementById(arButtonId);
    const indicator = document.getElementById('indicator-' + modelId.replace('model-', ''));
    
    if (!modelViewer) return;
    
    button.style.display = 'none';
    
    if (indicator) {
        indicator.textContent = '⏳ Chargement en cours...';
        indicator.classList.add('visible');
    }
    
    const dataSrc = modelViewer.getAttribute('data-src');
    
    if (dataSrc) {
        modelViewer.setAttribute('src', dataSrc);
        modelViewer.classList.add('model-loading');
        
        modelViewer.addEventListener('load', function onLoad() {
            modelViewer.classList.remove('model-loading');
            modelViewer.classList.add('model-loaded');
            
            if (arButton) {
                arButton.style.display = 'inline-flex';
            }
            
            if (indicator) {
                indicator.textContent = '✅ Modèle chargé';
                setTimeout(() => {
                    indicator.classList.remove('visible');
                }, 2000);
            }
            
            modelViewer.removeEventListener('load', onLoad);
        }, { once: true });
        
        modelViewer.addEventListener('error', function onError() {
            modelViewer.classList.remove('model-loading');
            
            if (indicator) {
                indicator.textContent = '❌ Erreur de chargement';
                setTimeout(() => {
                    indicator.classList.remove('visible');
                }, 2000);
            }
            
            button.style.display = 'inline-flex';
            
            modelViewer.removeEventListener('error', onError);
        }, { once: true });
    }
};

// ============================================
// FONCTION AR
// ============================================
window.activateAR = function(modelId) {
    const modelViewer = document.getElementById(modelId);
    if (!modelViewer) return;
    
    try {
        modelViewer.activateAR();
    } catch (e) {
        console.log('AR non disponible sur ce navigateur');
    }
};
