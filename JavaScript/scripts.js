document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollPos = window.scrollY + window.innerHeight / 2;

        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + sectionHeight / 2;
            const distance = Math.abs(scrollPos - sectionCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        sections.forEach(section => {
            const navLink = document.querySelector(`.nav-link[href="#${section.getAttribute('id')}"]`);

            if (section === closestSection) {
                section.classList.add('focused');
                navLink.classList.add('active');
            } else {
                section.classList.remove('focused');
                navLink.classList.remove('active');
            }
        });
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const targetPosition = targetSection.offsetTop - (window.innerHeight / 2) + (targetSection.offsetHeight / 2);
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    function focusClosestSection() {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + sectionHeight / 2;
            const distance = Math.abs(scrollPos - sectionCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        if (closestSection) {
            closestSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            handleScroll();
        }
    }

    window.addEventListener('scroll', handleScroll);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
    window.addEventListener('load', focusClosestSection);
    window.addEventListener('resize', focusClosestSection);
});
