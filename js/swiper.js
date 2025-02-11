document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");
  
  let currentIndex = 0;
  const slideWidth = slides[0].offsetWidth + 15; // Учитываем ширину одного слайда и отступ

  // Функция обновления позиции слайдера
  function updateSliderPosition() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Клик по кнопке "Вперед"
  nextBtn.addEventListener("click", function () {
    currentIndex++;
    if (currentIndex >= slides.length) {
      // Если достигли последнего слайда, мгновенно возвращаемся к первому
      slider.style.transition = "none"; // Отключаем анимацию
      currentIndex = 0; // Первый слайд
      slider.style.transform = `translateX(0)`; // Вернуть в начало
    } else {
      updateSliderPosition();
    }
  });

  // Клик по кнопке "Назад"
  prevBtn.addEventListener("click", function () {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1; // Возвращаемся на последний слайд
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    } else {
      updateSliderPosition();
    }
  });

  // Пересчет ширины при изменении размера окна
  window.addEventListener("resize", function () {
    const slideWidth = slides[0].offsetWidth + 15; // Заново получаем ширину слайда
    updateSliderPosition();
  });
});
