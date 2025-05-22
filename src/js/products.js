// shop products db 
const products = [
    {
        id: 1,
        name: "Z-14W Smart Door Lock",
        price: 215000,
        image: "/src/images/Z-14W_PIC.png",
        video: false,
        features: [
            "Face Recognition",
            "Passcode Unlock",
            "Fingerprint Unlock",
            "Card Unlock",
            "Key Unlock",
            "Photo Capture",
            "App Unlock",
        ]
    },
    {
        id: 2,
        name: "D-6W Smart Door Lock",
        price: 223000,
        image: "/src/images/D-6W-pic.png",
        video: false,
        features: [
            "Face Recognition",
            "Passcode Unlock",
            "Fingerprint Unlock",
            "Card Unlock",
            "Key Unlock",
            "Photo Capture",
            "App Unlock",
        ]
    },
    {
        id: 3,
        name: "S-18U Smart Door Lock",
        price: 257000,
        image: "/src/images/S-18W-pic.png",
        video: false,
        features: [
            "Face Recognition",
            "Passcode Unlock",
            "Fingerprint Unlock",
            "Card Unlock",
            "Key Unlock",
            "Video Intercoms & DUAL LENS CAMERA",
            "App Unlock",
        ]
    },
    {
        id: 4,
        name: "Z-18T Big Handle Lock",
        price: 157000,
        image: "/src/images/big-handleLOck.png",
        video: false,
        features: [
            "Passcode Unlock",
            "Fingerprint Unlock",
            "Card Unlock",
            "Key Unlock",
            "App Unlock",
        ]
    },
    {
        id: 5,
        name: "Big Handle Camera Lock",
        price: 144000,
        image: "/src/images/big-handle-cam.jpg",
        video: false,
        features: [
            "Passcode Unlock",
            "Fingerprint Unlock",
            "Card Unlock",
            "Key Unlock",
        ]
    },
    {
        id: 6,
        name: "Tuya Small Handle Lock",
        price: 138000,
        image: "/src/images/small-handle-tuya.jpg",
        video: false,
        features: [
            "Passcode Unlock",
            "Fingerprint Unlock",
            "Card Unlock",
            "Key Unlock",
            "App Unlock",
        ]
    },
];

// My WhatsApp number
const whatsappNumber = '+2349137487240';

// Cart functionality
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutFormContainer = document.getElementById('checkoutFormContainer');
const checkoutForm = document.getElementById('checkoutForm');
const whatsappButton = document.getElementById('whatsappButton');
const successMessage = document.getElementById('successMessage');

// Load products
function loadProducts() {
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        let mediaElement;
        if (product.video) {
            mediaElement = `
                        <video class="product-video" autoplay loop muted>
                            <source src="/api/placeholder/400/320" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
        } else {
            mediaElement = `<img src="${product.image}" alt="${product.name}" class="product-image">`;
        }

        let featuresHTML = '';
        if (product.features && product.features.length > 0) {
            featuresHTML = `
                        <div class="product-features">
                            <ul>
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    `;
        }

        productCard.innerHTML = `
                    ${mediaElement}
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">₦${product.price.toFixed(0)}</div>
                        <span><b>Features</b></span>
                        ${featuresHTML}
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                                <input type="number" class="quantity-input" value="1" min="1" max="99" data-id="${product.id}">
                                <button class="quantity-btn increase" data-id="${product.id}">+</button>
                            </div>
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `;

        productsGrid.appendChild(productCard);
    });

    // Add event listeners for quantity buttons
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            let value = parseInt(input.value);
            input.value = value + 1;
        });
    });

    // Add event listeners for add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            const quantity = parseInt(input.value);

            // Find product
            const product = products.find(p => p.id === id);

            // Check if product already in cart
            const cartItemIndex = cart.findIndex(item => item.id === id);

            if (cartItemIndex > -1) {
                // Update quantity if already in cart
                cart[cartItemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }

            // Reset quantity input
            input.value = 1;

            // Update cart UI
            updateCart();

            // Open cart sidebar
            openCart();
        });
    });
}

// Open cart sidebar
function openCart() {
    cartOverlay.style.display = 'block';
    cartSidebar.style.right = '0';
}

// Close cart sidebar
function closeCartSidebar() {
    cartOverlay.style.display = 'none';
    cartSidebar.style.right = '-400px';
}

// Update cart UI
function updateCart() {
    // Update cart count
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₦${item.price.toFixed(0)}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn cart-decrease" data-id="${item.id}">-</button>
                                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}">
                                <button class="quantity-btn cart-increase" data-id="${item.id}">+</button>
                                <button class="cart-item-remove" data-id="${item.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;

            cartItems.appendChild(cartItemElement);
        });

        // Add event listeners for cart quantity buttons
        document.querySelectorAll('.cart-decrease').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                const cartItemIndex = cart.findIndex(item => item.id === id);

                if (cart[cartItemIndex].quantity > 1) {
                    cart[cartItemIndex].quantity -= 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.cart-increase').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                const cartItemIndex = cart.findIndex(item => item.id === id);

                cart[cartItemIndex].quantity += 1;
                updateCart();
            });
        });

        document.querySelectorAll('.cart-quantity-input').forEach(input => {
            input.addEventListener('change', function () {
                const id = parseInt(this.getAttribute('data-id'));
                const cartItemIndex = cart.findIndex(item => item.id === id);

                const quantity = parseInt(this.value);
                if (quantity > 0) {
                    cart[cartItemIndex].quantity = quantity;
                } else {
                    this.value = 1;
                    cart[cartItemIndex].quantity = 1;
                }

                updateCart();
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }

    // Update cart total
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `₦${total.toFixed(0)}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Load products
    loadProducts();

    // Cart icon click
    cartIcon.addEventListener('click', openCart);

    // Close cart
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    // Checkout button
    checkoutBtn.addEventListener('click', function () {
        if (cart.length > 0) {
            checkoutFormContainer.style.display = 'flex';
        }
    });

    // Close checkout form when clicking outside
    checkoutFormContainer.addEventListener('click', function (e) {
        if (e.target === checkoutFormContainer) {
            checkoutFormContainer.style.display = 'none';
        }
    });

    // Submit order
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const phone = document.getElementById('phone').value;
        const altPhone = document.getElementById('altPhone').value;
        const address = document.getElementById('address').value;

        const fullName = `${fname + lname}`

        // Prepare order message
        let orderMessage = `*New Order*\n\n`;
        orderMessage += `*Customer Details:*\n`;
        orderMessage += `Name: ${fullName}\n`;
        orderMessage += `Phone: ${phone}\n`;
        orderMessage += `Alt. Phone: ${altPhone || 'N/A'}\n`;
        orderMessage += `Address: ${address}\n\n`;

        orderMessage += `*Order Items:*\n`;
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            orderMessage += `- ${item.name} x${item.quantity} - ₦${itemTotal.toFixed(0)}\n`;
            total += itemTotal;
        });

        orderMessage += `\n*Total: ₦${total.toFixed(0)}*`;

        // Encode message for WhatsApp
        const encodedMessage = encodeURIComponent(orderMessage);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp with the message
        window.open(whatsappLink, '_blank');

        // Clear cart and close form
        cart = [];
        updateCart();
        checkoutFormContainer.style.display = 'none';

        // Show success message
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });

    // WhatsApp button click
    whatsappButton.addEventListener('click', function () {
        const whatsappChatLink = `https://wa.me/${whatsappNumber}`;
        window.open(whatsappChatLink, '_blank');
    });
});