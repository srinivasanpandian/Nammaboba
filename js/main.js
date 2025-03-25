// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Plyr video player with custom settings
    const player = new Plyr('#hero-video', {
        controls: false,
        muted: true,
        loop: { 
            active: true,
            start: 15,    // Start time in seconds
            end: 30      // End time in seconds
        },
        speed: { 
            selected: 1,
            options: [0.5, 0.75, 1, 1.25, 1.5, 2]
        }
    });

    // Add custom time interval handling
    player.on('timeupdate', () => {
        const currentTime = player.currentTime;
        const endTime = 15; // End time in seconds

        // If video reaches end time, loop back to start
        if (currentTime >= endTime) {
            player.currentTime = 0;
            player.play();
        }
    });

    // Ensure video plays when it's ready
    player.on('ready', () => {
        player.play();
    });

    // Handle video errors
    player.on('error', (error) => {
        console.error('Video error:', error);
        // Attempt to restart the video
        player.restart();
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    const body = document.body;

    if (hamburger && sideNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sideNav.classList.toggle('active');
            body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!sideNav.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                sideNav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        const navLinks = sideNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                sideNav.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Add parallax class to elements
    const parallaxElements = document.querySelectorAll('.hero-content, .about-image, .boba-item');
    parallaxElements.forEach(element => {
        element.classList.add('parallax');
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Menu Filtering Functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    // Add animation when item becomes visible
                    item.classList.add('visible');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Intersection Observer for menu items
    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    menuItems.forEach(item => {
        menuObserver.observe(item);
    });
}); 