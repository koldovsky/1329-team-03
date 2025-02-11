// // Функція для визначення кількості слайдів, що відображаються
// function getSlidesPerView() {
//   const width = window.innerWidth;
//   if (width >= 1470) return 7;
//   if (width >= 1150) return 5;
//   if (width >= 900)  return 4;
//   if (width >= 700)  return 3;
//   if (width >= 500)  return 2;
//   return 1;
// }

// // Ініціалізація Swiper
// let swiper = new Swiper(".swiper", {
//   slidesPerView: getSlidesPerView(),
//   spaceBetween: 15,
//   loop: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
// });

// // Оновлення кількості слайдів при зміні розміру екрану
// window.addEventListener("resize", () => {
//   const updatedSlides = getSlidesPerView();
//   if (swiper.params.slidesPerView !== updatedSlides) {
//     swiper.params.slidesPerView = updatedSlides;
//     swiper.update();
//   }
// });
