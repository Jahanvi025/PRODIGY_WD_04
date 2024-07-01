document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('nav .right a');
    const sections = {
        home: document.getElementById('home'),
        about: document.getElementById('about'),
        skills: document.getElementById('skills'),
        services: document.getElementById('services'),
        projects: document.getElementById('projects'),
        newsletter: document.getElementById('newsletter'),
        education: document.getElementById('education')
    };
    const moonButton = document.getElementById('moon-button');

    // Function to remove the active class from all links
    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Function to add the active class to the link corresponding to the section in view
    function addActiveClass(id) {
        const link = document.querySelector(`nav .right a[data-target="${id}"]`);
        if (link) {
            link.classList.add('active');
        }
    }

    // Function to handle scrolling to the section
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            if(targetId === 'home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }else{
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('nav').offsetHeight,
                    behavior: 'smooth'
                });
            }
        }else {
            console.error(`Element with id ${targetId} not found.`);
        }
        
    }

    // Function to handle setting active button
    function setActiveButton(button) {
        removeActiveClasses();
        button.classList.add('active');
    }

    // Function to toggle dark mode
    let isDarkMode = false;

    function changeImage() {
        const moonImage = document.getElementById('moon-image');
        const moonImageAlt = document.getElementById('hover-moon');

        if (isDarkMode) {
            moonImage.style.display = 'block';
            moonImageAlt.style.display = 'none';
        } else {
            moonImage.style.display = 'none';
            moonImageAlt.style.display = 'block';
        }

        isDarkMode = !isDarkMode;
    }

    function changeHover(button) {
        const moonImage = button.querySelector('#moon-image');
        const hoverMoon = button.querySelector('#hover-moon');
        moonImage.style.display = 'none';
        hoverMoon.style.display = 'block';
    }

    function resetHover(button) {
        const moonImage = button.querySelector('#moon-image');
        const hoverMoon = button.querySelector('#hover-moon');
        if (isDarkMode) {
            moonImage.style.display = 'none';
            hoverMoon.style.display = 'block';
        } else {
            moonImage.style.display = 'block';
            hoverMoon.style.display = 'none';
        }
    }

    // Scroll event to update active link
    function onScroll() {
        let currentSection = null;

        Object.keys(sections).forEach(sectionId => {
            const section = sections[sectionId];
            const rect = section.getBoundingClientRect();

            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = sectionId;
            }
        });

        if (currentSection) {
            removeActiveClasses();
            addActiveClass(currentSection);
        }

        // Special handling for the moon button
        if (currentSection === 'education') {
            changeHover(moonButton);
        } else {
            resetHover(moonButton);
        }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', onScroll);

    // Initial check to set the active link on page load
    onScroll();
    window.scrollToSection = scrollToSection;
    window.changeHover = changeHover;
    window.changeImage = changeImage;
    window.resetHover = resetHover;
    window.setActiveButton = setActiveButton;
    // Smooth scroll to section on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');
            scrollToSection(targetId);
            setActiveButton(this);
        });
    });

    // Set current year in footer
    const d = new Date();
    const yearElement = document.getElementById('copyright');
    if (yearElement) {
        yearElement.textContent = d.getFullYear();
    }
    
});
function myFunction(x) {
    x.classList.toggle("change");

    const homeSection = document.querySelector(".home");
    const asidediv = document.querySelector("aside");
    // Handle the opacity based on the screen width
    if (window.innerWidth <= 830) {
        if (x.classList.contains("change")) {
            homeSection.style.opacity = 1;
            asidediv.style.zIndex = 20;
        } else {
            homeSection.style.opacity = 0;  // Hide the home section
            asidediv.style.zIndex = 100;
        }
    } else {
        homeSection.style.opacity = 1;  // Ensure home section is visible on larger screens
    }
}

// Ensure to call this function on resize event
window.addEventListener('resize', () => {
    // Ensure to reset the home section opacity based on screen width and toggle state
    const homeSection = document.querySelector(".home");
    if (window.innerWidth > 830) {
        homeSection.style.opacity = 1;  // Always visible on larger screens
    } else {
        // Update opacity based on the toggle state
        if (document.querySelector('.toggle').classList.contains('change')) {
            homeSection.style.opacity = 1;
        } else {
            homeSection.style.opacity = 0;
        }
    }
});
var canvasDots = function() {
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        colorDot = '#1E56A0',
        color = '#163172';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    ctx.fillStyle = colorDot;
    ctx.lineWidth = .1;
    ctx.strokeStyle = color;

    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };

    var dots = {
        nb: 600,
        distance: 60,
        d_radius: 100,
        array: []
    };

    function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random();
    }

    Dot.prototype = {
        create: function(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        },

        animate: function(){
            for(i = 0; i < dots.nb; i++){

                var dot = dots.array[i];

                if(dot.y < 0 || dot.y > canvas.height){
                    dot.vx = dot.vx;
                    dot.vy = - dot.vy;
                }
                else if(dot.x < 0 || dot.x > canvas.width){
                    dot.vx = - dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        },

        line: function(){
            for(i = 0; i < dots.nb; i++){
                for(j = 0; j < dots.nb; j++){
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                        if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                            ctx.beginPath();
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    };

    function createDots(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // adjust dots.distance based on canvas width
        dots.distance = canvas.width / (10 + (canvas.width / 200));

        for(i = 0; i < dots.nb; i++){
            dots.array.push(new Dot());
            dot = dots.array[i];

            dot.create();
        }

        dot.line();
        dot.animate();
    }

    window.onmousemove = function(parameter) {
        mousePosition.x = parameter.pageX;
        mousePosition.y = parameter.pageY;
    }

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    setInterval(createDots, 1000/30);
};

window.onload = function() {
    canvasDots();
};

window.onload = function() {
    canvasDots();
};
VanillaTilt.init(document.querySelectorAll(".tilt"),{
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.3
  });
 
var typing= new Typed(".official", {
    strings: ["", "Web Developer", "Frontend Developer", "Backend Developer", "Web Designer", "MERN Stack Developer"],
    typeSpeed: 100,
    backSpeed: 40,
    loop: true,
});


document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: [0.7] // 50% visibility threshold
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the animation class when the element is at least half visible
                entry.target.classList.add('animate');
              

            } else {
                // Remove the animation class if the element is not visible
                entry.target.classList.remove('animate');
                
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements you want to observe
    const elementsToObserve = document.querySelectorAll('.observe');

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: [0.7] // 70% visibility threshold
    };

    const observer1Callback = (entries, observer1) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the animation class when the element is at least 70% visible
                entry.target.classList.add('project-animate');
            } else {
                // Remove the animation class if the element is not visible
                entry.target.classList.remove('project-animate');
            }
        });
    };

    const observer1 = new IntersectionObserver(observer1Callback, observerOptions);

    // Select all project card elements you want to observe
    const projectCardsToObserve = document.querySelectorAll('.projects .card');

    projectCardsToObserve.forEach((element, index) => {
        // Calculate the delay for each element
        const delay = (index % 6) * 0.6; // 0.2s delay increments for up to 6 elements
        element.style.animationDelay = `${delay}s`;
        observer1.observe(element);
    });
});
