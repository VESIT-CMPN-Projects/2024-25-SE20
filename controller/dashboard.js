document.addEventListener('DOMContentLoaded', function() {
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
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alert('Searching for: ' + this.value);
        }
    });
});