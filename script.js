// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Fade-In Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Trigger animations for elements already in view on load
window.addEventListener('load', () => {
    document.querySelectorAll('.fade-in-up').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});

// Premium Calculator Logic
function calculatePremium() {
    const age = parseInt(document.getElementById('age').value);
    const coverAmount = parseInt(document.getElementById('cover').value);
    const resultDiv = document.getElementById('calc-result');
    const premiumAmountEl = document.getElementById('premium-amount');

    if (!age || age < 18 || age > 65) {
        alert("Please enter a valid age between 18 and 65.");
        return;
    }

    // Basic calculation logic (For estimation purposes only)
    // Base rate per 1000 sum assured
    let baseRate = 2.5; 
    
    // Age multiplier
    if (age > 30 && age <= 40) baseRate += 1.5;
    else if (age > 40 && age <= 50) baseRate += 3.5;
    else if (age > 50) baseRate += 7.0;

    const estimatedPremium = (coverAmount / 1000) * baseRate;
    
    // Format the number to Indian Rupees format
    const formattedPremium = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(estimatedPremium);

    premiumAmountEl.textContent = formattedPremium;
    resultDiv.classList.remove('hidden');
    
    // Add a little pop animation
    premiumAmountEl.style.transform = 'scale(1.1)';
    setTimeout(() => {
        premiumAmountEl.style.transform = 'scale(1)';
        premiumAmountEl.style.transition = 'transform 0.3s ease';
    }, 300);
}


// Interactive Quiz Logic
function showQuizResult(goal) {
    const questionDiv = document.getElementById('quiz-question');
    const resultDiv = document.getElementById('quiz-result');
    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-desc');
    const iconEl = document.getElementById('result-icon');
    
    questionDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    
    if (goal === 'child') {
        iconEl.textContent = '🎓';
        titleEl.textContent = 'Jeevan Tarun / Child Plans';
        descEl.textContent = 'Secure your child\'s higher education and marriage. These plans offer guaranteed payouts at crucial age milestones (18, 20, 22 years).';
    } else if (goal === 'retirement') {
        iconEl.textContent = '🏖️';
        titleEl.textContent = 'Jeevan Umang / Jeevan Shanti';
        descEl.textContent = 'Enjoy a peaceful retirement with guaranteed 8% lifelong returns or immediate pension payouts. Never worry about outliving your savings.';
    } else if (goal === 'protection') {
        iconEl.textContent = '🛡️';
        titleEl.textContent = 'LIC Tech Term / Jeevan Amar';
        descEl.textContent = 'High risk cover at very low premiums. Ensure your family\'s financial independence and debt protection in your absence.';
    } else if (goal === 'savings') {
        iconEl.textContent = '📈';
        titleEl.textContent = 'Jeevan Lakshya / Endowment';
        descEl.textContent = 'A perfect blend of income tax savings (80C) and steady wealth creation with annual bonuses and a massive maturity amount.';
    }
}

function resetQuiz() {
    document.getElementById('quiz-question').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
}

// Apply configuration data
window.addEventListener('DOMContentLoaded', () => {
    if (typeof AGENT_CONFIG !== 'undefined') {
        const whatsappLinks = document.querySelectorAll('.cfg-whatsapp-link');
        whatsappLinks.forEach(link => {
            link.href = `https://wa.me/${AGENT_CONFIG.whatsappNumber}`;
        });
    }
});
