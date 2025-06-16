// Custom JavaScript for High Heels Dance Store

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(111, 66, 193, 0.95), rgba(253, 126, 20, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const comentario = document.getElementById('comentario').value.trim();
            
            if (!nombre || !email || !telefono || !comentario) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, introduce una dirección de email válida.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
            if (!phoneRegex.test(telefono)) {
                alert('Por favor, introduce un número de teléfono válido.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Product modal enhancement
    const productModal = document.getElementById('productModal');
    if (productModal) {
        const productButtons = document.querySelectorAll('[data-bs-target="#productModal"]');
        
        productButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productTitle = productCard.querySelector('.card-title').textContent;
                const productPrice = productCard.querySelector('.price-section .h4').textContent;
                
                // Update modal content with product info
                const modalBody = productModal.querySelector('.modal-body');
                const productInfo = modalBody.querySelector('h6');
                if (productInfo) {
                    productInfo.textContent = `${productTitle} (${productPrice}) ha sido agregado a tu carrito`;
                }
            });
        });
    }

    // Carousel auto-play control
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        // Pause carousel on hover
        carousel.addEventListener('mouseenter', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });
        
        // Resume carousel on mouse leave
        carousel.addEventListener('mouseleave', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.cycle();
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    document.querySelectorAll('.product-card, .team-member').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Enhanced accordion behavior
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a small delay to enhance the animation
            setTimeout(() => {
                const accordion = this.closest('.accordion');
                const openItems = accordion.querySelectorAll('.accordion-collapse.show');
                
                // Scroll to the opened item if needed
                if (openItems.length > 0) {
                    const rect = this.getBoundingClientRect();
                    const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    if (!isInViewport) {
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }, 100);
        });
    });

    // Shopping cart simulation (local storage would not work in Claude)
    let cartItems = [];
    
    // Add to cart functionality
    window.addToCart = function(productName, productPrice) {
        const item = {
            name: productName,
            price: productPrice,
            id: Date.now(),
            quantity: 1
        };
        
        cartItems.push(item);
        updateCartDisplay();
    };
    
    // Update cart display
    function updateCartDisplay() {
        // In a real application, this would update a cart counter in the navbar
        console.log('Cart updated:', cartItems);
    }

    // Social media link tracking (for analytics)
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.querySelector('i').className.split(' ')[1].replace('bi-', '');
            console.log(`Social media click: ${platform}`);
            // Here you would typically send data to analytics
        });
    });

    // Search functionality (placeholder)
    function initializeSearch() {
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const products = document.querySelectorAll('.product-card');
                
                products.forEach(product => {
                    const title = product.querySelector('.card-title').textContent.toLowerCase();
                    const description = product.querySelector('.card-text').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = searchTerm === '' ? 'block' : 'none';
                    }
                });
            });
        }
    }

    // Initialize search if search input exists
    initializeSearch();

    // Back to top button 
    function createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backToTop.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4';
        backToTop.style.zIndex = '1000';
        backToTop.style.borderRadius = '50%';
        backToTop.style.width = '50px';
        backToTop.style.height = '50px';
        backToTop.style.display = 'none';
        
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Uncomment to enable back to top button
    // createBackToTopButton();

    // Newsletter subscription (placeholder)
    function handleNewsletterSignup() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                // Simulate subscription
                alert(`¡Gracias por suscribirte con el email: ${email}!`);
                this.reset();
            });
        });
    }

    // Initialize newsletter functionality
    handleNewsletterSignup();

    // Enhanced mobile menu behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Add smooth animation class
            navbarCollapse.style.transition = 'all 0.3s ease';
        });
    }

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Performance monitoring
    window.addEventListener('load', function() {
        // Log page load time for performance monitoring
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Initialize any additional features after page load
        initializeTooltips();
        initializePopovers();
    });

    // Initialize Bootstrap tooltips
    function initializeTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Initialize Bootstrap popovers
    function initializePopovers() {
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder if image fails to load
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23f8f9fa" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%236c757d" font-family="sans-serif" font-size="16">Imagen no disponible</text></svg>';
        });
    });

    console.log('High Heels Dance Store - Scripts loaded successfully');
});