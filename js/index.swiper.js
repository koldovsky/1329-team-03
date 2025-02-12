function initializeCircularSlider() {
  const slider = document.querySelector(".slider");
  const slides = Array.from(slider.children);
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // Дублюємо слайди для плавного переходу
  slider.append(...slides.map(slide => slide.cloneNode(true)));
  slider.prepend(...slides.map(slide => slide.cloneNode(true)));

  let currentIndex = slides.length;
  const slideWidth = slides[0].offsetWidth + 20; // 20px — gap

  // Встановлюємо початкову позицію
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  function updateSliderPosition() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Клік на кнопку "Вперед"
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    updateSliderPosition();
    if (currentIndex >= slides.length * 2) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentIndex = slides.length;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }, 500);
    }
  });

  // Клік на кнопку "Назад"
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    updateSliderPosition();
    if (currentIndex < slides.length) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentIndex = slides.length * 2 - 1;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }, 500);
    }
  });

  // Динамічна адаптація до ширини вікна
  window.addEventListener("resize", () => {
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${currentIndex * (slides[0].offsetWidth + 20)}px)`;
  });
}

document.addEventListener("DOMContentLoaded", initializeCircularSlider);
