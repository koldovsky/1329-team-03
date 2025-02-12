document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;

    function moveSlide(step) {
        const slides = document.querySelector('.slider');
        const totalSlides = document.querySelectorAll('.slide').length;
        currentIndex += step;

        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        }

        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    // Перевірка елементів
    console.log(prevButton, nextButton);
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function () {
            moveSlide(-1);
        });

        nextButton.addEventListener('click', function () {
            moveSlide(1);
        });
    }
});
