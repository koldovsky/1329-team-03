function initializeInfiniteSlider() {
  const slider = document.querySelector(".slider");
  const slides = Array.from(slider.children);

  // Клонуємо слайди для створення безперервності
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });

  let currentPosition = 0;
  const slideWidth = slides[0].offsetWidth + 20; // 20px - gap між слайдами
  const totalSlides = slides.length * 2; // Урахування клонів

  // Функція для плавного пересування слайдера
  function updateSliderPosition() {
    currentPosition -= slideWidth;
    slider.style.transition = "transform 0.5s linear";
    slider.style.transform = `translateX(${currentPosition}px)`;

    // Якщо досягли кінця, повертаємося на початок
    if (Math.abs(currentPosition) >= slideWidth * (totalSlides / 2)) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentPosition = 0;
        slider.style.transform = `translateX(${currentPosition}px)`;
      }, 500);
    }
  }

  // Клік "Вперед"
  document.querySelector(".next").addEventListener("click", () => {
    updateSliderPosition();
  });

  // Клік "Назад"
  document.querySelector(".prev").addEventListener("click", () => {
    currentPosition += slideWidth;
    slider.style.transition = "transform 0.5s linear";
    slider.style.transform = `translateX(${currentPosition}px)`;

    if (currentPosition > 0) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentPosition = -slideWidth * (totalSlides / 2 - 1);
        slider.style.transform = `translateX(${currentPosition}px)`;
      }, 500);
    }
  });

  // Автоматична прокрутка
  setInterval(() => {
    updateSliderPosition();
  }, 3000); // Інтервал у 3 секунди
}

// Ініціалізація слайдера після завантаження DOM
document.addEventListener("DOMContentLoaded", initializeInfiniteSlider);
