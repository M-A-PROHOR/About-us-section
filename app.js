// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeAnimations();
    initializeScrollEffects();
});

// Tab Functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize Animations
function initializeAnimations() {
    // Add loading animation to main elements
    const elementsToAnimate = [
        '.image-container',
        '.content-container',
        '.main-title',
        '.tab-navigation',
        '.cta-container'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
    
    // Counter animation for stats numbers
    animateCounters();
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stats-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Show/hide scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Parallax effect for image
    const teamImage = document.querySelector('.team-image');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        if (teamImage) {
            teamImage.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add hover effects to service items
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Button Click Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-btn, .tab-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .tab-btn, .cta-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-item, .checkmark');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    const activeTab = document.querySelector('.tab-btn.active');
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    const currentIndex = tabButtons.indexOf(activeTab);
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        let newIndex;
        
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
        } else {
            newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
        }
        
        tabButtons[newIndex].click();
        tabButtons[newIndex].focus();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled > elementTop - windowHeight + elementHeight / 2) {
            element.classList.add('scrolled');
        }
    });
}, 16));

// Add touch support for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const tabContainer = document.querySelector('.tab-navigation');
    let startX;
    let scrollLeft;
    
    tabContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX - tabContainer.offsetLeft;
        scrollLeft = tabContainer.scrollLeft;
    });
    
    tabContainer.addEventListener('touchmove', function(e) {
        if (!startX) return;
        e.preventDefault();
        const x = e.touches[0].pageX - tabContainer.offsetLeft;
        const walk = (x - startX) * 2;
        tabContainer.scrollLeft = scrollLeft - walk;
    });
    
    tabContainer.addEventListener('touchend', function() {
        startX = null;
    });
});