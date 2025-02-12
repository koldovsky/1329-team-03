function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  
  // Отримуємо слайди
  let slides = slider.querySelectorAll(".slide");
  if (slides.length < 1) return;

  // Клонуємо перший та останній слайд
  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];
  const firstClone = firstSlide.cloneNode(true);
  const lastClone = lastSlide.cloneNode(true);

  // Додаємо клони
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, firstSlide);

  // Оновлюємо список слайдів
  slides = slider.querySelectorAll(".slide");

  // === ДОДАТИ ЦЕ, щоб усі стали видимі (fade-in) ===
  slides.forEach((slide) => {
    slide.classList.add('visible');
  });
  // ================================================

  // Початковий індекс
  let currentIndex = 1;
  let slideWidth = slides[currentIndex].offsetWidth + 23;

  // Початкова позиція
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Функція оновлення позиції
  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Клік "Вперед"
  nextBtn.addEventListener("click", function () {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSliderPosition();
  });

  // Клік "Назад"
  prevBtn.addEventListener("click", function () {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();
  });

  // Перевірка клонів
  slider.addEventListener("transitionend", function () {
    if (slides[currentIndex].isEqualNode(firstClone)) {
      currentIndex = 1;
      updateSliderPosition(false);
    }
    if (slides[currentIndex].isEqualNode(lastClone)) {
      currentIndex = slides.length - 2;
      updateSliderPosition(false);
    }
  });

  // При зміні розміру
  window.addEventListener("resize", function () {
    slideWidth = slides[currentIndex].offsetWidth + 23;
    updateSliderPosition(false);
  });
}
