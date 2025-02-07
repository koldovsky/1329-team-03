/* Максим Зимин */

import { addProductToCart } from "./global.cart.js";

/* Об'єкт стану фільтрації товарів */
const filterState = {
  category: "all",
  priceRange: { min: 32.0, max: 225.99 },
  colors: new Set(),
  connections: new Set(),
  screenSizes: new Set(),
};

const CARDS_PER_PAGE = 12;
let displayedCards = 0;

/* Функція для отримання товарів з JSON-файлу */
async function fetchCards() {
  try {
    const response = await fetch("./api/cards.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.cards.filter(card => card.all === true); // Фільтруємо картки
  } catch (error) {
    console.error("Error loading cards:", error);
    return [];
  }
}

function renderCards(cards) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = ""; // Очищаємо контейнер

  cards.forEach((card) => {
    const cardElement = document.createElement("article");
    cardElement.className = `card${card.promoLabel ? " card--promo" : ""}`;
    cardElement.innerHTML = `
      <div class="card__image-container">          
        ${card.promoLabel ? `<span class="card__label">${card.promoLabel}</span>` : ""}          
        <img src="${card.image}" alt="${card.name}" class="card__image" />
        ${card.status === "Out of stock" ? `<div class="badge-bottom-pro badge-out-of-stock-pro"><span class="out-of-stock">${card.status}</span></div>` : ""}
      </div>
      <div class="card__info">
        <h2 class="card__name"><a href="#" class="card__name-link">${card.name}</a></h2>
        <div class="card__price-container">
          ${card.oldPrice ? `<p class="card__price card__price--old">$${card.oldPrice.toFixed(2)} USD</p>` : ""}
          <p class="card__price">$${card.price.toFixed(2)} USD</p>
        </div>   
        <button class="card__button card__button--cart" ${card.status === "Out of stock" ? "disabled" : ""}>Buy Now</button>       
      </div>
    `;

    const addProductToCartButton = cardElement.querySelector(".card__button--cart");
    if (card.status !== "Out of stock") {
      addProductToCartButton.addEventListener("click", () => {
        addProductToCart(card.name, card.price);
      });
    }

    cardsContainer.appendChild(cardElement);
  });
}

function filterCards(cards) {
  return cards.filter((card) => {
    if (!card.all) return false; // Відфільтровуємо картки, де card.all !== true

    // Інші умови фільтрації
    if (
      filterState.category !== "all" &&
      card.category.toLowerCase() !== filterState.category.toLowerCase()
    ) {
      return false;
    }
    if (
      card.price < filterState.priceRange.min ||
      card.price > filterState.priceRange.max
    ) {
      return false;
    }
    if (
      filterState.colors.size > 0 &&
      !card.colors.some((color) => filterState.colors.has(color.toLowerCase()))
    ) {
      return false;
    }
    if (
      filterState.connections.size > 0 &&
      !card.connections.some((conn) => filterState.connections.has(conn.toLowerCase()))
    ) {
      return false;
    }
    if (
      filterState.screenSizes.size > 0 &&
      !filterState.screenSizes.has(String(card.screenSizes))
    ) {
      return false;
    }

    return true;
  });
}

/* Оновлює відображення карток на основі поточного стану фільтрів */
function updateCards(cards) {
  const filteredCards = filterCards(cards); // Фільтруємо картки
  displayedCards = CARDS_PER_PAGE; // Скидаємо лічильник відображених карток до 12

  // Відображаємо перші 12 карток
  renderCards(filteredCards.slice(0, displayedCards));

  // Оновлюємо текст кнопки "Apply filters"
  const applyButton = document.querySelector(".filters__apply-button");
  if (applyButton) {
    applyButton.textContent = `Apply filters: ${filteredCards.length}`;
  }

  // Оновлюємо стан кнопки "Load More"
  const loadMoreButton = document.querySelector(".btn-outline-dark");
  if (filteredCards.length <= displayedCards) {
    loadMoreButton.style.display = "none"; // Приховати, якщо всі картки вже відображені
  } else {
    loadMoreButton.style.display = "block"; // Показати, якщо є ще картки
  }
}

/* Скидає всі фільтри до початкового стану */
function resetFilters() {
  // Відновлюємо значення фільтрів до їх початкових значень
  filterState.category = "all";

  // Очищаємо вибір кольорів, з'єднань і розмірів екранів
  filterState.colors.clear();
  filterState.connections.clear();
  filterState.screenSizes.clear();

  // Визначаємо мінімальні і максимальні ціни на основі карток у window.cards
  const prices = window.cards.map((p) => p.price);
  filterState.priceRange = {
    min: Math.min(...prices), // Мінімальна ціна
    max: Math.max(...prices), // Максимальна ціна
  };

  // Скидаємо всі чекбокси фільтрів до значення "unchecked"
  document
    .querySelectorAll('.filters__option input[type="checkbox"]')
    .forEach((checkbox) => (checkbox.checked = false));

  // Оновлюємо значення інпутів для цінового діапазону
  const rangeInputs = document.querySelectorAll(".filters__range-input");
  if (rangeInputs.length >= 2) {
    // Встановлюємо мінімальну і максимальну ціни в інпути
    rangeInputs[0].value = filterState.priceRange.min;
    rangeInputs[1].value = filterState.priceRange.max;

    // Оновлюємо відображення значень діапазону ціни на сторінці
    const rangeValues = document.querySelectorAll(".filters__range-value");
    if (rangeValues.length >= 2) {
      // Встановлюємо відображення мінімальної і максимальної ціни
      rangeValues[0].textContent = filterState.priceRange.min.toFixed(2);
      rangeValues[1].textContent = filterState.priceRange.max.toFixed(2);
    }
  }

  // Скидаємо всі активні опції фільтрів категорії
  document
    .querySelectorAll('.filters__option[data-filter="category"]')
    .forEach((option) => option.classList.remove("filters__option--active"));

  // Знаходимо опцію "всі категорії" і додаємо клас для позначення активної
  const allCategoryOption = document.querySelector(
    '.filters__option[data-value="all"]'
  );
  if (allCategoryOption) {
    // Додаємо клас активної опції для "всі категорії"
    allCategoryOption.classList.add("filters__option--active");
  }

  // Оновлюємо відображення карток після скидання фільтрів
  updateCards(window.cards);
}

function createFilterGroup(title, content) {
  return `
    <div class="filters__group">
      <div class="accordion__button">
        <span class="accordion__button-text">${title}</span>
        <img src="./img/categories-aside/arrow.svg" alt="Arrow" class="accordion__arrow" />
      </div>
      <div class="accordion__content">
        ${content}
      </div>
    </div>
  `;
}

function createOptionsGroup(options, filterType, isCheckbox = true) {
  // Перетворюємо масив опцій на HTML-код
  // isCheckbox - Чи використовувати чекбокси (за замовчуванням true)
  const optionsHTML = options
    .map((option) => {
      // Якщо isCheckbox true, створюємо чекбокс для кожної опції
      if (isCheckbox) {
        return ` 
        <div class="filters__option">
          <label class="filters__option-label">
            <input type="checkbox" data-filter="${filterType}" value="${option.toLowerCase()}" /> ${option}
          </label>
        </div>
      `;
      }

      // Якщо isCheckbox false, створюємо інший тип елементу (наприклад, <p>) для опції
      return ` 
      <div class="filters__option" data-filter="${filterType}" data-value="${option.toLowerCase()}">
        <p class="filters__option-label">${option}</p>
      </div>
    `;
    })
    .join(""); // Об'єднуємо всі елементи в одну строку

  return `<div class="filters__option-group">${optionsHTML}</div>`;
}

function createPriceRange(minPrice, maxPrice) {
  return `
    <div class="filters__range">
      <div class="filters__range-slider">
        <div class="filters__range-progress"></div>
        
        <div class="filters__range-inputs">
          <input
            type="range"
            class="filters__range-input filters__range-input--min"
            min="${minPrice}"   
            max="${maxPrice}"  
            value="${minPrice}" 
            step="1"      
          />

          <input
            type="range"
            class="filters__range-input filters__range-input--max"
            min="${minPrice}"  
            max="${maxPrice}"
            value="${maxPrice}"
            step="1"         
          />
        </div>
      </div>

      <div class="filters__range-values">
        <div class="filters__range-value">$${minPrice.toFixed(2)}</div>   
        <div class="filters__range-dash">-</div>                         
        <div class="filters__range-value">$${maxPrice.toFixed(2)}</div>  
      </div>
    </div>
  `;
}

function initializePriceRangeSlider() {
  // Отримуємо елементи слайдерів мінімальної і максимальної ціни
  const rangeMin = document.querySelector(".filters__range-input--min");
  const rangeMax = document.querySelector(".filters__range-input--max");
  // Отримуємо елемент для прогресу між слайдерами
  const progress = document.querySelector(".filters__range-progress");
  // Отримуємо елементи для відображення мінімального і максимального значення
  const valueMin = document.querySelector(
    ".filters__range-values .filters__range-value:first-child"
  );
  const valueMax = document.querySelector(
    ".filters__range-values .filters__range-value:last-child"
  );

  // Якщо не вдалося знайти всі елементи, виводимо повідомлення про помилку
  if (!rangeMin || !rangeMax || !progress || !valueMin || !valueMax) {
    console.log("Range slider elements not found");
    return;
  }

  // Функція для оновлення прогресу слайдера і відображення значень
  function updateProgress() {
    // Отримуємо значення слайдерів
    const min = parseInt(rangeMin.value);
    const max = parseInt(rangeMax.value);

    // Обчислюємо відсоткове значення для мінімального і максимального слайдера
    const minPercent =
      ((min - rangeMin.min) / (rangeMin.max - rangeMin.min)) * 100;
    const maxPercent =
      ((max - rangeMax.min) / (rangeMax.max - rangeMax.min)) * 100;

    // Оновлюємо стилі прогресу між слайдерами
    progress.style.left = `${minPercent}%`;
    progress.style.width = `${maxPercent - minPercent}%`;

    // Оновлюємо текстові значення мінімальної і максимальної ціни
    valueMin.textContent = `$${min.toFixed(2)}`;
    valueMax.textContent = `$${max.toFixed(2)}`;

    // Оновлюємо стан фільтру з новими значеннями діапазону цін
    filterState.priceRange.min = min;
    filterState.priceRange.max = max;
  }

  // Слухач події для мінімального слайдера
  rangeMin.addEventListener("input", (e) => {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);

    // Перевірка: якщо мінімальна ціна більша за максимальну, обмежуємо мінімальну ціну
    if (maxVal - minVal < 0) {
      rangeMin.value = maxVal;
    }
    // Оновлюємо слайдер та картки
    updateProgress();
    updateCards(window.cards);
  });

  // Слухач події для максимального слайдера
  rangeMax.addEventListener("input", (e) => {
    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);

    // Перевірка: якщо максимальна ціна менша за мінімальну, обмежуємо максимальну ціну
    if (maxVal - minVal < 0) {
      rangeMax.value = minVal;
    }
    // Оновлюємо слайдер та картки
    updateProgress();
    updateCards(window.cards);
  });

  // Ініціалізація прогресу слайдера при завантаженні
  updateProgress();
}

function initializeAccordion() {
  // Отримуємо всі кнопки акардіону
  const accordionButtons = document.querySelectorAll(".accordion__button");

  // Для кожної кнопки додаємо обробник події
  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Перемикаємо клас для активного елементу
      this.classList.toggle("accordion__button--active");

      // Отримуємо наступний елемент (вміст)
      const content = this.nextElementSibling;

      // Змінюємо maxHeight для анімації відкриття/закриття вмісту
      content.style.maxHeight = content.style.maxHeight
        ? null // Якщо maxHeight вже встановлений, видаляємо його
        : content.scrollHeight + "px"; // Встановлюємо висоту для показу вмісту
    });
  });
}

function initializeFilterHandlers(cards) {
  // Отримуємо всі опції фільтрації за категорією
  const categoryOptions = document.querySelectorAll(
    '.filters__option[data-filter="category"]'
  );

  // Додаємо обробник події на кожну категорію
  categoryOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Видаляємо активний клас з усіх категорій
      categoryOptions.forEach((opt) =>
        opt.classList.remove("filters__option--active")
      );

      // Додаємо активний клас до вибраної категорії
      option.classList.add("filters__option--active");

      // Оновлюємо стан фільтра
      filterState.category = option.dataset.value;

      updateCards(cards);
    });
  });

  // Ініціалізація обробників для ползунків діапазону (ціна)
  const rangeInputs = document.querySelectorAll(".filters__range-input");
  rangeInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const type = e.target.dataset.rangeType; // Тип діапазону (min або max)
      const value = parseFloat(e.target.value); // Значення діапазону
      filterState.priceRange[type] = value; // Оновлюємо значення в стані фільтра
      updateCards(cards); // Оновлюємо картки за новими фільтрами
    });
  });

  // Ініціалізація обробників для чекбоксів
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const filterType = e.target.dataset.filter; // Тип фільтра
      const value = e.target.value; // Значення, яке вибрано в чекбоксі
      // Якщо чекбокс вибраний, додаємо значення в множину, якщо знятий - видаляємо
      if (e.target.checked) {
        filterState[filterType].add(value);
      } else {
        filterState[filterType].delete(value);
      }
      updateCards(cards); // Оновлюємо картки за новими фільтрами
    });
  });
}

/**
 * Генерація фільтрів на основі карток
 * @param {Array} cards - Масив карток
 */
function generateFilters(cards) {
  // Отримуємо контейнер для фільтрів
  const filtersContainer = document.querySelector(".filters__content");

  // Визначаємо мінімальну та максимальну ціну для фільтра ціни
  const prices = cards.map((p) => p.price);
  filterState.priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };

  // Визначаємо доступні категорії та кольори
  const categories = ["All", ...new Set(cards.map((p) => p.category))];
  const colors = [...new Set(cards.flatMap((p) => p.colors))];

  // Виключаємо монітори з підрахунку з'єднань
  const connections = [
    ...new Set(
      cards
        .filter((p) => p.category.toLowerCase() !== "monitors")
        .flatMap((p) => p.connections)
    ),
  ];

  // Генерація фільтру за категоріями
  const categoriesFilter = createFilterGroup(
    "Category",
    createOptionsGroup(
      categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
      "category",
      false
    )
  );

  // Генерація фільтру за ціною
  const priceFilter = createFilterGroup(
    "Price",
    createPriceRange(filterState.priceRange.min, filterState.priceRange.max)
  );

  // Генерація фільтру за кольором
  const colorsFilter = createFilterGroup(
    "Color",
    createOptionsGroup(
      colors.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
      "colors"
    )
  );

  // Генерація фільтру за з'єднаннями
  const connectionsFilter = createFilterGroup(
    "Connection",
    createOptionsGroup(
      connections.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
      "connections"
    )
  );

  // Генерація фільтру за розміром екрану для моніторів
  let screenSizesFilter = "";
  const monitors = cards.filter((p) => p.category === "monitors");

  if (monitors.length > 0) {
    const screenSizes = [
      ...new Set(monitors.flatMap((p) => p.screenSizes)), // Розгортання масивів, якщо вони вкладені
    ].sort((a, b) => a - b);

    screenSizesFilter = createFilterGroup(
      "Screen Size",
      createOptionsGroup(
        screenSizes.map((size) => `${size}"`),
        "screenSizes"
      )
    );
  }

  // Додаємо всі фільтри в контейнер
  filtersContainer.innerHTML =
    categoriesFilter +
    priceFilter +
    colorsFilter +
    connectionsFilter +
    screenSizesFilter;

  // Виділяємо категорію "All" жирним шрифтом за замовчуванням
  const allCategoryOption = document.querySelector(
    '.filters__option[data-value="all"]'
  );
  if (allCategoryOption) {
    allCategoryOption.classList.add("filters__option--active");
  }

  // Ініціалізуємо додаткові елементи (повзунок, акардіон)
  initializePriceRangeSlider();
  initializeAccordion();
  initializeFilterHandlers(cards);
}

/* Ініціалізація обробників для мобільної бічної панелі фільтрів */
function initializeMobileSidebar() {
  // Отримуємо елементи для мобільної панелі
  const filterToggle = document.getElementById("filtersToggle");
  const filtersSidebar = document.getElementById("filtersSidebar");
  const filtersClose = document.getElementById("filtersClose");
  const applyButton = document.querySelector(".filters__apply-button");
  const clearButton = document.querySelector(".filters__clear-button");

  // Обробник для кнопки відкриття бічної панелі
  if (filterToggle && filtersSidebar) {
    filterToggle.addEventListener("click", function () {
      filtersSidebar.classList.add("filters--open");
      document.body.classList.add("no-scroll");
    });
  }

  // Обробник для кнопки закриття бічної панелі
  if (filtersClose) {
    filtersClose.addEventListener("click", function () {
      filtersSidebar.classList.remove("filters--open");
      document.body.classList.remove("no-scroll");
    });
  }

  // Обробник для кнопки застосування фільтрів
  if (applyButton) {
    applyButton.addEventListener("click", () => {
      filtersSidebar.classList.remove("filters--open");
      document.body.classList.remove("no-scroll");
    });
  }

  // Обробник для кнопки очищення фільтрів
  if (clearButton) {
    clearButton.addEventListener("click", resetFilters);
  }
}

async function loadMoreCards() {
  const cards = window.cards; // Отримуємо всі картки
  const filteredCards = filterCards(cards); // Фільтруємо картки

  // Збільшуємо кількість відображених карток на 12
  displayedCards += CARDS_PER_PAGE;

  // Відображаємо наступні картки
  renderCards(filteredCards.slice(0, displayedCards));

  // Оновлюємо стан кнопки "Load More"
  const loadMoreButton = document.querySelector(".btn-outline-dark");
  if (displayedCards >= filteredCards.length) {
    loadMoreButton.style.display = "none"; // Приховати, якщо всі картки відображені
  } else {
    loadMoreButton.style.display = "block"; // Показати, якщо є ще картки
  }
}

async function initialize() {
  // Отримуємо картки з даними
  const cards = await fetchCards();

  // Зберігаємо картки в глобальній змінній
  window.cards = cards;

  // Відображаємо перші 12 карток
  const filteredCards = filterCards(cards);
  renderCards(filteredCards.slice(0, CARDS_PER_PAGE));

  // Оновлюємо стан кнопки "Load More"
  const loadMoreButton = document.querySelector(".btn-outline-dark");
  if (filteredCards.length <= CARDS_PER_PAGE) {
    loadMoreButton.style.display = "none"; // Приховати, якщо всі картки вже відображені
  } else {
    loadMoreButton.style.display = "block"; // Показати, якщо є ще картки
  }

  // Генеруємо фільтри
  generateFilters(cards);

  // Оновлюємо текст кнопки застосування фільтрів
  const applyButton = document.querySelector(".filters__apply-button");
  if (applyButton) {
    applyButton.textContent = `Apply filters: ${filteredCards.length}`;
  }

  // Додаємо слухача події для кнопки Load More
  loadMoreButton.addEventListener("click", loadMoreCards);
}

initialize();
