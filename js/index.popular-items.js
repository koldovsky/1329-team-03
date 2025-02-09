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
          } card__button--cart" type="button" data-name="${
      product.name
    }" data-price="${product.price * rate}" ${
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

  // Додаємо обробник кліків для кнопок "Buy now"
  document.querySelectorAll(".card__button--cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productName = event.target.dataset.name;
      const productPrice = parseFloat(event.target.dataset.price);

      if (productName && !isNaN(productPrice)) {
        addProductToCart(productName, productPrice);
        console.log(`Added to cart: ${productName}, $${productPrice}`);
      } else {
        console.error("Error: Product data is missing or incorrect");
      }
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
