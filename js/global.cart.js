// Стан корзини
let cart = [];

// DOM елементи
const cartCountElement = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItemsElement = document.getElementById("cartItems");
const totalAmountElement = document.getElementById("totalAmount");
const orderButton = document.getElementById("orderButton");
const customerNameInput = document.getElementById("customerName");
const customerEmailInput = document.getElementById("customerEmail");
const customerPhoneInput = document.getElementById("customerPhone");
const promoInfo = document.getElementById("promo-code");
const customerInfo = document.getElementById("customer-info");
const emptyCartMessage = document.querySelector(".cart-empty");

/**
 * Перевіряє, чи існують всі необхідні елементи корзини в DOM
 * @returns {boolean} - Чи існують всі елементи
 */
function initializeCartElements() {
  const missingElements = [];

  if (!cartCountElement) missingElements.push("cartCount");
  if (!cartModal) missingElements.push("cartModal");
  if (!cartItemsElement) missingElements.push("cartItems");
  if (!totalAmountElement) missingElements.push("totalAmount");
  if (!orderButton) missingElements.push("orderButton");

  if (missingElements.length) {
    console.error("Missing elements in the DOM:", missingElements.join(", "));
    return false;
  }
  return true;
}

/**
 * Оновлює відображення корзини
 */
function updateCart() {
  if (!initializeCartElements()) return;

  let totalItems = 0;
  let totalPrice = 0;

  cartItemsElement.innerHTML = "";

  cart.forEach((item) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    const itemHTML = `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>${item.quantity} x $${item.price.toFixed(2)}</span>
        <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
        <button data-action="updateQuantity" data-card="${
          item.name
        }" data-quantity="${item.quantity + 1}">+</button>
        <button data-action="updateQuantity" data-card="${
          item.name
        }" data-quantity="${item.quantity - 1}">−</button>
        <button data-action="removeProduct" data-card="${
          item.name
        }">Remove</button>
      </div>
    `;

    cartItemsElement.innerHTML += itemHTML;
  });

  cartCountElement.innerText = totalItems;
  totalAmountElement.innerText = `$${totalPrice.toFixed(2)} USD`;

  // Перевірка, чи корзина пуста
  if (cart.length === 0) {
    orderButton.style.display = "none"; // Приховуємо кнопку замовлення
    promoInfo.style.display = "none";
    customerInfo.style.display = "none";
    emptyCartMessage.style.display = "block";
  } else {
    emptyCartMessage.style.display = "none";
    promoInfo.style.display = "block";
    customerInfo.style.display = "block";
    orderButton.style.display = "inline-block"; // Показуємо кнопку замовлення
    updateOrderButtonState();
  }
}

/**
 * Оновлює стан кнопки "Order"
 */
function updateOrderButtonState() {
  const isNameEmpty = !customerNameInput.value.trim();
  const isEmailEmpty = !customerEmailInput.value.trim();
  const isPhoneEmpty = !customerPhoneInput.value.trim();

  // Оновлюємо стан кнопки
  orderButton.disabled = isNameEmpty || isEmailEmpty || isPhoneEmpty;

  // Показуємо попередження для порожніх полів
  if (isNameEmpty) {
    customerNameInput.classList.add("warning");
    document.getElementById("nameWarningMessage").style.display = "block";
  } else {
    customerNameInput.classList.remove("warning");
    document.getElementById("nameWarningMessage").style.display = "none";
  }

  if (isEmailEmpty) {
    customerEmailInput.classList.add("warning");
    document.getElementById("emailWarningMessage").style.display = "block";
  } else {
    customerEmailInput.classList.remove("warning");
    document.getElementById("emailWarningMessage").style.display = "none";
  }

  if (isPhoneEmpty) {
    customerPhoneInput.classList.add("warning");
    document.getElementById("phoneWarningMessage").style.display = "block";
  } else {
    customerPhoneInput.classList.remove("warning");
    document.getElementById("phoneWarningMessage").style.display = "none";
  }
}

// Додайте слухачі подій на поля вводу
customerNameInput.addEventListener("input", updateOrderButtonState);
customerEmailInput.addEventListener("input", updateOrderButtonState);
customerPhoneInput.addEventListener("input", updateOrderButtonState);

/**
 * Зберегти корзину в localStorage
 */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Завантажити корзину з localStorage
 */
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

/**
 * Додає товар у корзину
 * @param {string} productName - Назва товару
 * @param {number} price - Ціна товару
 */
function addProductToCart(productName, price) {
  if (!initializeCartElements()) return;

  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name: productName, price, quantity: 1 });
  }

  // Анімація для іконки корзини
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.classList.add("cart-icon--bounce");
    setTimeout(() => cartIcon.classList.remove("cart-icon--bounce"), 500);
  }

  saveCart();
  updateCart();
  showNotification(`${productName} added to cart!`);
}

/**
 * Оновлює кількість товару у корзині
 * @param {string} productName - Назва товару
 * @param {number} newQuantity - Нова кількість
 */
function updateQuantityOfProductsInCart(productName, newQuantity) {
  if (!initializeCartElements()) return;

  if (newQuantity <= 0) {
    removeProductFromCart(productName);
    return;
  }

  const product = cart.find((item) => item.name === productName);
  if (product) {
    product.quantity = newQuantity;
    saveCart();
    updateCart();
  }
}

/**
 * Видаляє товар з корзини
 * @param {string} productName - Назва товару
 */
function removeProductFromCart(productName) {
  if (!initializeCartElements()) return;

  cart = cart.filter((item) => item.name !== productName);
  saveCart();
  updateCart();
  showNotification(`${productName} removed from cart`);
}

/**
 * Очищає всю корзину
 */
function clearCart() {
  if (!initializeCartElements()) return;

  cart = [];
  saveCart();
  updateCart();
  showNotification("Cart cleared");
}

/**
 * Показує сповіщення
 * @param {string} message - Текст повідомлення
 */
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("notification--visible"), 100);
  setTimeout(() => {
    notification.classList.remove("notification--visible");
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

/**
 * Перемикає відображення корзини
 */
function toggleCart() {
  if (!initializeCartElements()) return;

  const isVisible = cartModal.style.display === "flex";
  cartModal.style.display = isVisible ? "none" : "flex";
  document.body.classList.toggle("no-scroll", !isVisible);
}

/**
 * Обробляє кліки по корзині
 * @param {Event} event - Подія кліку
 */
function handleCartAction(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  const productName = target.dataset.card;
  const quantity = parseInt(target.dataset.quantity, 10);

  switch (action) {
    case "updateQuantity":
      updateQuantityOfProductsInCart(productName, quantity);
      break;
    case "removeProduct":
      removeProductFromCart(productName);
      break;
    case "clearCart":
      clearCart();
      break;
    case "toggleCart":
      toggleCart();
      break;
  }
}

/**
 * Ініціалізація корзини
 */
function initializeCart() {
  if (!initializeCartElements()) return;

  // Уникнення дублювання слухачів подій
  document.removeEventListener("click", handleCartAction);
  document.addEventListener("click", handleCartAction);

  loadCart();
}

// Запуск ініціалізації при завантаженні сторінки
initializeCart();

// Експорт необхідних функцій
export { addProductToCart };
