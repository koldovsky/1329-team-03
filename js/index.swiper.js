function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return; // Якщо слайдер не знайдено – вихід

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // Отримуємо всі слайди з слайдера
  let slides = slider.querySelectorAll(".slide");
  if (slides.length < 1) return;

  // Клонуємо перший та останній слайди для безкінечності
  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];
  const firstClone = firstSlide.cloneNode(true);
  const lastClone = lastSlide.cloneNode(true);

  // Додаємо клон першого слайда в кінець і клон останнього слайда на початок
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, firstSlide);

  // Оновлюємо перелік слайдів після вставки клонів
  slides = slider.querySelectorAll(".slide");

  // Встановлюємо початковий індекс
  // (перед реальним першим слайдом тепер стоїть клон останнього, тому 1)
  let currentIndex = 1;
  let slideWidth = slides[currentIndex].offsetWidth + 23; // 23px – відступ між слайдами

  // Початкова позиція слайдера (використовуємо шаблонні рядки з бектиками)
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Функція оновлення позиції слайдера
  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Обробка кліку "Вперед"
  nextBtn.addEventListener("click", function () {
    // Якщо це клон першого слайда (останній індекс), далі не йдемо
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSliderPosition();
  });

  // Обробка кліку "Назад"
  prevBtn.addEventListener("click", function () {
    // Якщо це клон останнього слайда (індекс 0), далі не йдемо
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();
  });

  // Після завершення анімації перевіряємо, чи ми на клонованому слайді,
  // і миттєво перескакуємо на відповідний реальний слайд без анімації
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

  // При зміні розміру вікна оновлюємо ширину слайда
  window.addEventListener("resize", function () {
    slideWidth = slides[currentIndex].offsetWidth + 23;
    updateSliderPosition(false);
  });
}

// Ініціалізація слайдера при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".slider-container")) {
    initializeSlider();
  }
});

// Ініціалізація слайдера після HTMX-заміни контенту (за потреби)
document.body.addEventListener("htmx:afterSwap", function (event) {
  if (document.querySelector(".slider-container")) {
    console.log("HTMX заміна: слайдер завантажено, ініціалізуємо його.");
    initializeSlider();
  }
});
