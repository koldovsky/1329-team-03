<script>
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const slides = document.querySelectorAll(".slide");
  
  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth + 15; // Добавляем 15px, чтобы учесть отступ между слайдами
  
  function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    slider.style.transition = 'transform 0.5s ease-in-out';
  }

  nextBtn.addEventListener("click", function () {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Возвращаемся к первому слайду
    }
    updateSliderPosition();
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1; // Переход на последний слайд
    }
    updateSliderPosition();
  });

  window.addEventListener('resize', function () {
    slideWidth = slides[0].offsetWidth + 15;
    updateSliderPosition();
  });
});
</script>
