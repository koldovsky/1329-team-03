/* Максим Зимин */

// Стан корзини
let cart = [];

// HTML шаблони
let cartItemTemplate = "";
let cartIconTemplate = "";
let cartModalTemplate = "";

// DOM елементи
let cartCountElement;
let cartModal;
let cartItemsElement;
let totalAmountElement;

function isCartStructureExists() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    return !!(cartIcon && cartModal);
}

async function loadTemplate(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
    } catch (error) {
        console.error("Error loading template:", error);
        return "";
    }
}

async function initializeTemplates() {
    cartItemTemplate = await loadTemplate("./js/templates/cart-item.html");
    cartIconTemplate = await loadTemplate("./js/templates/cart-icon.html");
    cartModalTemplate = await loadTemplate("./js/templates/cart-modal.html");
    
    // Додати корзину до DOM, якщо ще немає
    if (!isCartStructureExists()) {
        document.body.insertAdjacentHTML("beforeend", cartIconTemplate);
        document.body.insertAdjacentHTML("beforeend", cartModalTemplate);
    }
}

function initializeCartElements() {
    cartCountElement = document.getElementById("cartCount");
    cartModal = document.getElementById("cartModal");
    cartItemsElement = document.getElementById("cartItems");
    totalAmountElement = document.getElementById("totalAmount");

    if (!cartCountElement) {
        console.error("Cart count element (#cartCount) not found");
    }
    if (!cartModal) {
        console.error("Cart modal (#cartModal) not found");
    }
    if (!cartItemsElement) {
        console.error("Cart items element (#cartItems) not found");
    } 
    if (!totalAmountElement) {
        console.error("Total amount element (#totalAmount) not found");
    }

    if (
        !cartCountElement ||
        !cartModal ||
        !cartItemsElement ||
        !totalAmountElement
    ) {
        console.error("Some cart elements are missing in the DOM");
        return false;
    }
    return true;
}

/**
    Функція приймає шаблон та об'єкт даних, які потрібно вставити в шаблон.
    Дані є змінними, які вставляються в шаблон (ключ-змінна: значення).
 */
function renderTemplate(template, data) {
    return template.replace(/\{\{(\w+|[\w+-]+)\}\}/g, (match, key) => {
        if (key.includes("+")) {
            const [base, add] = key.split("+");
            return data[base] + Number(add);
        }
        if (key.includes("-")) {
            const [base, subtract] = key.split("-");
            return data[base] - Number(subtract);
        }
        return data[key] || match;
    });
}

/* Зберегти корзину в localStorage */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Завантажити корзину з localStorage */
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function addProductToCart(productName, price) {
    if (!initializeCartElements()) return;

    const existingProduct = cart.find((item) => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
        });
    }

    // Додати анімацію до іконки корзини
    const cartIcon = document.querySelector(".cart-icon");
    cartIcon.classList.add("cart-icon--bounce");
    setTimeout(() => {
        cartIcon.classList.remove("cart-icon--bounce");
    }, 500);

    saveCart();
    updateCart();
    showNotification(`${productName} added to cart!`);
}

function updateCart() {
    if (!initializeCartElements()) return;

    let totalItems = 0;
    let totalPrice = 0;

    cartItemsElement.innerHTML = "";

    cart.forEach((item) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemHTML = renderTemplate(cartItemTemplate, {
            name: item.name,
            price: item.price.toFixed(2),
            quantity: item.quantity,
            total: (item.price * item.quantity).toFixed(2),
        });

        cartItemsElement.innerHTML += itemHTML;
    });

    cartCountElement.innerText = totalItems;
    totalAmountElement.innerText = `$${totalPrice.toFixed(2)} USD`;

    const emptyCartMessage = document.querySelector(".cart-empty");
    if (emptyCartMessage) {
        emptyCartMessage.style.display = cart.length === 0 ? "block" : "none";
    }
}

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

function removeProductFromCart(productName) {
    if (!initializeCartElements()) return;

    cart = cart.filter((item) => item.name !== productName);
    saveCart();
    updateCart();
    showNotification(`${productName} removed from cart`);
}

function clearCart() {
    if (!initializeCartElements()) return;

    cart = [];
    saveCart();
    updateCart();
    showNotification("Cart cleared");
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("notification--visible");
    }, 100);

    setTimeout(() => {
        notification.classList.remove("notification--visible");
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

/* Перемикач корзини */
function toggleCart() {
    if (!initializeCartElements()) return;

    if (cartModal.style.display === 'flex') {
        cartModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    } else {
        cartModal.style.display = 'flex';
        document.body.classList.add('no-scroll');
    }
}

function handleCartAction(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;
    const product = target.dataset.product;
    const quantity = target.dataset.quantity;

    switch (action) {
        case 'updateQuantityOfProductsInCart':
            updateQuantityOfProductsInCart(product, parseInt(quantity));
            break;
        case 'removeProductFromCart':
            removeProductFromCart(product);
            break;
        case 'clearCart':
            clearCart();
            break;
        case 'toggleCart':
            toggleCart();
            break;
    }
}

async function initializeCart() {
    await initializeTemplates();
    
    if (initializeCartElements()) {
        // Remove old event listeners if they exist
        document.removeEventListener('click', handleCartAction);
        
        // Add event listeners
        document.addEventListener('click', handleCartAction);
        
        loadCart();
    }
}

initializeCart();

// Export only necessary functions for external use
export { addProductToCart };
