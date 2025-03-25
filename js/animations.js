// Initialize Smooth Scroll
const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true,
    easing: 'easeInOutCubic'
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
const heroTimeline = gsap.timeline({
    defaults: { ease: "power3.out" }
});

heroTimeline
    .from('.hero-text h1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power4.out"
    })
    .from('.hero-text p', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.5")
    .from('.job-banner', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out"
    }, "-=0.5");

// Boba Tea Section Animations
const bobaItems = document.querySelectorAll('.boba-item');
bobaItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.2,
        ease: "power3.out"
    });
});

// Enhanced About Section Animations
const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.about-section',
        start: "top center+=100",
        toggleActions: "play none none reverse"
    }
});

// Main about section animations
aboutTimeline
    .from('.about-image', {
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: "power3.out",
        scale: 0.9
    })
    .from('.about-content', {
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: "power3.out",
        scale: 0.9
    }, "-=0.8")
    .from('.about-experience', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "back.out(1.7)",
        scale: 0.8
    }, "-=0.5");

// Animate the experience badge separately
gsap.to('.about-experience', {
    scrollTrigger: {
        trigger: '.about-experience',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    },
    duration: 1,
    y: -20,
    ease: "power2.out",
    repeat: -1,
    yoyo: true
});

// Enhanced feature animations
const features = document.querySelectorAll('.feature');
features.forEach((feature, index) => {
    // Initial animation
    gsap.from(feature, {
        scrollTrigger: {
            trigger: feature,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: index * 0.2,
        ease: "power3.out",
        scale: 0.9
    });

    // Hover animations
    feature.addEventListener('mouseenter', () => {
        gsap.to(feature, {
            duration: 0.3,
            scale: 1.05,
            y: -10,
            ease: "power2.out",
            boxShadow: "0 15px 30px rgba(255, 105, 180, 0.2)"
        });
        
        // Animate icon
        gsap.to(feature.querySelector('i'), {
            duration: 0.3,
            scale: 1.2,
            rotation: 360,
            ease: "power2.out"
        });
    });

    feature.addEventListener('mouseleave', () => {
        gsap.to(feature, {
            duration: 0.3,
            scale: 1,
            y: 0,
            ease: "power2.out",
            boxShadow: "0 10px 20px rgba(255, 105, 180, 0.1)"
        });
        
        // Reset icon
        gsap.to(feature.querySelector('i'), {
            duration: 0.3,
            scale: 1,
            rotation: 0,
            ease: "power2.out"
        });
    });
});

// Animate the about text paragraphs
const aboutTexts = document.querySelectorAll('.about-text p');
aboutTexts.forEach((text, index) => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        y: 20,
        opacity: 0,
        delay: index * 0.3,
        ease: "power2.out"
    });
});

// Add parallax effect to about image
const aboutImageParallax = new Parallax('.about-image', {
    relativeInput: true,
    hoverOnly: true,
    calibrateX: true,
    calibrateY: true,
    invertX: false,
    invertY: false,
    limitX: false,
    limitY: false,
    scalarX: 2,
    scalarY: 2,
    frictionX: 0.2,
    frictionY: 0.2
});

// Add a subtle floating animation to the experience badge
gsap.to('.about-experience', {
    scrollTrigger: {
        trigger: '.about-experience',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    },
    duration: 2,
    y: -10,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
});

// Add a subtle scale animation to the about section title
gsap.from('.about-content .section-header h2', {
    scrollTrigger: {
        trigger: '.about-content .section-header',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    },
    duration: 1,
    scale: 0.9,
    opacity: 0,
    ease: "back.out(1.7)"
});

// Parallax Effects
const parallaxElements = document.querySelectorAll('.parallax');
parallaxElements.forEach(element => {
    new Parallax(element, {
        relativeInput: true,
        hoverOnly: true,
        calibrateX: true,
        calibrateY: true,
        invertX: false,
        invertY: false,
        limitX: false,
        limitY: false,
        scalarX: 2,
        scalarY: 2,
        frictionX: 0.2,
        frictionY: 0.2
    });
});

// ScrollMagic Animations
const controller = new ScrollMagic.Controller();

// Header Scroll Effect
const headerScene = new ScrollMagic.Scene({
    triggerElement: '.hero',
    triggerHook: 0,
    duration: 100
})
.setClassToggle('.main-header', 'scrolled')
.addTo(controller);

// Boba Tea Section Scroll Animation
const bobaScene = new ScrollMagic.Scene({
    triggerElement: '.boba-section',
    triggerHook: 0.8,
    duration: 100
})
.setClassToggle('.boba-section', 'active')
.addTo(controller);

// Floating Animation for Boba Items
bobaItems.forEach(item => {
    gsap.to(item, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
});

// Smooth Scroll for Navigation Links
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

// Add hover effect to boba items
bobaItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Add parallax effect to hero section
const heroParallax = new Parallax('.hero-content', {
    relativeInput: true,
    hoverOnly: true,
    calibrateX: true,
    calibrateY: true,
    invertX: false,
    invertY: false,
    limitX: false,
    limitY: false,
    scalarX: 2,
    scalarY: 2,
    frictionX: 0.2,
    frictionY: 0.2
}); 