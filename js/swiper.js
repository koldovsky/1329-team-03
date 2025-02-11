document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");

  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth + 15; // 140 + 15 = 155

  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    console.log("currentIndex:", currentIndex, "transform:", slider.style.transform);
  }

  nextBtn.addEventListener("click", function () {
    console.log("Next clicked!");
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSliderPosition();
  });

  prevBtn.addEventListener("click", function () {
    console.log("Prev clicked!");
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }
    updateSliderPosition();
  });

  window.addEventListener("resize", function () {
    slideWidth = slides[0].offsetWidth + 15;
    updateSliderPosition();
  });
});