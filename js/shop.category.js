// Halyna Fedkiv
document.addEventListener("htmx:afterSwap", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "default";

  const productsContainer = document.querySelector(".cards");

  /*if (!productsContainer) return;*/

  try {
    // Fetch products from JSON
    const response = await fetch("../api/cards.json");
    const products = await response.json();

    // Filter products by category
    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    // Generate HTML for filtered products
    productsContainer.innerHTML = filteredProducts
      .map(
        (product) => `
        <div class="card__image-container">          
          ${
            product.promoLabel
              ? `<span class="card__label">${product.promoLabel}</span>`
              : ""
          }          
          <img
            src="${product.image}" 
            alt="${product.name}"   
            class="card__image" 
          />
        </div>
        
        <div class="card__info">
          <h2 class="card__name">
            <a href="#" class="card__name-link">${product.name}</a> 
          </h2>
          
          <div class="card__price-container">
            ${
              product.oldPrice
                ? `<p class="card__price card__price--old">$${product.oldPrice.toFixed(
                    2
                  )} USD</p>`
                : ""
            }
            <p class="card__price">$${product.price.toFixed(2)} USD</p> 
          </div>
          <button class="card__button card__button--cart">Buy Now</button>
        </div>
      `
      )
      .join("");

    // Insert into page
    productsContainer.innerHTML = productsHTML;
  } catch (error) {
    console.error("Error loading products:", error);
  }
});
