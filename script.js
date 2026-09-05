/* =========================================
   PORTFOLIO JAVASCRIPT
   Hamad Ahmad Ghalib
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

const typingText = document.getElementById("typingText");

const scrollProgress = document.querySelector(".scroll-progress");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const contactForm = document.getElementById("contactForm");

const submitButton = document.getElementById("submitButton");

const formStatus = document.getElementById("formStatus");

const cursorGlow = document.querySelector(".cursor-glow");


/* =========================================
   CURRENT YEAR
========================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   MOBILE MENU
========================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

}


/* =========================================
   THEME TOGGLE
========================================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    body.classList.add("light-mode");

    if (themeToggle) {
        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';
    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light-mode");

        const isLight = body.classList.contains("light-mode");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        themeToggle.innerHTML = isLight
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}


/* =========================================
   TYPING EFFECT
========================================= */

const roles = [
    "Web Developer",
    "Software Engineering Student",
    "Frontend Developer",
    "Problem Solver"
];

let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeRole() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeRole, 1800);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    setTimeout(
        typeRole,
        deleting ? 45 : 90
    );
}

typeRole();


/* =========================================
   SCROLL PROGRESS
========================================= */

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${progress}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 200;

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   BACK TO TOP
========================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    },
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   CURSOR GLOW
========================================= */

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

    window.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

            cursorGlow.style.opacity = "1";

        }
    );

    document.addEventListener(
        "mouseleave",
        () => {

            cursorGlow.style.opacity = "0";

        }
    );

}


/* =========================================
   PROJECT CARD 3D EFFECT
========================================= */

const projectCards =
    document.querySelectorAll(".project-card");


if (window.matchMedia("(pointer: fine)").matches) {

    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* =========================================
   PROFILE CARD 3D EFFECT
========================================= */

const profileCard =
    document.querySelector(".profile-card");


if (
    profileCard &&
    window.matchMedia("(pointer: fine)").matches
) {

    profileCard.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                profileCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            profileCard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    profileCard.addEventListener(
        "mouseleave",
        () => {

            profileCard.style.transform =
                "rotate(3deg)";

        }
    );

}


/* =========================================
   FORMSPREE CONTACT FORM
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!submitButton || !formStatus) {
                return;
            }


            const originalButton =
                submitButton.innerHTML;


            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            submitButton.disabled = true;

            submitButton.innerHTML =
                '<span>Sending...</span>' +
                '<i class="fa-solid fa-spinner fa-spin"></i>';


            const formData =
                new FormData(contactForm);


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    formStatus.textContent =
                        "✓ Message sent successfully! I'll get back to you soon.";

                    formStatus.classList.add(
                        "success"
                    );


                    submitButton.innerHTML =
                        '<span>Message Sent</span>' +
                        '<i class="fa-solid fa-check"></i>';


                    contactForm.reset();


                    setTimeout(() => {

                        submitButton.innerHTML =
                            originalButton;

                        submitButton.disabled =
                            false;

                    }, 4000);


                } else {

                    let errorMessage =
                        "Something went wrong. Please try again.";


                    try {

                        const data =
                            await response.json();

                        if (
                            data &&
                            data.errors &&
                            data.errors.length
                        ) {

                            errorMessage =
                                data.errors
                                    .map(
                                        (error) =>
                                            error.message
                                    )
                                    .join(" ");

                        }

                    } catch (jsonError) {

                        console.error(
                            "Formspree response error:",
                            jsonError
                        );

                    }


                    formStatus.textContent =
                        `✕ ${errorMessage}`;

                    formStatus.classList.add(
                        "error"
                    );


                    submitButton.innerHTML =
                        '<span>Try Again</span>' +
                        '<i class="fa-solid fa-rotate-right"></i>';

                    submitButton.disabled =
                        false;

                }

            } catch (error) {

                console.error(
                    "Form submission error:",
                    error
                );


                formStatus.textContent =
                    "✕ Connection error. Please check your internet and try again.";

                formStatus.classList.add(
                    "error"
                );


                submitButton.innerHTML =
                    '<span>Try Again</span>' +
                    '<i class="fa-solid fa-rotate-right"></i>';

                submitButton.disabled =
                    false;

            }

        }
    );

}


/* =========================================
   ESCAPE KEY - CLOSE MENU
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navMenu
        ) {

            navMenu.classList.remove("open");

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

updateScrollProgress();
updateActiveNav();

console.log(
    "Portfolio Loaded 🚀 — Hamad Ahmad Ghalib"
);