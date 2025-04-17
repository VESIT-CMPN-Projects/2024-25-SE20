document.addEventListener('DOMContentLoaded', function() {
    // Sample product data with image URLs (20 products)
    const products = [
        {
            id: 1,
            name: "Maggi Noodles",
            category: "Food",
            price: 12,
            image: "https://m.media-amazon.com/images/I/81ysLb7PP+L.SL1500.jpg"
        },
        {
            id: 2,
            name: "Bru Coffee",
            category: "Beverage",
            price: 220,
            image: "https://m.media-amazon.com/images/I/71+U+QqkZBL.SL1500.jpg"
        },
        {
            id: 3,
            name: "Red Bull",
            category: "Beverage",
            price: 115,
            image: "https://m.media-amazon.com/images/I/61u5z5gPbGL.SL1500.jpg"
        },
        {
            id: 4,
            name: "Bournvita",
            category: "Beverage",
            price: 350,
            image: "https://m.media-amazon.com/images/I/71vNbW5GbhL.SL1500.jpg"
        },
        {
            id: 5,
            name: "Harpic Disinfectant",
            category: "Cleaning",
            price: 180,
            image: "https://m.media-amazon.com/images/I/61tqW1LqVGL.SL1500.jpg"
        },
        {
            id: 6,
            name: "Ariel Detergent",
            category: "Cleaning",
            price: 320,
            image: "https://m.media-amazon.com/images/I/71g8XQVxVjL.SL1500.jpg"
        },
        {
            id: 7,
            name: "Dettol Soap",
            category: "Personal Care",
            price: 45,
            image: "https://m.media-amazon.com/images/I/61tqW1LqVGL.SL1500.jpg"
        },
        {
            id: 8,
            name: "Colgate Toothpaste",
            category: "Personal Care",
            price: 95,
            image: "https://m.media-amazon.com/images/I/61tqW1LqVGL.SL1500.jpg"
        },
        {
            id: 9,
            name: "Parle-G Biscuits",
            category: "Food",
            price: 10,
            image: "https://m.media-amazon.com/images/I/71vNbW5GbhL.SL1500.jpg"
        },
        {
            id: 10,
            name: "Lays Chips",
            category: "Snacks",
            price: 20,
            image: "https://m.media-amazon.com/images/I/81ysLb7PP+L.SL1500.jpg"
        },
        {
            id: 11,
            name: "Amul Butter",
            category: "Dairy",
            price: 50,
            image: "https://m.media-amazon.com/images/I/71+U+QqkZBL.SL1500.jpg"
        },
        {
            id: 12,
            name: "Nestle Milkmaid",
            category: "Dairy",
            price: 120,
            image: "https://m.media-amazon.com/images/I/61u5z5gPbGL.SL1500.jpg"
        },
        {
            id: 13,
            name: "Tata Tea",
            category: "Beverage",
            price: 150,
            image: "https://m.media-amazon.com/images/I/71vNbW5GbhL.SL1500.jpg"
        },
        {
            id: 14,
            name: "Dairy Milk Chocolate",
            category: "Confectionery",
            price: 30,
            image: "https://m.media-amazon.com/images/I/61tqW1LqVGL.SL1500.jpg"
        },
        {
            id: 15,
            name: "Patanjali Atta",
            category: "Groceries",
            price: 250,
            image: "https://m.media-amazon.com/images/I/71g8XQVxVjL.SL1500.jpg"
        },
        {
            id: 16,
            name: "Fortune Oil",
            category: "Groceries",
            price: 180,
            image: "https://m.media-amazon.com/images/I/61tqW1LqVGL.SL1500.jpg"
        },
        {
            id: 17,
            name: "Tata Salt",
            category: "Groceries",
            price: 25,
            image: "https://m.media-amazon.com/images/I/61tqW1LqVGL.SL1500.jpg"
        },
        {
            id: 18,
            name: "Kellogg's Corn Flakes",
            category: "Breakfast",
            price: 200,
            image: "https://m.media-amazon.com/images/I/71vNbW5GbhL.SL1500.jpg"
        },
        {
            id: 19,
            name: "Pepsi",
            category: "Beverage",
            price: 50,
            image: "https://m.media-amazon.com/images/I/81ysLb7PP+L.SL1500.jpg"
        },
        {
            id: 20,
            name: "Coca Cola",
            category: "Beverage",
            price: 50,
            image: "https://m.media-amazon.com/images/I/71+U+QqkZBL.SL1500.jpg"
        }
    ];

    // Shopping cart array
    let cart = [];

    // DOM elements
    const productsGrid = document.getElementById('products-grid');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.getElementById('close-checkout');
    const orderSummary = document.getElementById('order-summary');
    const printInvoiceBtn = document.getElementById('print-invoice-btn');
    const cartIcon = document.querySelector('.cart-icon');

    // Create invoice template element
    const invoiceTemplate = document.createElement('div');
    invoiceTemplate.id = 'invoice-template';
    invoiceTemplate.style.display = 'none';
    invoiceTemplate.style.position = 'absolute';
    invoiceTemplate.style.left = '-9999px';
    invoiceTemplate.innerHTML = `
        <div class="invoice">
            <div class="invoice-header">
                <h1>Maa Krupa Provision</h1>
                <p>123 Main Street, City</p>
                <p>Phone: 9876543210 | GSTIN: 22AAAAA0000A1Z5</p>
            </div>
            <div class="invoice-details">
                <div>
                    <p><strong>Invoice #:</strong> <span id="invoice-number">INV-001</span></p>
                    <p><strong>Date:</strong> <span id="invoice-date">01/01/2023</span></p>
                </div>
                <div>
                    <p><strong>Customer:</strong> Walk-in Customer</p>
                </div>
            </div>
            <h2 style="text-align: center; margin-bottom: 20px; color: #2c3e50;">Order Details</h2>
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="invoice-items">
                </tbody>
            </table>
            <div class="invoice-totals">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span id="invoice-subtotal">₹0.00</span>
                </div>
                <div class="total-row">
                    <span>Tax (5%):</span>
                    <span id="invoice-tax">₹0.00</span>
                </div>
                <div class="total-row grand-total">
                    <span>Grand Total:</span>
                    <span id="invoice-total">₹0.00</span>
                </div>
            </div>
            <div class="invoice-footer">
                <p>Thank you for your business!</p>
                <p>Terms: Payment due on receipt</p>
            </div>
        </div>
    `;
    document.body.appendChild(invoiceTemplate);

    // Get invoice elements
    const invoiceItems = document.getElementById('invoice-items');
    const invoiceSubtotal = document.getElementById('invoice-subtotal');
    const invoiceTax = document.getElementById('invoice-tax');
    const invoiceTotal = document.getElementById('invoice-total');
    const invoiceNumber = document.getElementById('invoice-number');
    const invoiceDate = document.getElementById('invoice-date');

    // Scroll to cart when cart icon is clicked
    cartIcon.addEventListener('click', function() {
        document.querySelector('.cart-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Display products
    function displayProducts() {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Add event listeners to all add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Add product to cart
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
    }

    // Update cart display
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div>
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">₹${item.price.toFixed(2)} each</div>
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <div class="cart-item-total">₹${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', decreaseQuantity);
            });
            
            document.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', increaseQuantity);
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', updateQuantity);
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeItem);
            });
        }
        
        // Update cart summary
        updateCartSummary();
    }
    

    // Update quantity functions
    function decreaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCart();
        }
    }

    function increaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        item.quantity += 1;
        updateCart();
    }

    function updateQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        const newQuantity = parseInt(e.target.value);
        
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            updateCart();
        } else {
            e.target.value = item.quantity;
        }
    }

    // Remove item from cart
    function removeItem(e) {
        const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Update cart summary
    function updateCartSummary() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05;
        const total = subtotal + tax;
        
        subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        taxEl.textContent = `₹${tax.toFixed(2)}`;
        totalEl.textContent = `₹${total.toFixed(2)}`;
    }

    // Clear cart
    function clearCart() {
        if (cart.length === 0) {
            alert('Your cart is already empty!');
            return;
        }
        
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            updateCart();
            closeCheckoutModal();
            alert('Cart has been cleared.');
        }
    }

    // Checkout functions
    function showCheckoutModal() {
        if (cart.length === 0) {
            alert('No items in the cart, Please add some to proceed.');
            return;
        }
        
        // Generate order summary
        orderSummary.innerHTML = '';
        cart.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-summary-item';
            orderItem.innerHTML = `
                <span>${item.name} (${item.quantity} x ₹${item.price.toFixed(2)})</span>
                <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            `;
            orderSummary.appendChild(orderItem);
        });
        
        // Show modal
        checkoutModal.style.display = 'flex';
    }

    function closeCheckoutModal() {
        checkoutModal.style.display = 'none';
    }

    function printInvoice() {
        if (cart.length === 0) {
            alert('No items in the cart, Please add some to proceed.');
            return;
        }

        // Generate invoice number and date
        const now = new Date();
        invoiceNumber.textContent = `INV-${now.getTime().toString().slice(-6)}`;
        invoiceDate.textContent = now.toLocaleDateString('en-IN');
        
        // Generate invoice items
        invoiceItems.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            `;
            invoiceItems.appendChild(row);
        });
        
        // Update invoice totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05;
        const total = subtotal + tax;
        
        invoiceSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        invoiceTax.textContent = `₹${tax.toFixed(2)}`;
        invoiceTotal.textContent = `₹${total.toFixed(2)}`;
        
        // Print invoice
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Maa Krupa Provision - Invoice</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                        .invoice { max-width: 800px; margin: 0 auto; }
                        .invoice-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
                        .invoice-header h1 { font-size: 28px; color: #2c3e50; margin-bottom: 10px; }
                        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                        th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
                        th { background-color: #f8f9fa; }
                        .invoice-totals { width: 300px; margin-left: auto; margin-bottom: 30px; }
                        .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
                        .grand-total { font-weight: bold; font-size: 18px; border-top: 1px solid #eee; padding-top: 10px; }
                        .invoice-footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
                    </style>
                </head>
                <body>
                    ${invoiceTemplate.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
        
        // Clear cart after printing if confirmed
        if (confirm('Clear cart after printing?')) {
            clearCart();
        }
    }

    // Event listeners
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', showCheckoutModal);
    closeCheckout.addEventListener('click', closeCheckoutModal);
    printInvoiceBtn.addEventListener('click', printInvoice);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === checkoutModal) {
            closeCheckoutModal();
        }
    });

    // Initialize
    displayProducts();
});