document.addEventListener('DOMContentLoaded', function() {
    // Initialize Plyr
    const player = new Plyr('#player', {
        controls: [],  // Hide all controls
        clickToPlay: false,
        keyboard: false,
        loop: { active: true },
        muted: true,
        autopause: false,
        autoplay: true,
        hideControls: true
    });

    // When the video is ready
    player.on('ready', () => {
        player.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });
    });

    // Ensure video always fills the container
    function updateVideoSize() {
        const videoWrapper = document.querySelector('.plyr__video-wrapper');
        const video = document.querySelector('video');
        
        if (video) {
            const containerAspect = window.innerWidth / window.innerHeight;
            const videoAspect = video.videoWidth / video.videoHeight || 16/9;

            if (containerAspect > videoAspect) {
                video.style.width = '100vw';
                video.style.height = 'auto';
                video.style.top = '50%';
                video.style.left = '0';
                video.style.transform = 'translateY(-50%)';
            } else {
                video.style.width = 'auto';
                video.style.height = '100vh';
                video.style.top = '0';
                video.style.left = '50%';
                video.style.transform = 'translateX(-50%)';
            }
        }
    }

    // Update video size on window resize and when video metadata is loaded
    window.addEventListener('resize', updateVideoSize);
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('loadedmetadata', updateVideoSize);
    }
    updateVideoSize();

    // Side Navigation Functionality
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    let isMenuOpen = false;

    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        sideNav.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });

    // Close menu when clicking outside
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

    // Handle job banner button click
    const jobBtn = document.querySelector('.job-btn');
    if (jobBtn) {
        jobBtn.addEventListener('click', () => {
            window.location.href = '#jobs';
        });
    }

    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}); 