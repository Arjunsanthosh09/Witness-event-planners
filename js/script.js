
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .pricing-card, .portfolio-item, .team-card, .about-grid, .contact-wrapper');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.textContent.includes('%');

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isPercentage ? `${target}%` : `${target}+`;
            clearInterval(timer);
        } else {
            element.textContent = isPercentage ? `${Math.floor(start)}%` : `${Math.floor(start)}+`;
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const eventType = document.getElementById('eventType').value;
        const message = document.getElementById('message').value;
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    });
}

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        if (email) {
            showNotification('Successfully subscribed to our newsletter!', 'success');
            newsletterForm.reset();
        }
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '20px 30px',
        background: type === 'success' ? '#2ecc71' : '#e74c3c',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.5s ease',
        maxWidth: '400px',
        fontSize: '1rem',
        fontWeight: '500'
    });

    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

const floatingItems = document.querySelectorAll('.floating-item');

document.addEventListener('mousemove', (e) => {
    floatingItems.forEach((item, index) => {
        const speed = (index + 1) * 0.002;
        const x = (window.innerWidth - e.pageX * speed);
        const y = (window.innerHeight - e.pageY * speed);
        item.style.transform += ` translate(${x * 0.02}px, ${y * 0.02}px)`;
    });
});

floatingItems.forEach(item => {
    item.addEventListener('click', function () {
        this.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.transform = 'scale(2) rotate(720deg)';
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = '';
            this.style.opacity = '0.7';
        }, 500);
    });

    item.addEventListener('mouseenter', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop && st < 500) {
        floatingItems.forEach((item, index) => {
            if (Math.random() > 0.8) {
                item.style.transition = 'all 0.5s ease';
                item.style.transform = `translateY(-20px) rotate(${Math.random() * 360}deg)`;
                setTimeout(() => {
                    item.style.transform = '';
                }, 500);
            }
        });
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        const img = this.querySelector('img');
        if (img) {
            img.style.filter = 'brightness(1.1)';
        }
    });

    card.addEventListener('mouseleave', function () {
        const img = this.querySelector('img');
        if (img) {
            img.style.filter = 'brightness(1)';
        }
    });
});

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';

    Object.assign(button.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '999',
        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
    });
}

createScrollToTopButton();

window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

const coords = { x: 0, y: 0 };
const circles = [];
const colors = ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.2)', 'rgba(212, 175, 55, 0.1)'];

if (window.innerWidth > 1024) {
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        Object.assign(circle.style, {
            position: 'fixed',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: colors[i],
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'all 0.1s ease',
            transform: 'translate(-50%, -50%)'
        });
        document.body.appendChild(circle);
        circles.push(circle);
    }

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
            circle.style.transform = `translate(-50%, -50%) scale(${(circles.length - index) / circles.length})`;

            const nextCircle = circles[index + 1] || circles[0];
            x += (parseFloat(nextCircle.style.left) - x) * 0.3;
            y += (parseFloat(nextCircle.style.top) - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// Console Message
console.log('%c Witness Event Planners ', 'background: #d4af37; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Creating Unforgettable Moments 🎉 ', 'color: #d4af37; font-size: 14px;');
console.log('%c Website by Claude ', 'color: #95a5a6; font-size: 12px;');