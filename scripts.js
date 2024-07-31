document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
                section.style.transform = 'scale(1.1)';
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
                section.style.transform = 'scale(1)';
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

    window.addEventListener('scroll', handleScroll);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
});
