const portfolio = Array.from(document.querySelectorAll(".item-portfolio"));

const checkbox = document.querySelector(".navigation__checkbox");

portfolio.forEach((element) => {
    element.addEventListener("mouseover", () => {
        element.querySelector("img").style.transform = "scale(1)";
    });
    element.addEventListener("mouseout", () => {
        element.querySelector("img").style.transform = "scale(1.1)";
    });
});

window.addEventListener("load", onLoad);

function onLoad() {
    const copyrightEl = document.getElementById("year");

    if (copyrightEl) {
        const currentYear = new Date().getFullYear();
        const copyrightText = `2018 - ${currentYear}`;

        copyrightEl.innerHTML = copyrightText;
    }
}

document.addEventListener("click", (event) => {
    const e = event.target.className;
    console.log(event.target.hash);

    if (
        e !== "navigation__nav" &&
        e !== "navigation__link" &&
        e !== "navigation__checkbox"
    ) {
        if (event.target.hash) {
            let hash = "#" + event.target.hash;
            // document.querySelector(event.target.hash).focus();
            console.log(event.target.hash.attr);

            // event.target.hash.attr("tabindex", "-1"); //Adding tabindex for elements not focusable
            // console.log(event.target.hash.attr);

            event.target.hash.focus(); //Setting focus
            document.querySelector(hash).scrollIntoView({
                behavior: "smooth",
            });
            // event.target.hash.focus();
            // if (event.target.hash.is(":focus")) {
            //    //checking if the target was focused
            //    return false;
            // } else {
            // }
        }

        // e === "navigation__checkbox"
        //    ? (checkbox.checked = false)
        //    : (checkbox.checked = true);
    }
});
