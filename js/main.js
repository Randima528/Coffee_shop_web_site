
document.addEventListener("DOMContentLoaded", () => {
    // --- General UI interactions ---
    const searchIcon = document.querySelector('#search-icon');
    const searchBox = document.querySelector('.search-box');
    const navbar = document.querySelector('.navbar');
    const menuIcon = document.querySelector('#menu-icon');
    const header = document.querySelector('header');

    if(searchIcon) {
        searchIcon.onclick = () => {
            searchBox.classList.toggle('active');
            navbar.classList.remove('active');
        };
    }
    
    if(menuIcon) {
        menuIcon.onclick = () => {
            navbar.classList.toggle('active');
            searchBox.classList.remove('active');
        };
    }

    window.onscroll = () => {
        if(navbar) navbar.classList.remove('active');
        if(searchBox) searchBox.classList.remove('active');
        if (header) {
            header.classList.toggle('shadow', window.scrollY > 0);
        }
    };
    
    // --- DYNAMIC PRODUCT LOADING & FILTERING ---
    const popularProductContainer = document.querySelector('#product-container[data-category="popular"]');
    if (popularProductContainer) {
        displayProducts('packed', popularProductContainer, 6); // Show 6 packed items as popular
    }
    
    // Check if we are on the main products page
    const filters = document.getElementById('product-filters');
    if (filters) {
        handleProductPage();
    }
    
    // --- CART FUNCTIONALITY ---
    updateCartCount();
    if(document.getElementById('cartItems')) {
        renderCart();
    }
});

// --- NEW: LOGIC FOR THE MAIN PRODUCTS PAGE ---
function handleProductPage() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productContainer = document.getElementById('product-container');

    // 1. Check URL for a category to pre-filter
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';
    
    displayProducts(category, productContainer);
    updateActiveButton(category);

    // 2. Add click listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            displayProducts(filter, productContainer);
            updateActiveButton(filter);
        });
    });
}

function updateActiveButton(activeFilter) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        if (button.dataset.filter === activeFilter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// --- UPDATED: PRODUCT DISPLAY FUNCTION ---
function displayProducts(filter = 'all', container, limit = null) {
    const allProducts = getAllProducts();
    
    let filteredProducts;
    if (filter === 'all') {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(p => p.category === filter);
    }

    if (limit) {
        filteredProducts = filteredProducts.slice(0, limit);
    }

    container.innerHTML = ''; // Clear existing content
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p>No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productBox = document.createElement('div');
        productBox.className = 'box';
        productBox.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="content">
                <span>Rs.${product.price.toFixed(2)}</span>
                <a href="#" class="add-to-cart" data-id="${product.id}">Add to cart</a>
            </div>
        `;
        container.appendChild(productBox);
    });
    
    attachAddToCartListeners();
}

function attachAddToCartListeners() {
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", e => {
            e.preventDefault();
            addToCart(e.target.dataset.id);
        });
    });
}

// --- CART LOGIC (Mostly Unchanged) ---
function getCart() {
    return JSON.parse(localStorage.getItem("golden_bean_cart") || "{}");
}

function saveCart(cart) {
  localStorage.setItem("golden_bean_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart(cart);
  alert('Item added to cart!');
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const summaryCount = document.getElementById("summaryCount");
  const summarySubtotal = document.getElementById("summarySubtotal");
  
  if (!container) return;
  
  const cart = getCart();
  const allProducts = getAllProducts();
  container.innerHTML = "";

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = allProducts.find(p => p.id === id);
    return { ...product, qty };
  });

  if (cartItems.length === 0) {
    container.innerHTML = `<p>Your cart is empty. <a href="products.html">Shop now</a></p>`;
    if (summarySubtotal) summarySubtotal.textContent = "0.00";
    if(summaryCount) summaryCount.textContent = 0;
    return;
  }

  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-details" style="flex:1">
        <h4>${item.name}</h4>
        <p class="price">Rs.${item.price.toFixed(2)}</p>
        <div class="qty-control">
          <button class="qty-btn" data-op="dec" data-id="${item.id}">-</button>
          <input type="number" min="1" value="${item.qty}" data-id="${item.id}" class="qty-input">
          <button class="qty-btn" data-op="inc" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="item-subtotal">Rs.${(item.price * item.qty).toFixed(2)}</div>
      <button class="btn ghost remove-item" data-id="${item.id}">&times;</button>
    `;
    container.appendChild(div);
  });

  if (summarySubtotal) summarySubtotal.textContent = subtotal.toFixed(2);
  if(summaryCount) summaryCount.textContent = cartItems.reduce((sum, item) => sum + item.qty, 0);

  container.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.dataset.id;
      if (!id) return;
      let cart = getCart();
      if (target.matches('.qty-btn')) {
          const op = target.dataset.op;
          if (op === 'inc') cart[id]++;
          if (op === 'dec') cart[id] = Math.max(1, cart[id] - 1);
      } else if (target.matches('.remove-item')) {
          delete cart[id];
      }
      saveCart(cart);
      renderCart();
  });
  
  container.addEventListener('change', (e) => {
      if (e.target.matches('.qty-input')) {
          const id = e.target.dataset.id;
          const qty = parseInt(e.target.value) || 1;
          let cart = getCart();
          cart[id] = Math.max(1, qty);
          saveCart(cart);
          renderCart();
      }
  });
}