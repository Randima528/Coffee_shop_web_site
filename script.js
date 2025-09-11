let search = document.querySelector('.search-box');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
};




document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
};

window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
};

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});






// Toggle blur and show text on coffee-type-card click
document.querySelectorAll('.coffee-type-card').forEach(card => {
  card.addEventListener('click', function (e) {
    // Prevent toggling if clicking on the label or desc itself
    if (e.target.classList.contains('coffee-type-label') || e.target.classList.contains('coffee-type-desc')) return;
    card.classList.toggle('active');
  });
});






// --- NEW CODE START: Cart & Modal Functionality ---

// Sample product data (IDs match data-id in HTML)
const products = [
  { id: "p1", name: "Perfect Start Arabica Beans", price: 7500, img: "img/p1.png" },
  { id: "p2", name: "Botero Classic Roast", price: 6000, img: "img/p2.png" },
  { id: "p3", name: "Patch Roast House Blend", price: 7000, img: "img/p3.png" },
  { id: "p4", name: "Taste Select Artisan Blend", price: 5500, img: "img/p4.png" },
  { id: "p5", name: "Sacred Grounds Organic Arabica", price: 6500, img: "img/p5.png" },
  { id: "p6", name: "Presto Coffee Bags – Smooth Italian", price: 7500, img: "img/p6.png" }
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("golden_cart") || "{}");
let discountApplied = 0; // store discount percentage

function saveCart() {
  localStorage.setItem("golden_cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  document.querySelector("#cartCount")?.textContent = count;
  document.querySelector("#summaryCount")?.textContent = count;
}

function addToCart(productId, qty = 1) {
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart();
}

function renderCart() {
  const container = document.querySelector("#cartItems");
  if (!container) return;
  container.innerHTML = "";

  const details = Object.entries(cart).map(([id, qty]) => {
    const p = products.find(prod => prod.id === id);
    return { ...p, qty };
  });

  if (details.length === 0) {
    container.innerHTML = `<p>Your cart is empty. <a href="index.html#products">Shop now</a></p>`;
    document.querySelector("#summarySubtotal").textContent = "0.00";
    document.querySelector("#summaryTotal")?.textContent = "0.00";
    return;
  }

  let subtotal = 0;
  details.forEach(item => {
    subtotal += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-details" style="flex:1">
        <h4>${item.name}</h4>
        <p class="price">Rs.${item.price.toFixed(2)}</p>
        <div class="qty-control">
          <button class="qty-btn" data-id="${item.id}" data-op="dec">-</button>
          <input type="number" min="1" value="${item.qty}" data-id="${item.id}">
          <button class="qty-btn" data-id="${item.id}" data-op="inc">+</button>
          <button class="btn ghost remove-item" data-id="${item.id}">Remove</button>
        </div>
      </div>
      <div class="item-subtotal">Rs.${(item.price * item.qty).toFixed(2)}</div>
    `;
    container.appendChild(div);
  });

  // apply discount if any
  let total = subtotal;
  if (discountApplied > 0) {
    total = subtotal - (subtotal * discountApplied / 100);
  }

  document.querySelector("#summarySubtotal").textContent = subtotal.toFixed(2);
  document.querySelector("#summaryTotal")?.textContent = total.toFixed(2);

  // Qty button listeners
  container.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      const op = e.target.dataset.op;
      if (op === "inc") cart[id] += 1;
      if (op === "dec") cart[id] = Math.max(1, cart[id] - 1);
      saveCart();
    });
  });

  // Input change
  container.querySelectorAll("input[type='number']").forEach(inp => {
    inp.addEventListener("change", e => {
      const id = e.target.dataset.id;
      cart[id] = Math.max(1, parseInt(e.target.value) || 1);
      saveCart();
    });
  });

  // Remove
  container.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", e => {
      delete cart[e.target.dataset.id];
      saveCart();
    });
  });
}

// Apply discount code
document.querySelector("#applyDiscountBtn")?.addEventListener("click", () => {
  const code = document.querySelector("#discountCode")?.value.trim().toUpperCase();
  const msg = document.querySelector("#discountMessage");
  if (code === "SAVE10") {
    discountApplied = 10;
    msg.textContent = "10% discount applied!";
    msg.style.color = "green";
    msg.style.display = "block";
    renderCart();
  } else if (code) {
    discountApplied = 0;
    msg.textContent = "Invalid code.";
    msg.style.color = "red";
    msg.style.display = "block";
    renderCart();
  }
});

// Attach Add to Cart buttons
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    addToCart(e.target.dataset.id);
  });
});

// Clear cart
document.querySelector("#clearCartBtn")?.addEventListener("click", () => {
  if (confirm("Clear your cart?")) {
    cart = {};
    discountApplied = 0;
    saveCart();
  }
});

// Checkout
document.querySelector("#checkoutBtn")?.addEventListener("click", () => {
  const note = document.querySelector("#orderNote")?.value || "";
  alert(`Order placed!\nItems: ${Object.keys(cart).length}\nNote: ${note}\nTotal: Rs.${document.querySelector("#summaryTotal")?.textContent}`);
  cart = {};
  discountApplied = 0;
  saveCart();
});

// Modal functionality
const modal = document.querySelector("#productModal");
function openModal(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;
  document.querySelector("#modalBody").innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <div>
      <h3>${p.name}</h3>
      <p>Price: Rs.${p.price.toFixed(2)}</p>
      <button class="btn primary" id="modalAddBtn">Add to Cart</button>
    </div>
  `;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.querySelector("#modalAddBtn").addEventListener("click", () => {
    addToCart(productId);
    closeModal();
  });
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelector("#modalClose")?.addEventListener("click", closeModal);
modal?.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Attach View buttons
document.querySelectorAll(".view-product").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    openModal(e.target.dataset.id);
  });
});

// Init cart count and render
updateCartCount();
renderCart();

// --- NEW CODE END: Cart & Modal Functionality ---
