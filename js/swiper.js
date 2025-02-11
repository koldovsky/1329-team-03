document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1470: { slidesPerView: 7, spaceBetween: 10 },
      1150: { slidesPerView: 5, spaceBetween: 10 },
      900: { slidesPerView: 4, spaceBetween: 10 },
      700: { slidesPerView: 3, spaceBetween: 10 },
      500: { slidesPerView: 2, spaceBetween: 10 },
      0: { slidesPerView: 1, spaceBetween: 10 },
    },
  });
});
