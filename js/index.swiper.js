function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return; // Якщо слайдера немає, виходимо

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // Отримуємо всі слайди
  let slides = slider.querySelectorAll(".slide");
  if (slides.length < 1) return;

  // Клонуємо перший та останній слайди для "безкінечності"
  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];
  const firstClone = firstSlide.cloneNode(true);
  const lastClone = lastSlide.cloneNode(true);

  // Додаємо клон першого в кінець і клон останнього на початок
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, firstSlide);

  // Заново отримуємо список слайдів (включно з клонованими)
  slides = slider.querySelectorAll(".slide");

  // === ДОДАЄМО КЛАС .visible ДЛЯ fade-in УСІМ СЛАЙДАМ ===
  slides.forEach(slide => {
    slide.classList.add("visible");
  });

  // Початковий індекс (1, бо на 0 тепер стоїть клон останнього)
  let currentIndex = 1;
  let slideWidth = slides[currentIndex].offsetWidth + 23; // 23px - відступ між слайдами

  // Початкова позиція
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Функція оновлення позиції
  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Клік "Вперед"
  nextBtn.addEventListener("click", function () {
    // Якщо дійшли до клонованого першого (останній індекс), далі не йдемо
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSliderPosition();
  });

  // Клік "Назад"
  prevBtn.addEventListener("click", function () {
    // Якщо дійшли до клонованого останнього (індекс 0), далі не йдемо
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();
  });

  // Після завершення анімації перевіряємо, чи ми на клоні
  slider.addEventListener("transitionend", function () {
    // Якщо поточний слайд — клон першого
    if (slides[currentIndex].isEqualNode(firstClone)) {
      currentIndex = 1;
      updateSliderPosition(false);
    }
    // Якщо поточний слайд — клон останнього
    if (slides[currentIndex].isEqualNode(lastClone)) {
      currentIndex = slides.length - 2;
      updateSliderPosition(false);
    }
  });

  // При зміні розміру вікна перераховуємо ширину
  window.addEventListener("resize", function () {
    slideWidth = slides[currentIndex].offsetWidth + 23;
    updateSliderPosition(false);
  });
}

// Ініціалізація слайдера після завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".slider-container")) {
    initializeSlider();
  }
});

// Ініціалізація після HTMX-заміни (якщо потрібно)
document.body.addEventListener("htmx:afterSwap", function () {
  if (document.querySelector(".slider-container")) {
    console.log("HTMX заміна: слайдер завантажено, ініціалізуємо його.");
    initializeSlider();
  }
});
