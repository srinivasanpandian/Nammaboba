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
    const mainNav = document.querySelector('.main-nav');
    let isMenuOpen = false;

    if (hamburger && sideNav) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            hamburger.classList.toggle('active');
            sideNav.classList.toggle('active');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && 
                !hamburger.contains(e.target) && 
                !sideNav.contains(e.target)) {
                isMenuOpen = false;
                hamburger.classList.remove('active');
                sideNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const sideNavLinks = sideNav.querySelectorAll('a');
        sideNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                hamburger.classList.remove('active');
                sideNav.classList.remove('active');
                document.body.style.overflow = '';
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

    // Menu category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuGrid = document.querySelector('.menu-grid');

    // Function to filter menu items with animation
    function filterMenuItems(category) {
        // First, fade out all items
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
        });

        // After a short delay, update visibility and fade in matching items
        setTimeout(() => {
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    // Trigger reflow
                    item.offsetHeight;
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300); // Match this with CSS transition duration
    }

    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter menu items based on selected category
            filterMenuItems(button.dataset.category);
        });
    });

    // Initialize with 'all' category
    filterMenuItems('all');

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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if it's open
                hamburger.classList.remove('active');
                sideNav.classList.remove('active');
                mainNav.classList.remove('active');
                
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 