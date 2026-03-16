/* 
    Darren Littlejohn - Portfolio Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Global Spotlight Effect
    const spotlight = document.getElementById('spotlight');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update CSS variables for the global background radial gradient
        spotlight.style.setProperty('--mouse-x', `${x}px`);
        spotlight.style.setProperty('--mouse-y', `${y}px`);
    });

    // 2. Card Hover Glow Effect (The Bento Box Inner Glow)
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--card-x', `${x}px`);
            card.style.setProperty('--card-y', `${y}px`);
        });
    });

    // 3. Active Nav Link on Scroll
    const sections = document.querySelectorAll('.section-block');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -79% 0px', // Adjusted to trigger closer to top
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navItems.forEach(item => item.classList.remove('active'));
                
                // Add active to current
                const id = entry.target.getAttribute('id');
                const activeNav = document.querySelector(`.nav-item[href="#${id}"]`);
                if(activeNav) {
                    activeNav.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            
            if (targetEl) {
                // Account for padding
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
