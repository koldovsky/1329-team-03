function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let slides = Array.from(slider.children);
  if (slides.length < 2) return;

  // Додаємо клони для безперервного циклу
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  slides = Array.from(slider.children);
  let currentIndex = 1;
  let slideWidth = slides[currentIndex].offsetWidth + 23; // Враховуємо gap між слайдами

  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  function updateSliderPosition(transition = true) {
    slider.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function moveNext() {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateSliderPosition();

    slider.addEventListener("transitionend", function handleTransition() {
      if (slides[currentIndex] === firstClone) {
        currentIndex = 1;
        updateSliderPosition(false);
      }
      slider.removeEventListener("transitionend", handleTransition);
    });
  }

  function movePrev() {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSliderPosition();

    slider.addEventListener("transitionend", function handleTransition() {
      if (slides[currentIndex] === lastClone) {
        currentIndex = slides.length - 2;
        updateSliderPosition(false);
      }
      slider.removeEventListener("transitionend", handleTransition);
    });
  }

  nextBtn.addEventListener("click", moveNext);
  prevBtn.addEventListener("click", movePrev);

  window.addEventListener("resize", function () {
    slideWidth = slides[currentIndex].offsetWidth + 23;
    updateSliderPosition(false);
  });
}

document.addEventListener("DOMContentLoaded", initializeSlider);
