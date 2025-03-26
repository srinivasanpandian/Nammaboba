// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
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

    // Menu category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

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
        }, 300);
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
}); 