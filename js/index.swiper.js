function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return; // Якщо слайдер не знайдено – вихід

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

  // Додаємо клон останнього на початок та першого – в кінець
  slider.insertBefore(lastClone, firstSlide);
  slider.appendChild(firstClone);

  // Оновлюємо перелік слайдів
  slides = slider.querySelectorAll(".slide");

  // Початковий індекс (1, бо 0 — це клон останнього слайду)
  let currentIndex = 1;
  
  // Визначаємо ширину поточного слайду
  // Якщо додасте margin: 0 5px, потрібно буде додати +10 пікселів до slideWidth
  let slideWidth = slides[currentIndex].offsetWidth;

  // Початкова позиція
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Функція оновлення позиції
  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Клік "Вперед"
  nextBtn.addEventListener("click", () => {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSliderPosition();
  });

  // Клік "Назад"
  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();
  });

  // Після завершення анімації перевіряємо, чи перебуваємо на клоні
  slider.addEventListener("transitionend", () => {
    // Якщо це клон першого
    if (slides[currentIndex].isEqualNode(firstClone)) {
      currentIndex = 1;
      updateSliderPosition(false);
    }
    // Якщо це клон останнього
    if (slides[currentIndex].isEqualNode(lastClone)) {
      currentIndex = slides.length - 2;
      updateSliderPosition(false);
    }
  });

  // При зміні розміру оновлюємо ширину слайду
  window.addEventListener("resize", () => {
    slideWidth = slides[currentIndex].offsetWidth;
    updateSliderPosition(false);
  });
}

// Ініціалізація слайдера при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".slider-container")) {
    initializeSlider();
  }
});

// Якщо використовуєте HTMX або динамічне завантаження, можна викликати повторну ініціалізацію:
document.body.addEventListener("htmx:afterSwap", () => {
  if (document.querySelector(".slider-container")) {
    console.log("HTMX заміна: слайдер завантажено, ініціалізуємо його.");
    initializeSlider();
  }
});
