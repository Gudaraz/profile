// Language Switcher
let currentLang = 'en';

const langToggle = document.getElementById('langToggle');
const currentLangSpan = document.getElementById('currentLang');

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    currentLangSpan.textContent = currentLang.toUpperCase();
    updateLanguage();
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-lang-en]');
    elements.forEach(el => {
        const text = currentLang === 'en' ? el.getAttribute('data-lang-en') : el.getAttribute('data-lang-es');
        el.textContent = text;
    });
}

// Typewriter Effect
const phrases = [
    { en: 'Legal Engineer & Legal Tech Consultant', es: 'Ingeniero Legal y Consultor de Legal Tech' },
    { en: 'Building Intelligent Legal Workflows', es: 'Construyendo Flujos de Trabajo Legales Inteligentes' },
    { en: 'RAG & AI Governance Specialist', es: 'Especialista en RAG y Gobernanza de IA' },
    { en: 'Bridging Law and Technology', es: 'Conectando Derecho y Tecnología' }
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    const fullText = currentLang === 'en' ? currentPhrase.en : currentPhrase.es;

    if (isDeleting) {
        typewriterElement.textContent = fullText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = fullText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === fullText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with reveal classes
document.querySelectorAll('.reveal-left, .reveal-up').forEach(el => {
    observer.observe(el);
});

// Staggered animation for grid items
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.approach-card, .milestone-card, .tech-category, .project-card').forEach(el => {
    el.classList.add('reveal-up');
    staggerObserver.observe(el);
});

// Update language when typewriter changes
const originalUpdateLanguage = updateLanguage;
updateLanguage = function() {
    originalUpdateLanguage();
    charIndex = 0;
    typewriterElement.textContent = '';
};

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
