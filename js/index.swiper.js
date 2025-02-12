var swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true, // безкінечне прокручування
  autoplay: {
    delay: 3000, // Автоматичне прокручування (3 секунди)
    disableOnInteraction: false,
  },
  breakpoints: {
    1470: { slidesPerView: 7 },
    1150: { slidesPerView: 5 },
    900: { slidesPerView: 4 },
    700: { slidesPerView: 3 },
    500: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
});
