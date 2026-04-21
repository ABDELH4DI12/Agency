// =========================================
// CRÉATIVE AGENCY - Main JavaScript
// Lenis Smooth Scroll + GSAP Animations
// =========================================

// Initialize Lenis Smooth Scroll - FASTER scrolling
const lenis = new Lenis({
    duration: 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.5,
    touchMultiplier: 2.5,
    infinite: false,
});

// Lenis RAF loop
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// =========================================
// LOADER REMOVED - Direct Init
// =========================================
window.addEventListener('load', () => {
    initHeroAnimations();
});

// =========================================
// HERO ANIMATIONS
// =========================================
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.hero-tag', {
        y: 0,
        opacity: 1,
        duration: 1,
    })
        .to('.hero-title', {
            y: 0,
            opacity: 1,
            duration: 1.2,
        }, '-=0.7')
        .to('.hero-desc', {
            y: 0,
            opacity: 1,
            duration: 1,
        }, '-=0.8')
        .to('.hero-btns', {
            y: 0,
            opacity: 1,
            duration: 1,
        }, '-=0.7')
        .to('.floating-shape', {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            stagger: 0.2,
        }, '-=1');

    // Parallax effect on floating shapes
    gsap.to('.shape-1', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        }
    });

    gsap.to('.shape-2', {
        y: -150,
        x: 50,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
        }
    });

    gsap.to('.shape-3', {
        y: -80,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
        }
    });
}

// =========================================
// ABOUT SECTION ANIMATIONS
// =========================================
ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    onEnter: () => {
        // Animate images
        document.querySelectorAll('.about-img-1, .about-img-2').forEach(img => {
            img.classList.add('revealed');
        });

        // Animate stats
        animateStats();
    },
    once: true,
});

// Global Text Reveal Animation
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.set(text, { y: 30 });
    gsap.to(text, {
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});


function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach((stat, index) => {
        const target = parseInt(stat.getAttribute('data-target'));
        const parent = stat.closest('.stat-item');

        setTimeout(() => {
            parent.classList.add('animated');

            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out',
            });
        }, index * 200);
    });
}

// =========================================
// PROJECTS SECTION - GRID ANIMATION
// =========================================
const projectsSection = document.querySelector('#projects');

if (projectsSection) {
    // Set initial state via CSS, only animate transform
    gsap.set('.project-card', { y: 50 });
    gsap.to('.project-card', {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
}

// =========================================
// Category Cards Entrance Animation
// =========================================
gsap.set('.design-category-card', { y: 50 });
gsap.to('.design-category-card', {
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#designs',
        start: 'top 70%',
        toggleActions: 'play none none none'
    }
});
// =========================================
// CTA SECTION
// =========================================
ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 80%',
    onEnter: () => {
        document.querySelector('.cta-content').classList.add('revealed');
    },
    once: true,
});

// =========================================
// FOOTER ANIMATION
// =========================================
gsap.set('footer', { y: 30 });
gsap.to('footer', {
    y: 0,
    duration: 1,
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        toggleActions: 'play none none none',
    }
});

// =========================================
// MONTAGE ANIMATIONS
// =========================================
gsap.set('.montage-reveal', { y: 30 });
gsap.to('.montage-reveal', {
    scrollTrigger: {
        trigger: '#montage',
        start: 'top 60%',
        toggleActions: 'play none none none'
    },
    y: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.set('.montage-item', { y: 30 });
gsap.to('.montage-item', {
    scrollTrigger: {
        trigger: '.montage-item',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

gsap.set('.process-step', { y: 20 });
gsap.to('.process-step', {
    scrollTrigger: {
        trigger: '.process-step',
        start: 'top 85%',
        toggleActions: 'play none none none'
    },
    y: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
});

// =========================================
// MOBILE MENU
// =========================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active'); // Add active class for visibility
            lenis.stop(); // Stop page scroll

            gsap.to(mobileMenu, { opacity: 1, pointerEvents: 'all', duration: 0.3 });
            gsap.set(mobileLinks, { opacity: 0, y: 50 });
            gsap.to(mobileLinks, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out'
            });
            // Animate hamburger to X
            gsap.to(menuBtn.children[0], { rotation: 45, y: 4, duration: 0.3 });
            gsap.to(menuBtn.children[1], { rotation: -45, y: -4, duration: 0.3 });
        } else {
            gsap.to(mobileLinks, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    mobileMenu.classList.remove('active'); // Remove active class
                    lenis.start(); // Resume page scroll
                }
            });
            gsap.to(mobileMenu, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
            // Animate hamburger back to lines
            gsap.to(menuBtn.children[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(menuBtn.children[1], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            gsap.to('.mobile-link', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    mobileMenu.classList.remove('active');
                    lenis.start();
                }
            });

            const spans = menuBtn.querySelectorAll('span');
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
        });
    });
}

// =========================================
// SMOOTH SCROLL TO SECTIONS
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
            });
        }
    });
});

// =========================================
// MAGNETIC BUTTONS (Subtle effect)
// =========================================
document.querySelectorAll('a, button').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: 'power2.out',
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        });
    });
});

// =========================================
// CURSOR FOLLOW
// =========================================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(139, 92, 246, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
    });
});

// Scale cursor on hover
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 2, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
});

console.log('🎨 Créative Agency - All systems go!');

// --- Design Modal Logic ---

const designData = {
    posters: [
        { title: "Poster Design 1", img: "https://i.pinimg.com/1200x/77/18/1a/77181a8f58fba00efb064ccd23971791.jpg" },
        { title: "Poster Design 2", img: "https://i.pinimg.com/1200x/8a/9c/3d/8a9c3dbdfc712770c6c2e5e5fdc24da4.jpg" },
        { title: "Poster Design 3", img: "https://i.pinimg.com/736x/71/20/02/71200295ac2c453d82b01680f8e2c8d0.jpg" },
        { title: "Poster Design 4", img: "https://i.pinimg.com/1200x/e6/aa/99/e6aa9902bf7e0a3fa1a1ed03c2e3eaad.jpg" },
        { title: "Event Flyer", img: "https://samir-najm.vercel.app/assets/FLAYERS/CONTENT/IMG_20250910_185424.jpg" },
        { title: "Poster Design 6", img: "https://i.pinimg.com/736x/57/db/4a/57db4a8ea4d11326a38f7d3c3330509f.jpg" }
    ],
    panels: [
        { title: "Exhibition Stand", img: "https://images.unsplash.com/photo-1518998053901-5348d3969105?auto=format&fit=crop&w=600&q=80" },
        { title: "Trade Show", img: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&w=600&q=80" },
        { title: "Information Board", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" }
    ],
    branding: [
        { title: "Brand Identity 1", img: "https://i.pinimg.com/736x/ef/6c/a4/ef6ca4bcdea3c50458f691a15b1eeb20.jpg" },
        { title: "Brand Identity 2", img: "https://i.pinimg.com/736x/ba/cb/c2/bacbc2dc95021c900eb1a09232f1ff12.jpg" },
        { title: "Brand Identity 3", img: "https://i.pinimg.com/736x/e7/f8/0a/e7f80a798f895860c88ee2c8812f9a90.jpg" },
        { title: "Brand Identity 4", img: "https://i.pinimg.com/1200x/4e/df/b6/4edfb68555334ef0d8e7110242fc5198.jpg" },
        { title: "Brand Identity 5", img: "https://i.pinimg.com/736x/85/df/b0/85dfb0839748d8fedc1687e6572ce7b4.jpg" },
        { title: "Brand Identity 6", img: "https://i.pinimg.com/736x/87/4a/2d/874a2d78bd807b00fd8e2f9451210086.jpg" }
    ],
    social: [
        { title: "Social Media 1", img: "https://i.pinimg.com/1200x/10/25/58/102558720890d383c580e7e96d377bf2.jpg" },
        { title: "Social Media 2", img: "https://i.pinimg.com/736x/2d/2b/99/2d2b99c60c0a894ab362c447e7b71cbc.jpg" },
        { title: "Social Media 3", img: "https://i.pinimg.com/736x/11/af/e1/11afe1b29272220b96b6971936e850e9.jpg" },
        { title: "Pizza Promo", img: "https://samir-najm.vercel.app/assets/SOCIAL%20MEDIA/CONTENT/PIZZA.jpg" },
        { title: "Product Promo", img: "https://samir-najm.vercel.app/assets/SOCIAL%20MEDIA/CONTENT/PRO%201.jpg" }
    ],
    printing: [
        { title: "Print Design 1", img: "https://i.pinimg.com/736x/b4/a6/49/b4a649619ff7ebb9bb0cb4af80b4d79a.jpg" },
        { title: "Print Design 2", img: "https://i.pinimg.com/1200x/38/37/af/3837afdb5e7d997be095c0366b8dd2ba.jpg" },
        { title: "Print Design 3", img: "https://i.pinimg.com/736x/20/fd/f2/20fdf294e2305e38cc14487485bb73e0.jpg" },
        { title: "Print Design 4", img: "https://i.pinimg.com/736x/93/0c/28/930c2801321c181718d5a0dcafd5f72f.jpg" },
        { title: "Print Design 5", img: "https://i.pinimg.com/1200x/5d/b9/f1/5db9f13144d16273565e7564f7be1c52.jpg" },
        { title: "Print Design 6", img: "https://i.pinimg.com/1200x/20/0b/e6/200be6765b9b8bb067325bb4dce0bed5.jpg" }
    ],
    interior: [
        { title: "Decor 1", img: "mlayr/decoration interieur/DECOR 1.jpeg" },
        { title: "Decor 2", img: "mlayr/decoration interieur/DECOR 2.jpeg" },
        { title: "Decor 3", img: "mlayr/decoration interieur/DECOR 3.jpeg" },
        { title: "Decor 4", img: "mlayr/decoration interieur/DECOR 4.jpeg" },
        { title: "Decor 5", img: "mlayr/decoration interieur/DECOR 5.jpeg" },
        { title: "Decor 6", img: "mlayr/decoration interieur/DECOR 6.jpeg" }
    ]
};

// Execute immediately (script is at end of body)
const modal = document.getElementById('design-modal');
if (modal) {
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalGrid = document.getElementById('modal-grid');
    const cards = document.querySelectorAll('.design-category-card');

    function openModal(category) {
        const items = designData[category] || [];

        // Use category color for accent
        let colorClass = 'text-white';
        if (category === 'posters') colorClass = 'text-purple-500';
        if (category === 'panels') colorClass = 'text-yellow-500';
        if (category === 'branding') colorClass = 'text-pink-500';
        if (category === 'social') colorClass = 'text-blue-500';
        if (category === 'printing') colorClass = 'text-cyan-500';
        if (category === 'interior') colorClass = 'text-orange-500';

        modalTitle.className = `text-4xl md:text-6xl font-black capitalize ${colorClass}`;
        modalTitle.textContent = category;

        // Populate Grid
        modalGrid.innerHTML = items.map((item, index) => `
            <div class="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 translate-y-4 animate-fadeIn flex items-center justify-center" style="animation-delay: ${index * 100}ms; animation-fill-mode: forwards;">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
            </div>
        `).join('');

        // Show Modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Animate In
        gsap.to(modal.firstElementChild, { opacity: 1, duration: 0.3 }); // Backdrop
        gsap.to(modalContent, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.1 });
    }

    function closeModal() {
        gsap.to(modalContent, { opacity: 0, y: 20, duration: 0.3 });
        gsap.to(modal.firstElementChild, {
            opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent if clicking specific interactive elements inside if any
            openModal(card.dataset.category);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Close on backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('absolute') && !e.target.closest('#modal-content')) {
            // Basic check for clicking outside content
            if (!modalContent.contains(e.target)) closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}
