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
    { en: 'Legal Operations & Legal Tech Consultant', es: 'Consultor de Operaciones Legales y Legal Tech' },
    { en: 'Building Intelligent Legal Workflows', es: 'Construyendo Flujos de Trabajo Legales Inteligentes' },
    { en: 'RAG & AI Governance Specialist', es: 'Especialista en RAG y Gobernanza de IA' },
    { en: 'EU AI Act & GDPR Compliance Expert', es: 'Experto en Conformidad EU AI Act y GDPR' }
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

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.milestone-card, .timeline-item, .project-card, .tech-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Update language when typewriter changes
const originalUpdateLanguage = updateLanguage;
updateLanguage = function() {
    originalUpdateLanguage();
    // Reset typewriter when language changes
    charIndex = 0;
    typewriterElement.textContent = '';
};
