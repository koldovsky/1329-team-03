// Halyna Fedkiv
document.addEventListener("DOMContentLoaded", () => {
  function loadFilteredProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "default";

    const productsContainer = document.querySelector(".products-gallery");

    if (!productsContainer) {
      console.error("❌ productsContainer ('.products-gallery') not found!");
      return;
    }

    fetch("../api/cards.json")
      .then((response) => response.json())
      .then((data) => {
        const products = data.cards;

        productsContainer.innerHTML = "";

        // Filter products by category
        const filteredProducts = products.filter(
          (product) => product.category === category
        );

        if (filteredProducts.length === 0) {
          productsContainer.innerHTML = "<p>No products found.</p>";
          return;
        }

        // Add filtered products
        filteredProducts.forEach((product) => {
          const productHTML = `
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

          productsContainer.insertAdjacentHTML("beforeend", productHTML);
        });
      })
      .catch((error) => {
        console.error("❌ Error loading products:", error);
      });
  }

  // Ensure the script runs ONLY AFTER HTMX swaps content
  document.addEventListener("htmx:afterSwap", () => {
    setTimeout(loadFilteredProducts, 50);
  });

  // Also run once after page load
  loadFilteredProducts();
});
