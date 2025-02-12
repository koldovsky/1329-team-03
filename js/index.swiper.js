document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideWidth = slides[0].clientWidth;

    function updateSliderPosition() {
        slider.style.transform = 'translateX(-${currentIndex * slideWidth}px)';
    }

    nextBtn.addEventListener("click", function () {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Повертаємось на початок
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Переходимо до останнього слайду
        }
        updateSliderPosition();
    });
});