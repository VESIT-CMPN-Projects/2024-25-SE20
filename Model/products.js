// products.js - Main product and cart management file
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced product data with proper image URLs
    const products = [
        {
            id: 1,
            name: "Maggi Noodles",
            category: "Food",
            price: 12,
            image: "images/maggi.jpg" // Use local images for production
        },
        // ... (keep other products the same)
    ];

    // Shopping cart with localStorage persistence
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // DOM elements cache
    const elements = {
        productsGrid: document.getElementById('products-grid'),
        cartItems: document.getElementById('cart-items'),
        cartCount: document.getElementById('cart-count'),
        subtotalEl: document.getElementById('subtotal'),
        taxEl: document.getElementById('tax'),
        totalEl: document.getElementById('total'),
        checkoutModal: document.getElementById('checkout-modal'),
        orderSummary: document.getElementById('order-summary'),
        invoiceItems: document.getElementById('invoice-items'),
        invoiceSubtotal: document.getElementById('invoice-subtotal'),
        invoiceTax: document.getElementById('invoice-tax'),
        invoiceTotal: document.getElementById('invoice-total'),
        invoiceNumber: document.getElementById('invoice-number'),
        invoiceDate: document.getElementById('invoice-date')
    };

    // Initialize the application
    function init() {
        displayProducts();
        updateCart();
        setupEventListeners();
    }

    // Product display functions
    function displayProducts() {
        elements.productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>₹${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `).join('');
    }

    // Cart management functions
    function addToCart(e) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart();
        updateCart();
    }

    function updateCart() {
        // Update UI
        elements.cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        elements.cartItems.innerHTML = cart.length ? renderCartItems() : '<div class="empty-cart">Your cart is empty</div>';
        
        updateCartSummary();
    }

    function renderCartItems() {
        return cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove" data-id="${item.id}">×</button>
            </div>
        `).join('');
    }

    // Quantity adjustment functions
    function adjustQuantity(e, change) {
        const productId = parseInt(e.target.dataset.id);
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) item.quantity = 1;
            saveCart();
            updateCart();
        }
    }

    // Checkout and invoice functions
    function showCheckoutModal() {
        if (!cart.length) {
            alert('Your cart is empty');
            return;
        }

        elements.orderSummary.innerHTML = cart.map(item => `
            <div class="order-item">
                <span>${item.name} (${item.quantity})</span>
                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        elements.checkoutModal.style.display = 'flex';
    }

    function generateInvoice() {
        const now = new Date();
        
        // Set invoice details
        elements.invoiceNumber.textContent = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000)}`;
        elements.invoiceDate.textContent = now.toLocaleDateString('en-IN');
        
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05;
        const total = subtotal + tax;
        
        // Update invoice display
        elements.invoiceItems.innerHTML = cart.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');
        
        elements.invoiceSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        elements.invoiceTax.textContent = `₹${tax.toFixed(2)}`;
        elements.invoiceTotal.textContent = `₹${total.toFixed(2)}`;
        
        return { subtotal, tax, total };
    }

    // Utility functions
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05;
        const total = subtotal + tax;
        
        elements.subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        elements.taxEl.textContent = `₹${tax.toFixed(2)}`;
        elements.totalEl.textContent = `₹${total.toFixed(2)}`;
    }

    // Event listeners setup
    function setupEventListeners() {
        // Product grid
        elements.productsGrid.addEventListener('click', e => {
            if (e.target.classList.contains('add-to-cart')) {
                addToCart(e);
            }
        });
        
        // Cart operations
        elements.cartItems.addEventListener('click', e => {
            if (e.target.classList.contains('decrease')) {
                adjustQuantity(e, -1);
            } else if (e.target.classList.contains('increase')) {
                adjustQuantity(e, 1);
            } else if (e.target.classList.contains('remove')) {
                cart = cart.filter(item => item.id !== parseInt(e.target.dataset.id));
                saveCart();
                updateCart();
            }
        });
        
        // Modal controls
        document.getElementById('checkout-btn').addEventListener('click', showCheckoutModal);
        document.getElementById('close-checkout').addEventListener('click', () => {
            elements.checkoutModal.style.display = 'none';
        });
        
        // Invoice printing
        document.getElementById('print-invoice-btn').addEventListener('click', () => {
            generateInvoice();
            window.print();
        });
    }

    // Start the application
    init();
});