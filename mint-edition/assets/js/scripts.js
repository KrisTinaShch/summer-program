


$('.before-after__slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    dots: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                dots: true,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
});


document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".before-after-container");

    sliders.forEach(container => {
        const slider = container.querySelector(".slider");
        const afterImage = container.querySelector(".after-image");
        const handle = container.querySelector(".slider-handle");
        const slickContainer = container.closest(".before-after__container");

        let isDragging = false;

        handle.addEventListener("pointerdown", function (event) {
            isDragging = true;
            document.body.style.userSelect = "none";
            event.preventDefault();

            if (slickContainer) {
                $(slickContainer).slick("slickSetOption", "swipe", false, false);
            }
        });

        document.addEventListener("pointermove", function (event) {
            if (isDragging) {
                let rect = container.getBoundingClientRect();
                let percentage = ((event.clientX - rect.left) / rect.width) * 100;
                percentage = Math.max(0, Math.min(100, percentage));

                slider.value = percentage;
                afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                let containerWidth = container.offsetWidth;
                let newPosition = (containerWidth * percentage) / 100;
                handle.style.left = `${newPosition}px`;
            }
        });

        document.addEventListener("pointerup", function () {
            isDragging = false;
            document.body.style.userSelect = "";

            if (slickContainer) {
                $(slickContainer).slick("slickSetOption", "swipe", true, false);
            }
        });

        handle.addEventListener("touchmove", function (event) {
            event.stopPropagation();
        });

        handle.addEventListener("mousedown", function (event) {
            event.stopPropagation();
        });
    });
});

// Animated numbers
const counters = document.querySelectorAll('.summer-program .stat strong');
let counted = false;

function animateCount(el, end, suffix = '') {
    let start = 0;
    const isDecimal = end % 1 !== 0;
    const duration = 1000;
    const step = isDecimal ? 0.1 : 1;
    const fps = 60;
    const increment = (end - start) / (duration / (1000 / fps));

    const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
            clearInterval(counter);
            el.textContent = isDecimal ? end.toFixed(1) + suffix : Math.floor(end) + suffix;
        } else {
            el.textContent = isDecimal ? start.toFixed(1) + suffix : Math.floor(start) + suffix;
        }
    }, 1000 / fps);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            counters.forEach(counter => {
                const value = parseFloat(counter.getAttribute('data-count'));
                const text = counter.textContent.trim();
                const suffix = text.replace(/[0-9.\s]/g, ''); // %, +, /5, etc.
                animateCount(counter, value, suffix);
            });
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.summer-program'));


// animated gif
const gif = document.querySelector('.prep-gif');
let gifPlayed = false;

const observer_gif = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !gifPlayed) {
            gifPlayed = true;
            // Перезапуск гифки
            const src = gif.getAttribute('src');
            gif.setAttribute('src', '');
            gif.setAttribute('src', src);
        }
    });
}, { threshold: 0.5 });

observer_gif.observe(document.querySelector('.prepare'));