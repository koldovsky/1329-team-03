const slider = document.querySelector(".slider");
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;
const slideWidth = slides[0].clientWidth;

// Клонуємо слайди для безперервної каруселі
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
});

function updateSliderPosition() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = 'translateX(-${currentIndex * slideWidth}px)';
}

function resetSliderPosition() {
    slider.style.transition = "none";
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    slider.style.transform = 'translateX(-${currentIndex * slideWidth}px)';
}

nextBtn.addEventListener("click", function () {
    currentIndex++;
    updateSliderPosition();
});

prevBtn.addEventListener("click", function () {
    currentIndex--;
    updateSliderPosition();
});

slider.addEventListener("transitionend", function () {
    if (currentIndex >= slides.length || currentIndex < 0) {
        resetSliderPosition();
    }
});