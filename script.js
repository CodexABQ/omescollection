document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Enhanced Scroll Animation with throttling
    let lastScrollPosition = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScrollPosition > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile Menu Toggle with enhanced animation
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    });

    // Enhanced Smooth Scrolling with offset calculation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Add hover effect sound (optional)
        link.addEventListener('mouseenter', () => {
            const hoverSound = new Audio('data:audio/wav;base64,UklGRpQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAAAABhAGEAYQBhAGIAYgBiAGEAYQBhAGEAYgBiAGIAYQBhAGEAYQBiAGIAYgBhAGEAYQBhAGIAYgBiAGEAYQBhAGEAYgBiAGIAYQBhAGEAYQBiAGIAYgBhAGEAYQBh');
            hoverSound.volume = 0.1;
            hoverSound.play().catch(() => {});
        });
    });

    // Add initial load animation
    navLinks.forEach((link, index) => {
        link.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-text')) {
                    entry.target.classList.add('fade-in-left');
                } else if (entry.target.classList.contains('about-image')) {
                    entry.target.classList.add('fade-in-right');
                }
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(aboutText);
    observer.observe(aboutImage);

    // Animate features on hover
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transform = 'translateY(-5px)';
            feature.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });

        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'translateY(0)';
            feature.style.boxShadow = 'none';
        });
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // Category Filter Functionality
    const categorySelect = document.getElementById('categorySelect');
    const categoryCards = document.querySelectorAll('.category-card');
    const productCards = document.querySelectorAll('.product-card');

    categorySelect.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        
        categoryCards.forEach(card => {
            if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe category cards
    categoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // Observe product cards
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    
    
    
});
function initializeProductCard(cardElement) {
    const carousel = cardElement.querySelector('.product-image-carousel');
    const slides = cardElement.querySelectorAll('.product-image');
    const indicators = cardElement.querySelectorAll('.image-indicator');
    const lottieContainer = cardElement.querySelector('.lottie-heart');
    // const productCard = document.querySelector('.product-card');
    let currentSlide = 0;

    // Image Carousel Logic
    function changeSlide(newSlide) {
        carousel.style.transform = `translateX(-${newSlide * 100}%)`;
        
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[newSlide].classList.add('active');
        
        currentSlide = newSlide;
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const slideIndex = parseInt(indicator.getAttribute('data-slide'));
            changeSlide(slideIndex);
        });
    });

    // Auto Slide Logic
    setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        changeSlide(nextSlide);
    }, 5000);

    // Lottie Heart Animation
    const heartAnimation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets2.lottiefiles.com/packages/lf20_UJNc2t.json'
    });

    let isLiked = false;
    carousel.addEventListener('click', () => {
        if (!isLiked) {
            heartAnimation.playSegments([0, 30], true);
        } else {
            heartAnimation.playSegments([30, 0], true);
        }
        isLiked = !isLiked;
    });
}

// Initialize all product cards
document.querySelectorAll('.product-card').forEach(initializeProductCard);


document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3); // 3 days from now

    function updateTimer() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
            document.querySelector('.featured-deal').style.display = 'none';
        }
    }

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.offer-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // Dynamic stock update
    document.querySelectorAll('.stock-progress').forEach(progress => {
        const randomProgress = Math.random() * (80 - 20) + 20;
        progress.style.width = `${randomProgress}%`;
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe contact items
    document.querySelectorAll('.contact-item, .map-container').forEach(item => {
        observer.observe(item);
    });

    // Initialize map responsiveness
    const map = document.querySelector('.map iframe');
    if (map) {
        map.addEventListener('load', () => {
            map.style.opacity = '1';
        });
    }
});






document.addEventListener('DOMContentLoaded', () => {
    // Load Lottie Animation
    const animation = lottie.loadAnimation({
        container: document.getElementById('whatsappAnimation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets8.lottiefiles.com/packages/lf20_5tl1xxnz.json' // Replace with your Lottie animation JSON
    });

    // Copy Number Function
    window.copyNumber = () => {
        const number = '+234 805 128 7015';
        navigator.clipboard.writeText(number).then(() => {
            const copyButton = document.querySelector('.copy-button');
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    document.querySelectorAll('.cta-content, .cta-animation').forEach(element => {
        observer.observe(element);
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe footer sections
    document.querySelectorAll('.footer-section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
        observer.observe(section);
    });
});