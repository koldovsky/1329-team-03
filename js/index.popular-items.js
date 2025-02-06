async function fetchProducts() {
  try {
    const response = await fetch("./api/items.json"); // Шлях до JSON-файлу
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function renderProducts(products) {
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
                ? `<div class="product-card__price-old">$${product.oldPrice.toFixed(
                    2
                  )} USD</div>`
                : '<div class="product-card__price-old hidden">----------</div>'
            }
            <div class="product-card__price-new">$${product.price.toFixed(
              2
            )} USD</div>
          </div>
          <button class="btn ${
            product.stockStatus === "out of stock"
              ? "btn-disabled"
              : "btn-primary"
          }" type="button" ${
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

  productsContainer.innerHTML = productsHTML; // Вставляємо сформовані картки
}

// Викликаємо функцію завантаження
fetchProducts();
