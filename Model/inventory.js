// Global Variables
let products = [
    { 
        id: 1,
        name: 'Maggi', 
        category: 'Instant food', 
        price: 430, 
        quantity: 43,
        unit: 'Packets',
        threshold: 12,
        expiry: '11/12/22', 
        availability: 'In-stock' 
    },
    { 
        id: 2,
        name: 'Bru', 
        category: 'Beverages', 
        price: 257, 
        quantity: 22,
        unit: 'Packets',
        threshold: 12,
        expiry: '21/12/22', 
        availability: 'Out of stock' 
    },
    // Add more sample products as needed
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard if exists
    if (document.querySelector('.dashboard-cards')) {
        initDashboard();
    }

    // Initialize inventory page if exists
    if (document.getElementById('productsTable')) {
        initInventory();
    }

    // Initialize add product page if exists
    if (document.getElementById('productForm')) {
        initAddProduct();
    }

    // Common initialization
    initCommon();
});

// Common Functions
function initCommon() {
    // Sidebar menu interaction
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            alert('Logging out...');
            // In a real app: window.location.href = '/logout';
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert('Searching for: ' + this.value);
            }
        });
    }
}

// Dashboard Functions
function initDashboard() {
    // Any dashboard-specific initialization
    console.log('Dashboard initialized');
}

// Inventory Functions
function initInventory() {
    const tableBody = document.querySelector('#productsTable tbody');
    
    // Render products table
    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>${product.quantity} ${product.unit}</td>
                <td>${product.threshold} ${product.unit}</td>
                <td>${product.expiry}</td>
                <td><span class="status ${product.availability.toLowerCase().includes('stock') ? 'in-stock' : 'out-of-stock'}">${product.availability}</span></td>
                <td class="actions">
                    <button class="icon-btn edit-btn" data-id="${product.id}">✏</button>
                    <button class="icon-btn delete-btn" data-id="${product.id}">🗑</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add delete event listeners
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                if (confirm('Are you sure you want to delete this product?')) {
                    deleteProduct(id);
                }
            });
        });

        // Add edit event listeners
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                editProduct(id);
            });
        });
    }

    // Delete product function
    function deleteProduct(id) {
        try {
            // Find product index
            const index = products.findIndex(p => p.id === id);
            if (index === -1) {
                throw new Error('Product not found');
            }

            // Remove product
            products.splice(index, 1);
            
            // Save to localStorage
            localStorage.setItem('products', JSON.stringify(products));
            
            // Re-render table
            renderTable(products);
            
            // Show success message
            alert('Product deleted successfully');
        } catch (error) {
            alert('Error deleting product: ' + error.message);
        }
    }

    // Edit product function
    function editProduct(id) {
        try {
            // Find product
            const product = products.find(p => p.id === id);
            if (!product) {
                throw new Error('Product not found');
            }

            // Create edit form modal
            const modal = document.createElement('div');
            modal.className = 'edit-modal';
            modal.innerHTML = `
                <div class="edit-modal-content">
                    <h2>Edit Product</h2>
                    <form id="editForm">
                        <div class="form-group">
                            <label for="editName">Name:</label>
                            <input type="text" id="editName" value="${product.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="editCategory">Category:</label>
                            <input type="text" id="editCategory" value="${product.category}" required>
                        </div>
                        <div class="form-group">
                            <label for="editPrice">Price (₹):</label>
                            <input type="number" id="editPrice" value="${product.price}" required>
                        </div>
                        <div class="form-group">
                            <label for="editQuantity">Quantity:</label>
                            <input type="number" id="editQuantity" value="${product.quantity}" required>
                        </div>
                        <div class="form-group">
                            <label for="editUnit">Unit:</label>
                            <input type="text" id="editUnit" value="${product.unit}" required>
                        </div>
                        <div class="form-group">
                            <label for="editThreshold">Threshold:</label>
                            <input type="number" id="editThreshold" value="${product.threshold}" required>
                        </div>
                        <div class="form-group">
                            <label for="editExpiry">Expiry Date:</label>
                            <input type="text" id="editExpiry" value="${product.expiry}" required>
                        </div>
                        <div class="button-group">
                            <button type="submit" class="btn-save">Save Changes</button>
                            <button type="button" class="btn-cancel">Cancel</button>
                        </div>
                    </form>
                </div>
            `;

            // Add modal styles
            const styles = document.createElement('style');
            styles.textContent = `
                .edit-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .edit-modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 90%;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                }
                .form-group input {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                .button-group {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                }
                .btn-save, .btn-cancel {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .btn-save {
                    background: #4CAF50;
                    color: white;
                }
                .btn-cancel {
                    background: #f44336;
                    color: white;
                }
            `;

            document.head.appendChild(styles);
            document.body.appendChild(modal);

            // Handle form submission
            const editForm = document.getElementById('editForm');
            editForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Update product
                product.name = document.getElementById('editName').value;
                product.category = document.getElementById('editCategory').value;
                product.price = parseFloat(document.getElementById('editPrice').value);
                product.quantity = parseInt(document.getElementById('editQuantity').value);
                product.unit = document.getElementById('editUnit').value;
                product.threshold = parseInt(document.getElementById('editThreshold').value);
                product.expiry = document.getElementById('editExpiry').value;
                product.availability = product.quantity > 0 ? 'In-stock' : 'Out of stock';

                // Save to localStorage
                localStorage.setItem('products', JSON.stringify(products));
                
                // Re-render table
                renderTable(products);
                
                // Close modal
                modal.remove();
                
                // Show success message
                alert('Product updated successfully');
            });

            // Handle cancel button
            const cancelBtn = modal.querySelector('.btn-cancel');
            cancelBtn.addEventListener('click', () => modal.remove());

            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });

        } catch (error) {
            alert('Error editing product: ' + error.message);
        }
    }

    // Load initial data from localStorage if exists
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }

    // Initial render
    renderTable(products);

    const categoryFilter = document.getElementById('categoryFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');

    // Filter products
    function filterProducts() {
        const category = categoryFilter.value;
        const availability = availabilityFilter.value;
        
        let filtered = [...products];
        
        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }
        
        if (availability !== 'all') {
            filtered = filtered.filter(p => p.availability === availability);
        }
        
        sortProducts(filtered, currentSort.column, currentSort.direction);
    }

    // Sort products
    let currentSort = { column: 'name', direction: 'asc' };
    function sortProducts(data, column, direction) {
        const sorted = [...data].sort((a, b) => {
            if (column === 'price' || column === 'quantity' || column === 'threshold') {
                return direction === 'asc' ? a[column] - b[column] : b[column] - a[column];
            } else {
                return direction === 'asc' 
                    ? a[column].localeCompare(b[column])
                    : b[column].localeCompare(a[column]);
            }
        });
        
        renderTable(sorted);
        updateSortIndicator(column, direction);
    }

    // Update sort indicator
    function updateSortIndicator(column, direction) {
        document.querySelectorAll('#productsTable th').forEach(th => {
            const icon = th.querySelector('.sort-icon');
            if (th.dataset.sort === column) {
                icon.textContent = direction === 'asc' ? '↑' : '↓';
            } else {
                icon.textContent = '↕';
            }
        });
    }

    // Event listeners
    document.querySelectorAll('#productsTable th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            if (currentSort.column === column) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = column;
                currentSort.direction = 'asc';
            }
            filterProducts();
        });
    });

    categoryFilter.addEventListener('change', filterProducts);
    availabilityFilter.addEventListener('change', filterProducts);
}

// Add Product Functions
function initAddProduct() {
    const form = document.getElementById('productForm');
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    const closeBtn = document.querySelector('.close');
    const goBackBtn = document.getElementById('goBack');
    const confirmAddBtn = document.getElementById('confirmAdd');
    const productPreview = document.getElementById('productPreview');
    
    // Preview product
    previewBtn.addEventListener('click', function() {
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('buyingPrice').value),
            quantity: parseInt(document.getElementById('quantity').value),
            unit: document.getElementById('unit').value,
            threshold: parseInt(document.getElementById('threshold').value),
            expiry: document.getElementById('expiryDate').value
        };
        
        // Validate form
        if (!productData.name || !productData.category || isNaN(productData.price) || 
            isNaN(productData.quantity) || !productData.unit || isNaN(productData.threshold)) {
            alert('Please fill all required fields with valid values');
            return;
        }
        
        // Show preview
        productPreview.innerHTML = `
            <div class="preview-item"><strong>Product Name:</strong> ${productData.name}</div>
            <div class="preview-item"><strong>Category:</strong> ${productData.category}</div>
            <div class="preview-item"><strong>Buying Price:</strong> ₹${productData.price}</div>
            <div class="preview-item"><strong>Quantity:</strong> ${productData.quantity} ${productData.unit}</div>
            <div class="preview-item"><strong>Threshold Value:</strong> ${productData.threshold} ${productData.unit}</div>
            ${productData.expiry ? <div class="preview-item"><strong>Expiry Date:</strong> ${productData.expiry}</div> : ''}
        `;
        
        previewModal.style.display = 'block';
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });
    
    // Go back to form
    goBackBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });
    
    // Confirm and add product
    confirmAddBtn.addEventListener('click', function() {
        const productData = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('buyingPrice').value),
            quantity: parseInt(document.getElementById('quantity').value),
            unit: document.getElementById('unit').value,
            threshold: parseInt(document.getElementById('threshold').value),
            expiry: document.getElementById('expiryDate').value,
            availability: parseInt(document.getElementById('quantity').value) > 0 ? 'In-stock' : 'Out of stock'
        };
        
        // Add to products array
        products.push(productData);
        
        alert('Product added successfully!');
        previewModal.style.display = 'none';
        form.reset();
        
        // In a real app, you would save to database here
        console.log('New product added:', productData);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
}