document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;

    function moveSlide(step) {
        const slides = document.querySelector('.slider');
        const totalSlides = document.querySelectorAll('.slide').length;
        currentIndex += step;

        // Оновлення індексу слайду
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        }

        // Переміщення слайдів
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Додаємо обробники подій для кнопок
    document.querySelector('.prev').addEventListener('click', function () {
        moveSlide(-1); // Переміщаємо на попередній слайд
    });

    document.querySelector('.next').addEventListener('click', function () {
        moveSlide(1); // Переміщаємо на наступний слайд
    });
});
