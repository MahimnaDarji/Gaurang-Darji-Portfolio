"use strict";

const mobileNavigationButton = document.querySelector(
    ".mobile-navigation-button"
);

const navigationList = document.querySelector(
    ".main-navigation__list"
);

const navigationLinks = document.querySelectorAll(
    ".main-navigation__list a"
);

function closeMobileNavigation() {
    if (!mobileNavigationButton || !navigationList) {
        return;
    }

    mobileNavigationButton.setAttribute(
        "aria-expanded",
        "false"
    );

    navigationList.classList.remove("is-open");
    document.body.classList.remove("navigation-open");
}

function openMobileNavigation() {
    if (!mobileNavigationButton || !navigationList) {
        return;
    }

    mobileNavigationButton.setAttribute(
        "aria-expanded",
        "true"
    );

    navigationList.classList.add("is-open");
    document.body.classList.add("navigation-open");
}

if (mobileNavigationButton && navigationList) {
    mobileNavigationButton.addEventListener("click", () => {
        const isExpanded =
            mobileNavigationButton.getAttribute("aria-expanded") ===
            "true";

        if (isExpanded) {
            closeMobileNavigation();
        } else {
            openMobileNavigation();
        }
    });
}

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigationLinks.forEach((navigationLink) => {
            navigationLink.classList.remove("is-active");
        });

        link.classList.add("is-active");
        closeMobileNavigation();
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileNavigation();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMobileNavigation();
    }
});

const pageSections = Array.from(
    document.querySelectorAll("section[id], header[id]")
);

if ("IntersectionObserver" in window && pageSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (firstEntry, secondEntry) =>
                        secondEntry.intersectionRatio -
                        firstEntry.intersectionRatio
                );

            if (visibleEntries.length === 0) {
                return;
            }

            const activeSectionId =
                visibleEntries[0].target.id;

            navigationLinks.forEach((link) => {
                const targetId = link
                    .getAttribute("href")
                    ?.replace("#", "");

                link.classList.toggle(
                    "is-active",
                    targetId === activeSectionId
                );
            });
        },
        {
            root: null,
            rootMargin: "-35% 0px -55% 0px",
            threshold: [0, 0.25, 0.5, 0.75, 1]
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}
