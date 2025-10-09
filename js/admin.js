// js/admin.js
document.addEventListener("DOMContentLoaded", () => {
    // Check which page we are on
    if (document.getElementById('login-form')) {
        handleLoginPage();
    } else if (document.querySelector('.dashboard-container')) {
        handleDashboardPage();
    }
});

// --- LOGIN PAGE LOGIC ---
function handleLoginPage() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('login-error');

        // --- HARDCODED ADMIN CREDENTIALS ---
        if (username === 'admin' && password === 'password123') {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = 'Invalid username or password.';
            errorDiv.style.display = 'block';
        }
    });
}


// --- DASHBOARD PAGE LOGIC ---
function handleDashboardPage() {
    // Auth Guard: Redirect if not logged in
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return; // Stop further execution
    }

    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const productForm = document.getElementById('product-form');
    const productIdInput = document.getElementById('product-id');
    const productNameInput = document.getElementById('product-name');
    const productCategoryInput = document.getElementById('product-category');
    const productPriceInput = document.getElementById('product-price');
    const productImgInput = document.getElementById('product-img');
    const tableBody = document.querySelector('#product-table tbody');

    // Load products into table
    function renderProducts() {
        const products = getAllProducts();
        tableBody.innerHTML = ''; // Clear table
        products.forEach(product => {
            const row = `
                <tr>
                    <td><img src="../${product.img}" alt="${product.name}"></td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                        <button class="action-btn edit-btn" data-id="${product.id}"><i class='bx bxs-edit'></i></button>
                        <button class="action-btn delete-btn" data-id="${product.id}"><i class='bx bxs-trash'></i></button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Show modal
    function showModal(title, product = null) {
        modalTitle.textContent = title;
        if (product) { // Editing existing product
            productIdInput.value = product.id;
            productNameInput.value = product.name;
            productCategoryInput.value = product.category;
            productPriceInput.value = product.price;
            productImgInput.value = product.img;
        } else { // Adding new product
            productForm.reset();
            productIdInput.value = '';
        }
        modal.style.display = 'block';
    }

    // Hide modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Event Listeners
    document.getElementById('show-add-form-btn').addEventListener('click', () => showModal('Add New Product'));
    document.querySelector('.close-btn').addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target == modal) hideModal();
    });

    // Form submission (Add/Edit)
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const products = getAllProducts();
        const productData = {
            id: productIdInput.value,
            name: productNameInput.value,
            category: productCategoryInput.value,
            price: parseFloat(productPriceInput.value),
            img: productImgInput.value
        };

        if (productData.id) { // Update existing
            const index = products.findIndex(p => p.id === productData.id);
            products[index] = productData;
        } else { // Add new
            productData.id = productData.category.substring(0,2) + Date.now(); // Generate a simple unique ID
            products.push(productData);
        }
        
        saveAllProducts(products);
        renderProducts();
        hideModal();
    });

    // Edit and Delete buttons
    tableBody.addEventListener('click', (e) => {
        const products = getAllProducts();
        const target = e.target.closest('button');
        if (!target) return;

        const id = target.dataset.id;

        if (target.classList.contains('edit-btn')) {
            const product = products.find(p => p.id === id);
            showModal('Edit Product', product);
        }

        if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this product?')) {
                const updatedProducts = products.filter(p => p.id !== id);
                saveAllProducts(updatedProducts);
                renderProducts();
            }
        }
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'index.html';
    });

    // Initial render
    renderProducts();
}
