// Sample product data (40 products)
const products = [
    { id: 1, name: "Surf Excel", price: "₹100", stock: 12, category: "Detergent"  },
    { id: 2, name: "Rin", price: "₹207", stock: 15, category: "Detergent" },
    { id: 3, name: "Parle G", price: "₹105", stock: 17, category: "Biscuits" },
    { id: 4, name: "Tata Salt", price: "₹20", stock: 10, category: "Groceries" },
    { id: 5, name: "Lays", price: "₹30", stock: 15, category: "Snacks" },
    { id: 6, name: "Dove Shampoo", price: "₹180", stock: 8, category: "Personal Care" },
    { id: 7, name: "Colgate", price: "₹75", stock: 22, category: "Personal Care" },
    { id: 8, name: "Maggi", price: "₹50", stock: 25, category: "Noodles" },
    { id: 9, name: "Amul Milk", price: "₹60", stock: 30, category: "Dairy" },
    { id: 10, name: "Britannia Bread", price: "₹40", stock: 18, category: "Bakery" },
    { id: 11, name: "Nescafe Coffee", price: "₹250", stock: 12, category: "Beverages" },
    { id: 12, name: "Red Label Tea", price: "₹200", stock: 15, category: "Beverages" },
    { id: 13, name: "Pepsi", price: "₹50", stock: 40, category: "Beverages" },
    { id: 14, name: "Coca Cola", price: "₹50", stock: 35, category: "Beverages" },
    { id: 15, name: "Kurkure", price: "₹20", stock: 28, category: "Snacks" },
    { id: 16, name: "Pringles", price: "₹99", stock: 10, category: "Snacks" },
    { id: 17, name: "Dairy Milk", price: "₹50", stock: 45, category: "Chocolates" },
    { id: 18, name: "KitKat", price: "₹30", stock: 32, category: "Chocolates" },
    { id: 19, name: "Good Day", price: "₹25", stock: 27, category: "Biscuits" },
    { id: 20, name: "Bournvita", price: "₹300", stock: 14, category: "Beverages" },
    { id: 21, name: "Horlicks", price: "₹350", stock: 12, category: "Beverages" },
    { id: 22, name: "Aashirvaad Atta", price: "₹400", stock: 8, category: "Groceries" },
    { id: 23, name: "Fortune Oil", price: "₹200", stock: 10, category: "Groceries" },
    { id: 24, name: "Tata Tea", price: "₹150", stock: 18, category: "Beverages" },
    { id: 25, name: "Harpic", price: "₹120", stock: 9, category: "Cleaning" },
    { id: 26, name: "Vim", price: "₹80", stock: 12, category: "Cleaning" },
    { id: 27, name: "Dettol Soap", price: "₹45", stock: 25, category: "Personal Care" },
    { id: 28, name: "Lux Soap", price: "₹35", stock: 30, category: "Personal Care" },
    { id: 29, name: "Ponds Powder", price: "₹180", stock: 7, category: "Personal Care" },
    { id: 30, name: "Head & Shoulders", price: "₹220", stock: 11, category: "Personal Care" },
    { id: 31, name: "Closeup", price: "₹90", stock: 20, category: "Personal Care" },
    { id: 32, name: "Pepsodent", price: "₹85", stock: 18, category: "Personal Care" },
    { id: 33, name: "MTR Sambar Powder", price: "₹60", stock: 15, category: "Spices" },
    { id: 34, name: "Everest Garam Masala", price: "₹55", stock: 12, category: "Spices" },
    { id: 35, name: "Knorr Soup", price: "₹65", stock: 9, category: "Ready to Eat" },
    { id: 36, name: "Yippee Noodles", price: "₹45", stock: 22, category: "Noodles" },
    { id: 37, name: "Sunfeast Biscuits", price: "₹25", stock: 30, category: "Biscuits" },
    { id: 38, name: "Marie Gold", price: "₹20", stock: 28, category: "Biscuits" },
    { id: 39, name: "Bingo Chips", price: "₹20", stock: 35, category: "Snacks" },
    { id: 40, name: "Frooti", price: "₹25", stock: 40, category: "Beverages" }
];

document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    let currentProducts = [...products];
    
    // Generate product cards
    renderProducts(currentProducts);

    // Sidebar menu interaction
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text === 'Overview') {
                window.location.href = 'dashboard.html';
            } else if (text === 'Products') {
                window.location.href = 'products.html';
            }
            // Add other page navigations as needed
        });
    });

    // Header Category Dropdown
    const headerDropdownBtn = document.querySelector('.header-dropdown-btn');
    const headerDropdownContent = document.querySelector('.header-dropdown-content');
    
    if (headerDropdownBtn) {
        headerDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            headerDropdownContent.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        headerDropdownContent.classList.remove('show');
    });

    // Category filter
    const categoryItems = document.querySelectorAll('.header-category-list li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.textContent.trim();
            
            if (category === 'All Products') {
                currentProducts = [...products];
                renderProducts(currentProducts);
            } else {
                currentProducts = products.filter(
                    product => product.category === category
                );
                renderProducts(currentProducts);
            }
            
            // Update dropdown button text
            headerDropdownBtn.innerHTML = `${category} <span class="arrow">▼</span>`;
            headerDropdownContent.classList.remove('show');
        });
    });

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            alert('Logging out...');
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            currentProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm)
            );
            renderProducts(currentProducts);
        }
    });

    // Profile dropdown (would be implemented in a real app)
    const profileSection = document.querySelector('.profile-section');
    if (profileSection) {
        profileSection.addEventListener('click', function() {
            alert('Profile dropdown would appear here');
        });
    }

    // Pagination buttons
    document.getElementById('nextPage').addEventListener('click', function() {
        alert('Next page would load more products in a real implementation');
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        alert('Previous page would load previous products in a real implementation');
    });

    function renderProducts(productsToRender) {
        productsContainer.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">Product Image</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-details">
                    <span>${product.category}</span>
                    <span class="product-price">${product.price}</span>
                </div>
                <div class="product-stock ${product.stock > 15 ? 'in-stock' : ''}">
                    ${product.stock > 15 ? 'In Stock' : 'Low Stock'}: ${product.stock}
                </div>
                <div class="product-actions">
                    <button class="btn btn-edit" data-id="${product.id}">Edit</button>
                    <button class="btn btn-delete" data-id="${product.id}">Delete</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent any default behavior
                e.stopPropagation();
                const productId = parseInt(this.getAttribute('data-id'));
                
                if (confirm('Are you sure you want to delete this product?')) {
                    // Remove from current products array
                    currentProducts = currentProducts.filter(p => p.id !== productId);
                    // Remove from main products array as well
                    const index = products.findIndex(p => p.id === productId);
                    if (index > -1) {
                        products.splice(index, 1);
                    }
                    // Re-render products without page refresh
                    renderProducts(currentProducts);
                }
            });
        });

        // Add event listeners for edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent any default behavior
                e.stopPropagation();
                const productId = parseInt(this.getAttribute('data-id'));
                const product = currentProducts.find(p => p.id === productId);
                
                // Simple edit functionality - in a real app you'd have a proper form/modal
                const newName = prompt('Enter new product name:', product.name);
                if (newName !== null) {
                    product.name = newName;
                }
                
                const newPrice = prompt('Enter new price:', product.price);
                if (newPrice !== null) {
                    product.price = newPrice;
                }
                
                const newStock = prompt('Enter new stock quantity:', product.stock);
                if (newStock !== null) {
                    product.stock = parseInt(newStock) || 0;
                }
                
                const newCategory = prompt('Enter new category:', product.category);
                if (newCategory !== null) {
                    product.category = newCategory;
                }
                
                // Update the product in both arrays
                const mainIndex = products.findIndex(p => p.id === productId);
                if (mainIndex > -1) {
                    products[mainIndex] = { ...product };
                }
                
                // Re-render products without page refresh
                renderProducts(currentProducts);
            });
        });
    }
});