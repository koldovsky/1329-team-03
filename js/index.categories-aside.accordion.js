document.addEventListener("DOMContentLoaded", function () {
  // Отримуємо всі акордеони
  const accordionButtons = document.querySelectorAll(
    ".filters__item .filter-button"
  );

  // Функція для відкриття/закриття акордеону
  function toggleAccordion(event) {
    const accordionItem = event.target.closest(".filters__item");
    const accordionContent = accordionItem.querySelector(
      ".filters__item-category"
    );

    // Якщо акордеон вже відкритий, закриваємо його
    if (accordionContent.style.display === "block") {
      accordionContent.style.display = "none";
    } else {
      // Закриваємо всі інші акордеони
      const allContents = document.querySelectorAll(".filters__item-category");
      allContents.forEach((content) => (content.style.display = "none"));

      // Відкриваємо поточний акордеон
      accordionContent.style.display = "block";
    }
  }

  // Додаємо слухачів подій для всіх кнопок акордеонів
  accordionButtons.forEach((button) => {
    button.addEventListener("click", toggleAccordion);
  });
});
