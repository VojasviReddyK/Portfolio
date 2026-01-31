// ===== PARTICLES.JS CONFIGURATION =====
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ["#C1121F", "#003049", "#669BBC"],
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#669BBC",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

if (cursor && cursorFollower) {
  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Smooth cursor movement
    const speed = 0.2;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    const followerSpeed = 0.1;
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor effects on hover
  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-card, .cert-card, .contact-card",
  );
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

// ===== TYPING ANIMATION =====
const typingText = document.querySelector(".typing-text");
if (typingText) {
  const texts = [
    "Full-Stack Developer",
    "Creative Designer",
    "Content Writer",
    "Problem Solver",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing animation after page load
  setTimeout(type, 1500);
}

// ===== ANIMATED COUNTER FOR STATS =====
const observeCounters = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            setTimeout(updateCounter, stepTime);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observeCounters.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat-number").forEach((counter) => {
  observeCounters.observe(counter);
});

// ===== SKILL BARS ANIMATION =====
const observeSkills = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const progress = skillBar.getAttribute("data-progress");
        skillBar.style.width = progress + "%";
        observeSkills.unobserve(skillBar);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".skill-progress").forEach((bar) => {
  observeSkills.observe(bar);
});

// ===== AOS (ANIMATE ON SCROLL) INITIALIZATION =====
AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true,
  offset: 100,
  delay: 0,
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===== PARALLAX EFFECT FOR GRADIENT ORBS =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll(".gradient-orb");

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.2;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== PROJECT CARD TILT EFFECT =====
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
  });
});

// ===== SKILL CARD ANIMATIONS =====
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// ===== HERO SECTION FADE IN =====
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    setTimeout(() => {
      heroContent.style.transition = "opacity 1s ease";
      heroContent.style.opacity = "1";
    }, 200);
  }
});

// ===== SCROLL REVEAL FOR SECTIONS =====
const revealSections = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll("section").forEach((section) => {
  revealSections.observe(section);
});

// ===== RANDOM PARTICLE EFFECT ON CLICK =====
document.addEventListener("click", (e) => {
  // Create sparkle effect
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.cssText = `
      position: fixed;
      width: 5px;
      height: 5px;
      background: #C1121F;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
    `;

    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / 5;
    const velocity = 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let opacity = 1;
    let x = e.clientX;
    let y = e.clientY;

    function animateSparkle() {
      x += vx;
      y += vy;
      opacity -= 0.02;

      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";
      sparkle.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animateSparkle);
      } else {
        sparkle.remove();
      }
    }

    animateSparkle();
  }
});

// ===== LAZY LOADING OPTIMIZATION =====
if ("IntersectionObserver" in window) {
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== PAGE LOAD PERFORMANCE =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ===== CONSOLE MESSAGE =====
console.log(
  "%c👨‍💻 Vojasvi Reddy Portfolio",
  "color: #C1121F; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cLooking for developers? Let's connect!",
  "color: #003049; font-size: 14px;",
);
console.log(
  "%c📧 vojasvireddy13k@gmail.com",
  "color: #669BBC; font-size: 12px;",
);
