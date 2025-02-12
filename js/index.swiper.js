let currentIndex = 0;

function moveSlide(step) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    currentIndex += step;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
