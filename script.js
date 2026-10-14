/* ==========================================
   QUINCEAÑERA INVITATION - JAVASCRIPT
   Mariangel Valencia Gálvez
   14 de Noviembre de 2026
   ========================================== */

// ===== COUNTDOWN TIMER =====
const eventDate = new Date('2026-11-14T19:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        const label = document.querySelector('.countdown-label');
        if (label) label.textContent = '¡Ha llegado el día!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    animateNumber('days', days);
    animateNumber('hours', hours);
    animateNumber('minutes', minutes);
    animateNumber('seconds', seconds);
}

function animateNumber(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    const newVal = String(value).padStart(2, '0');
    if (el.textContent !== newVal) {
        el.style.transform = 'translateY(-4px)';
        el.style.opacity = '0.6';
        setTimeout(() => {
            el.textContent = newVal;
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
        }, 120);
    }
}

// Initialize and run
updateCountdown();
setInterval(updateCountdown, 1000);


// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Sections that fade in on scroll
    const sections = document.querySelectorAll(
        '.event-date, .song-section, .spotify-section, .itinerary-section, .location-section, .dresscode-section, .sobres-section, .rsvp-section'
    );
    
    sections.forEach(section => section.classList.add('animate-on-scroll'));

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => sectionObserver.observe(el));

    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));
});


// ===== PLAY BUTTON =====
const playButton = document.getElementById('playButton');
if (playButton) {
    playButton.addEventListener('click', () => {
        playButton.style.transform = 'scale(0.88)';
        setTimeout(() => {
            playButton.style.transform = 'scale(1.08)';
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
            }, 180);
        }, 130);
    });
}




// ===== HERO PARALLAX =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                const progress = scrolled / window.innerHeight;
                heroContent.style.opacity = Math.max(1 - progress * 1.5, 0);
                heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });


// ===== SPARKLE EFFECT ON HOVER =====
document.addEventListener('DOMContentLoaded', () => {
    const sparkleTargets = document.querySelectorAll('.rsvp-button, .crown-icon');
    
    sparkleTargets.forEach(el => {
        el.style.position = 'relative';
        el.addEventListener('mouseenter', () => {
            for (let i = 0; i < 6; i++) {
                setTimeout(() => createSparkle(el), i * 80);
            }
        });
    });
});

function createSparkle(parent) {
    const sparkle = document.createElement('span');
    const size = 6 + Math.random() * 8;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 50;
    const dy = -20 - Math.random() * 40;
    
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${x}%;
        top: ${y}%;
        pointer-events: none;
        z-index: 50;
        transition: all 0.8s ease-out;
        opacity: 1;
    `;
    
    parent.appendChild(sparkle);
    
    // Trigger animation
    requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
        sparkle.style.opacity = '0';
    });
    
    setTimeout(() => sparkle.remove(), 900);
}


// ===== SMOOTH NUMBER TRANSITIONS =====
document.querySelectorAll('.countdown-number').forEach(el => {
    el.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
});
