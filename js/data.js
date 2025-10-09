

// Initial product data. This will be seeded into localStorage if it's empty.
const initialProducts = [
  // Packed Coffee
  { id: "pk01", category: "packed", name: "Perfect Start Arabica Beans", price: 7500, img: "img/p1.png" },
  { id: "pk02", category: "packed", name: "Botero Classic Roast", price: 6000, img: "img/p2.png" },
  { id: "pk03", category: "packed", name: "Patch Roast House Blend", price: 7000, img: "img/p3.png" },
  { id: "pk04", category: "packed", name: "Taste Select Artisan Blend", price: 5500, img: "img/p4.png" },
  { id: "pk05", category: "packed", name: "Sacred Grounds Organic", price: 6500, img: "img/p5.png" },
  { id: "pk06", category: "packed", name: "Presto Coffee Bags - Italian", price: 7500, img: "img/p6.png" },
  
  // Hot Coffee
  { id: "hc01", category: "hot", name: "Espresso", price: 1500, img: "img/hot-espresso.jpg" },
  { id: "hc02", category: "hot", name: "Classic Americano", price: 1600, img: "img/hot-americano.jpg" },
  { id: "hc03", category: "hot", name: "Silky Latte", price: 1800, img: "img/hot-latte.jpg" },
  { id: "hc04", category: "hot", name: "Foamy Cappuccino", price: 1800, img: "img/hot-cappuccino.jpg" },

  // Cold Coffee
  { id: "cc01", category: "cold", name: "Iced Latte", price: 1800, img: "img/cold-iced-latte.jpg" },
  { id: "cc02", category: "cold", name: "Rich Iced Mocha", price: 2000, img: "img/cold-iced-mocha.jpg" },
  { id: "cc03", category: "cold", name: "Smooth Cold Brew", price: 1700, img: "img/cold-brew.jpg" },
  { id: "cc04", category: "cold", name: "Blended Frappuccino", price: 2200, img: "img/cold-frappuccino.jpg" }
];

// Function to get all products from localStorage
function getAllProducts() {
  const products = localStorage.getItem('products');
  // If no products in localStorage, seed with initial data
  if (!products) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(products);
}

// Function to save all products to localStorage
function saveAllProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}