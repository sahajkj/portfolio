document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links and logo
    document.querySelectorAll('nav ul li a, nav .logo').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href') ? this.getAttribute('href').substring(1) : "top";
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjust this value if you want to account for fixed navbar height
                    behavior: 'smooth'
                });
            } else if (targetId === "top") {
                // Special case for scrolling back to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section link based on the percentage of visibility
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        let maxVisibleSection = '';
        let maxVisiblePercent = 0;

        // Check if the page is scrolled to the top
        if (window.scrollY === 0) {
            // Remove the active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            return; // Exit the function early if at the top
        }

        // Now check the visibility of each section
        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;

            // Calculate the percentage of the section that is visible in the viewport
            const visibleHeight = Math.min(window.innerHeight, sectionRect.bottom) - Math.max(0, sectionTop);
            const visiblePercent = Math.max(0, visibleHeight / sectionHeight);

            // If this section has more visible percentage, or if the percentages are the same but this section is above
            if (visiblePercent > maxVisiblePercent) {
                maxVisiblePercent = visiblePercent;
                maxVisibleSection = section.getAttribute('id');
            } else if (visiblePercent === maxVisiblePercent && sectionTop >= 0) {
                maxVisibleSection = section.getAttribute('id');
            }
        });

        // Update the active link for nav items based on the most visible section
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === maxVisibleSection) {
                link.classList.add('active');
            }
        });
    });
});
