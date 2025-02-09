// Halyna Fedkiv
document.addEventListener("DOMContentLoaded", () => {
  function loadFilteredProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "default";

    const productsContainer = document.querySelector(".cards");

    if (!productsContainer) {
      console.error("❌ productsContainer ('.cards') not found!");
      return;
    }

    fetch("./api/cards.json")
      .then((response) => response.json())
      .then((data) => {
        const products = data.cards;

        productsContainer.innerHTML = "";

        // Filter products by category, reduce duplicates
        const filteredProducts = products
          .filter((product) => product.category === category)
          .reduce((unique, product) => {
            if (!unique.some((item) => item.name === product.name)) {
              unique.push(product);
            }
            return unique;
          }, []);

        if (filteredProducts.length === 0) {
          productsContainer.innerHTML = "<p>No products found.</p>";
          return;
        }

        // Add filtered products
        filteredProducts.forEach((product) => {
          const productHTML = `
            <article class="product-card">
          <a href="#" class="product-card__link">

            ${
              product.promoLabel
                ? `<div class="category__ribbon"><div class="btn btn-secondary">${product.promoLabel}</div></div>`
                : ""
            }
            ${
              product.status && product.status.toLowerCase() !== "In stock"
                ? `<div class="popular-products__badge-bottom-pro popular-products__badge-${product.status.replace(
                    " ",
                    "-"
                  )}-pro">
                  <div class="badge__${product.status.toLowerCase().replace(" ", "-")}">
                    ${product.status}
                  </div>
                </div>`
                : ""
            }

            <div class="image__container"><img
              class="product-card__image"
              alt="${product.name}"
              src="${product.image}"
              onerror="this.onerror=null; this.src='img/placeholder.png';"
            /></div>

          </a>
          <h5 class="product-card__title">
            <a href="#" class="product-card__name">${product.name}</a>
          </h5>
          <div class="prices__container">
            <div class="prices">
              ${
                product.oldPrice
                  ? `<div class="product-card__price-old">$${product.oldPrice.toFixed(
                      2
                    )} USD</div>`
                  : ""
              }
              <div class="product-card__price-new">$${product.price.toFixed(
                2
              )} USD</div>
            </div>
          </div>
          <div class="category__button" ><a class="btn ${
            product.stockStatus === "out of stock"
              ? "btn-disabled"
              : "btn-primary"
          }" type="submit" ${
            product.stockStatus === "out of stock" ? "disabled" : ""
          }>Buy</a></div>
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

  loadFilteredProducts();
});
