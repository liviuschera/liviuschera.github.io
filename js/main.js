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
import { skillsData } from "./data/skills.js";
import { interestsData } from "./data/interests.js";
import { aboutData } from "./data/about.js";

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

// Skills section renderer
const renderSkills = () => {
    const skillsSection = document.querySelector(".section-skills");

    const renderSkillList = (skills) => {
        return skills
            .map(
                (skill) => `
            <li class="skill-list__item">
                <span class="bar ${skill.className}" style="width: ${skill.level}%">
                    ${skill.name}
                </span>
            </li>
        `
            )
            .join("");
    };

    const renderLanguageCircles = () => {
        return skillsData.languages.skills
            .map(
                (language) => `
            <svg class="svg" width="100" height="100">
                <filter id="shadow">
                    <feDropShadow dx="0" dy="0" stdDeviation="1" />
                </filter>
                <circle class="base" cx="50" cy="50" r="40"></circle>
                <circle class="language-circle ${language.className}"
                        cx="50" cy="50" r="40"
                        style="stroke-dasharray: ${language.strokeDasharray}"></circle>
                <text id="sessionLabel" x="50" y="-45"
                      font-size="15" text-anchor="middle">
                    ${language.name}
                </text>
            </svg>
        `
            )
            .join("");
    };

    const skillsHTML = `
        <div class="section-skills__professional">
            <div class="section-skills__title">
                <h3>${skillsData.professional.title}</h3>
            </div>
            <ul class="list skill-list">
                ${renderSkillList(skillsData.professional.skills)}
            </ul>
        </div>

        <div class="section-skills__personal">
            <div class="section-skills__title">
                <h3>${skillsData.personal.title}</h3>
            </div>
            <ul class="list skill-list">
                ${renderSkillList(skillsData.personal.skills)}
            </ul>
        </div>

        <div class="section-skills__language">
            <div class="section-skills__title">
                <h3>${skillsData.languages.title}</h3>
            </div>
            <div class="section-skills__language-wrapper">
                ${renderLanguageCircles()}
            </div>
        </div>
    `;

    skillsSection.innerHTML = skillsHTML;
};

// Interests section renderer
const renderInterests = () => {
    const interestsSection = document.querySelector(".section-interests");

    const interestsHTML = `
        <p class="paragraph">${interestsData.description}</p>
        ${interestsData.interests
            .map(
                (interest) => `
            <div class="elem">
                <svg class="elem__icon">
                    <use href="./img/sprite.svg#icon-${interest.icon}"></use>
                </svg>
                <span class="elem__text">${interest.text}</span>
            </div>
        `
            )
            .join("")}
    `;

    interestsSection.innerHTML = interestsHTML;
};

// About section renderer
const renderAbout = () => {
    const aboutSection = document.querySelector(".section-about__right");

    const aboutHTML = `
        <h1 class="heading-primary heading-primary--about">
            <span class="heading-primary--1">Hi, I'm</span>
            ${aboutData.name}
        </h1>

        <h3 class="heading-tertiary">${aboutData.title}</h3>

        ${aboutData.description
            .map((paragraph) => `<p class="paragraph">${paragraph}</p>`)
            .join("")}

        <div class="info-box">
            <ul class="list">
                <li>
                    <svg class="icon">
                        <use href="./img/sprite.svg#icon-location-pin"></use>
                    </svg>${aboutData.contact.location}
                </li>
                <li>
                    <svg class="icon">
                        <use href="./img/sprite.svg#icon-old-phone"></use>
                    </svg>${aboutData.contact.phone}
                </li>
                <li>
                    <svg class="icon">
                        <use href="./img/sprite.svg#icon-email"></use>
                    </svg>${aboutData.contact.email}
                </li>
            </ul>

            <ul class="list">
                ${aboutData.socialLinks
                    .map(
                        (link) => `
                        <li class="links-list__item">
                            <a class="link" href="${link.url}" target="_blank">
                                <svg class="icon">
                                    <use href="./img/sprite.svg#icon-${link.icon}"></use>
                                </svg> ${link.text}
                            </a>
                        </li>
                    `
                    )
                    .join("")}
            </ul>
        </div>
    `;

    aboutSection.innerHTML = aboutHTML;
};

// Call all render functions when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateCopyright();
    renderAbout();
    renderExperience();
    renderEducation();
    renderPortfolio();
    renderSkills();
    renderInterests();
});
