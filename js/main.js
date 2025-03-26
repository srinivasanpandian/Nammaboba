// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Plyr video player with custom settings
    const player = new Plyr('#player', {
        controls: [],  // Hide all controls
        clickToPlay: false,
        keyboard: false,
        muted: true,
        autopause: false,
        autoplay: true,
        loop: { active: true },
        hideControls: true
    });

    // When the video is ready
    player.on('ready', () => {
        player.play().catch(error => {
            console.log("Autoplay prevented:", error);
            // Try playing again with user interaction
            document.addEventListener('click', () => {
                player.play();
            }, { once: true });
        });
    });

    // Ensure video always plays in loop
    player.on('ended', () => {
        player.restart();
    });

    // Ensure video fills the container
    function updateVideoSize() {
        const video = document.querySelector('video');
        if (video) {
            const containerAspect = window.innerWidth / window.innerHeight;
            const videoAspect = video.videoWidth / video.videoHeight;

            if (containerAspect > videoAspect) {
                video.style.width = '100vw';
                video.style.height = 'auto';
            } else {
                video.style.width = 'auto';
                video.style.height = '100vh';
            }
        }
    }

    // Update video size on window resize
    window.addEventListener('resize', updateVideoSize);
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('loadedmetadata', updateVideoSize);
    }
    updateVideoSize();

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    const sideNavLinks = document.querySelectorAll('.side-nav a');
    const body = document.body;

    if (hamburger && sideNav) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling
            hamburger.classList.toggle('active');
            sideNav.classList.toggle('active');
            body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInside = sideNav.contains(e.target) || hamburger.contains(e.target);
            if (!isClickInside && sideNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                sideNav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        sideNavLinks.forEach(link => {
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

    // Boba Storytime Slider
    const storySlides = document.querySelectorAll('.story-slide');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    const storyDots = document.querySelector('.story-dots');
    let currentSlide = 0;

    // Create dots
    storySlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('story-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        storyDots.appendChild(dot);
    });

    // Show first slide
    storySlides[0].classList.add('active');

    // Navigation functions
    function updateSlides(newIndex) {
        storySlides[currentSlide].classList.remove('active');
        storyDots.children[currentSlide].classList.remove('active');
        
        currentSlide = newIndex;
        
        storySlides[currentSlide].classList.add('active');
        storyDots.children[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
        updateSlides(index);
    }

    function nextSlideHandler() {
        const newIndex = (currentSlide + 1) % storySlides.length;
        updateSlides(newIndex);
    }

    function prevSlideHandler() {
        const newIndex = (currentSlide - 1 + storySlides.length) % storySlides.length;
        updateSlides(newIndex);
    }

    // Add event listeners
    if (prevSlide && nextSlide) {
        prevSlide.addEventListener('click', prevSlideHandler);
        nextSlide.addEventListener('click', nextSlideHandler);
    }

    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(nextSlideHandler, 5000);

    // Pause auto-advance on hover
    const storySlider = document.querySelector('.story-slider');
    if (storySlider) {
        storySlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        storySlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlideHandler, 5000);
        });
    }
}); 