function updateSliderPosition() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function resetSliderPosition() {
    slider.style.transition = "none";
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
