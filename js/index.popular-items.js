import { addProductToCart } from "./global.cart.js";

let productsData = []; // Глобальна змінна для збереження продуктів
let currencies;

// Функція отримання даних
async function fetchProducts() {
  try {
    const response = await fetch("./api/items.json"); // Завантажуємо JSON
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    productsData = await response.json();
    renderProducts(productsData);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Функція рендерингу товарів
function renderProducts(products, rate = 1, currencySymbol = "$") {
  let productsHTML = "";
  for (const product of products) {
    productsHTML += `
        <article class="product-card">
          <a href="#" class="product-card__link">
            <img
              class="product-card__image"
              alt="${product.name}"
              src="${product.image}"
              onerror="this.onerror=null; this.src='img/placeholder.png';"
            />
            ${
              product.promoLabel
                ? `<button type="button" class="btn btn-secondary">${product.promoLabel}</button>`
                : ""
            }
            ${
              product.stockStatus
                ? `<div class="popular-products__badge-bottom-pro popular-products__badge-${product.stockStatus.replace(
                    " ",
                    "-"
                  )}-pro">
                  <div class="badge__${product.stockStatus.replace(" ", "-")}">
                    ${product.stockStatus}
                  </div>
                </div>`
                : ""
            }
          </a>
          <h5 class="product-card__title">
            <a href="#" class="product-card__name">${product.name}</a>
          </h5>
          <div class="prices">
            ${
              product.oldPrice
                ? `<div class="product-card__price-old">${currencySymbol}${(
                    product.oldPrice * rate
                  ).toFixed(2)}</div>`
                : '<div class="product-card__price-old hidden">----------</div>'
            }
            <div class="product-card__price-new">${currencySymbol}${(
              product.price * rate
            ).toFixed(2)}</div>
          </div>
          <button class="btn ${
            product.stockStatus === "out of stock"
              ? "btn-disabled"
              : "btn-primary"
          } card__button--cart" type="button" data-name="${product.name}" data-price="${
      product.price * rate
    }" ${
      product.stockStatus === "out of stock" ? "disabled" : ""
    }>Buy now</button>
        </article>
      `;
  }

  const productsContainer = document.querySelector(".popular-products__list");
  if (!productsContainer) {
    console.error("Element .popular-products__list not found!");
    return;
  }

  productsContainer.innerHTML = productsHTML;

  let cart = []; // Масив для товарів у кошику

  function addProductToCart(name, price) {
    const product = { name, price }; // Створюємо об'єкт товару
    cart.push(product); // Додаємо у масив кошика
    updateCartUI(); // Оновлюємо інтерфейс кошика
  }
  
  
  // Функція для оновлення HTML кошика
  function updateCartUI() {
    const cartContainer = document.querySelector(".cart-items"); // Контейнер кошика
    cartContainer.innerHTML = ""; // Очищаємо перед оновленням
  
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>🛒 Кошик порожній</p>";
      return;
    }
  
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="remove-item" data-index="${index}">❌</button>
      `;
      cartContainer.appendChild(cartItem);
    });
  
    // Додаємо обробник подій для кнопок видалення
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cart.splice(index, 1); // Видаляємо товар
        updateCartUI(); // Оновлюємо відображення кошика
      });
    });
  }

  // Додаємо подію на всі кнопки "Buy now"
  document.querySelectorAll(".card__button--cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const name = event.target.dataset.name;
      const price = parseFloat(event.target.dataset.price);
      console.log(`✅ Додаємо в кошик: ${name} - ${price}`); // Перевірка в консолі
      addProductToCart(name, price);
    });
  });
}

// Функція зміни валюти
async function changeCurrency() {
  const currencyName = document.querySelector(".products__currency").value;
  if (!currencies) {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    currencies = await response.json();
  }
  const rate = currencies.rates[currencyName];
  const currencySymbol = currencyName === "USD" ? "$" : currencyName;
  renderProducts(productsData, rate, currencySymbol);
}

// Викликаємо функцію завантаження продуктів
fetchProducts();

// Додаємо обробник подій для зміни валюти
document
  .querySelector(".products__currency")
  .addEventListener("change", changeCurrency);
