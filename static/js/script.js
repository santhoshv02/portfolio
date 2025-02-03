// Update the fetch URL

// Custom Cursor
document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".cursor");
    const cursor2 = document.querySelector(".cursor2");
    
    cursor.style.display = "block";
    cursor2.style.display = "block";
    
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY + "px";
});

// Hide cursor when it leaves the window
document.addEventListener("mouseout", () => {
    const cursor = document.querySelector(".cursor");
    const cursor2 = document.querySelector(".cursor2");
    
    cursor.style.display = "none";
    cursor2.style.display = "none";
});

// Add cursor effects for clickable elements
document.querySelectorAll("a, button, .btn").forEach(element => {
    element.addEventListener("mouseover", () => {
        const cursor = document.querySelector(".cursor");
        const cursor2 = document.querySelector(".cursor2");
        
        cursor.classList.add("hover");
        cursor2.classList.add("hover");
    });
    
    element.addEventListener("mouseout", () => {
        const cursor = document.querySelector(".cursor");
        const cursor2 = document.querySelector(".cursor2");
        
        cursor.classList.remove("hover");
        cursor2.classList.remove("hover");
    });
});

// Typing Animation
const typed = new Typed('.multiple-text', {
    strings: ['Computer Science Student', 'Web Developer', 'Problem Solver'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Toggle Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Active Menu Switcher
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.nav-menu a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

// Scroll Reveal
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Add mouse interaction
let mouse = { x: null, y: null };

// Add color cycling effect
function cycleColors() {
    const time = Date.now() * 0.001;
    const hue = (time * 10) % 360;
    const saturation = 70 + Math.sin(time * 0.5) * 30;
    const lightness = 60 + Math.sin(time * 0.3) * 20;
    
    document.documentElement.style.setProperty(
        '--main-color',
        `hsl(${hue}, ${saturation}%, ${lightness}%)`
    );
    requestAnimationFrame(cycleColors);
}

cycleColors();

// Add a parallax effect for sections
document.addEventListener('mousemove', (e) => {
    const sections = document.querySelectorAll('section');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    sections.forEach(section => {
        const speed = 0.05;
        const x = (window.innerWidth - mouseX * speed) / 100;
        const y = (window.innerHeight - mouseY * speed) / 100;
        
        section.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Add this to create floating effect for project cards
const projectBoxes = document.querySelectorAll('.project-box');
projectBoxes.forEach(box => {
    let rotation = 0;
    let floatY = 0;
    let isHovered = false;

    box.addEventListener('mouseover', () => {
        isHovered = true;
    });

    box.addEventListener('mouseout', () => {
        isHovered = false;
    });

    function animate() {
        if (!isHovered) {
            rotation += 0.5;
            floatY = Math.sin(rotation * Math.PI / 180) * 10;
            box.style.transform = `translateY(${floatY}px)`;
        }
        requestAnimationFrame(animate);
    }

    animate();
});

// Progress bar scroll indicator
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrolled = (scrollPosition / totalScroll) * 100;
    document.querySelector('.progress-bar').style.width = `${scrolled}%`;
});

// Message Form Handler
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formStatus = this.querySelector('.form-status');
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    fetch('send_message.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            formStatus.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle"></i> 
                    Message sent successfully!
                </div>`;
            this.reset();
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    })
    .catch(error => {
        formStatus.innerHTML = `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-circle"></i> 
                ${error.message}
            </div>`;
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 5000);
    });
});

// Enhanced connection drawing
function drawConnections(p1, p2, distance) {
    const opacity = (1 - distance/150) * 0.3;
    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradient.addColorStop(0, `${p1.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${p2.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

// Add scroll animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
}); 
fetch('/send_message', {
    method: 'POST',
    body: formData
}) 