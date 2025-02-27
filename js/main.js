// Cache DOM elements
const portfolio = Array.from(document.querySelectorAll(".item-portfolio"));
const checkbox = document.querySelector(".navigation__checkbox");
const navigationLinks = document.querySelectorAll(".navigation__link");

// Copyright year update
const updateCopyright = () => {
    const copyrightEl = document.getElementById("year");
    if (copyrightEl) {
        const currentYear = new Date().getFullYear();
        copyrightEl.textContent = `2018 - ${currentYear}`;
    }
};

// Smooth scroll functionality
const scrollToSection = (hash) => {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
};

// Close mobile menu after clicking a link
const closeMobileMenu = () => {
    if (window.innerWidth <= 768) {
        checkbox.checked = false;
    }
};

// Event Listeners
window.addEventListener("load", updateCopyright);

document.addEventListener("click", (event) => {
    const { target } = event;

    // Handle navigation links
    if (target.classList.contains("navigation__link")) {
        event.preventDefault();
        const hash = target.getAttribute("href");
        scrollToSection(hash);
        closeMobileMenu();
    }
});

// Optional: Add scroll spy functionality
const handleScrollSpy = () => {
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navigationLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}-link`) {
                link.classList.add("active");
            }
        });
    });
};

handleScrollSpy();

// Optional: Add keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && checkbox.checked) {
        checkbox.checked = false;
    }
});

import { experienceData } from "./data/experience.js";
import { educationData } from "./data/education.js";
import { portfolioData } from "./data/portfolio.js";

// Experience section renderer
const renderExperience = () => {
    const experienceSection = document.querySelector(".section-experience");

    const experienceHTML = experienceData
        .map(
            (experience) => `
        <div class="info-block">
            <aside class="info-block__years">
                <h4>${experience.period}</h4>
            </aside>
            <div class="info-block__vertical-line"></div>
            <aside class="info-block__details">
                <h2 class="heading-secondary">${experience.title}</h2>
                <h3 class="heading-tertiary">${experience.location}</h3>
                <ul class="list list--bullet">
                    ${experience.responsibilities
                        .map(
                            (resp) => `
                        <li>${resp}</li>
                    `
                        )
                        .join("")}
                </ul>
            </aside>
        </div>
    `
        )
        .join("");

    experienceSection.innerHTML = experienceHTML;
};

// Education section renderer
const renderEducation = () => {
    const educationSection = document.querySelector(".section-education");

    const educationHTML = educationData
        .map(
            (education, index) => `
        <div class="info-block">
            <aside class="info-block__years">
                <h4>${education.year}</h4>
            </aside>
            <div class="info-block__vertical-line">
                ${
                    index === 0
                        ? `
                <div class="info-block__vertical-line--icon">
                    <svg class="icon">
                        <use href="./img/sprite.svg#icon-graduation-cap"></use>
                    </svg>
                </div>
                `
                        : ""
                }
            </div>
            <aside class="info-block__details">
                <h2 class="heading-secondary">${education.title}</h2>
                <h3 class="heading-tertiary">${education.institution}</h3>
                <ul class="list list--bullet">
                    ${education.details
                        .map(
                            (detail) => `
                        <li>${detail}</li>
                    `
                        )
                        .join("")}
                </ul>
            </aside>
        </div>
    `
        )
        .join("");

    educationSection.innerHTML = educationHTML;
};

// Portfolio section renderer
const renderPortfolio = () => {
    const portfolioSection = document.querySelector(".section-portfolio");

    const portfolioHTML = portfolioData
        .map(
            (project) => `
        <figure class="item-portfolio">
            <img class="item-portfolio__img ${project.className || ""}"
                src="${project.imageUrl}"
                alt="${project.imageAlt}" />
            <figcaption class="figcaption">
                <h3 class="figcaption__heading">${project.title}</h3>
                <p class="figcaption__paragraph">${project.description}</p>
                <p class="figcaption__paragraph">
                    <strong>Tags:</strong>
                    <br />${project.tags.join(", ")}
                </p>
                <a class="figcaption__link" href="${
                    project.projectUrl
                }" target="_blank"></a>
            </figcaption>
        </figure>
    `
        )
        .join("");

    portfolioSection.innerHTML = portfolioHTML;

    // Reattach hover effects
    const portfolioItems = Array.from(
        document.querySelectorAll(".item-portfolio")
    );
    portfolioItems.forEach((element) => {
        const img = element.querySelector("img");

        element.addEventListener("mouseover", () => {
            img.style.transform = "scale(1)";
            img.style.transition = "transform 0.3s ease";
        });

        element.addEventListener("mouseout", () => {
            img.style.transform = "scale(1.1)";
        });
    });
};

// Call all render functions when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateCopyright();
    renderExperience();
    renderEducation();
    renderPortfolio();
});
