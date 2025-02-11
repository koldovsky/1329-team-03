// document.addEventListener("DOMContentLoaded", function () {
//   const slider = document.querySelector(".slider");
//   const prevBtn = document.querySelector(".prev");
//   const nextBtn = document.querySelector(".next");
//   const slides = document.querySelectorAll(".slide");
  
//   let currentIndex = 0;
//   let slideWidth = slides[0].offsetWidth + 23; // 23px - gap між слайдами

//   // Функція оновлення позиції слайдера
//   function updateSliderPosition() {
//     slider.style.transition = "transform 0.5s ease-in-out";
//     slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
//     console.log("Slider moved to index:", currentIndex);
//   }

//   // Обробник кліку "Вперед"
//   nextBtn.addEventListener("click", function () {
//     console.log("Next button clicked");
//     if (currentIndex < slides.length - 1) {
//       currentIndex++;
//       updateSliderPosition();
//     } else {
//       currentIndex = 0;
//       slider.style.transition = "none";
//       slider.style.transform = `translateX(0)`;
//       setTimeout(updateSliderPosition, 20);
//     }
//     console.log("currentIndex:", currentIndex);
//   });

//   // Обробник кліку "Назад"
//   prevBtn.addEventListener("click", function () {
//     console.log("Prev button clicked");
//     if (currentIndex > 0) {
//       currentIndex--;
//       updateSliderPosition();
//     } else {
//       currentIndex = slides.length - 1;
//       slider.style.transition = "none";
//       slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
//       setTimeout(updateSliderPosition, 20);
//     }
//     console.log("currentIndex:", currentIndex);
//   });

//   // Оновлення slideWidth при зміні розміру вікна
//   window.addEventListener("resize", function () {
//     slideWidth = slides[0].offsetWidth + 23;
//     updateSliderPosition();
//     console.log("Window resized, new slideWidth:", slideWidth);
//   });
// });
