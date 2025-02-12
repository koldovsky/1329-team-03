var swiper = new Swiper('.swiper', {
  //   slidesPerView: 7,
  //   direction: getDirection(),
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true, // безкінечне прокручування
    breakpoints: {
      1470: { slidesPerView: 7,},
    1150: { slidesPerView: 5, },
    900: { slidesPerView: 4,  },
    700: { slidesPerView: 3,  },
    500: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
      },
  //   on: {
  //     resize: function () {
  //       swiper.changeDirection(getDirection());
  //     },
  //   },
  });