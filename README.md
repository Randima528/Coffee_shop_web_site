# Golden Bean Coffee Shop Website



A fully responsive and dynamic e-commerce website for a coffee shop named "Golden Bean." This project features a complete customer-facing interface for browsing and ordering products, along with a secure admin panel for full product management (CRUD). It is built using only HTML, CSS, and modern JavaScript, utilizing browser storage to function without a backend database.



## Features

### 🛒 Customer-Facing Site
* **Fully Responsive Design:** Adapts seamlessly to desktops, tablets, and mobile devices.
* **Dynamic Product Page:** All products are loaded from a central data source onto a single, filterable page.
* **Interactive Filtering:** Customers can instantly filter products by category (Hot Coffee, Cold Coffee, Packed Coffee).
* **Persistent Shopping Cart:** The shopping cart state is saved in the browser's local storage, so items are not lost on page reload.
* **No Login Required:** A frictionless experience for customers to browse and add items to their cart.

### 🔒 Admin Panel
* **Secure Admin Login:** The admin dashboard is protected by a dedicated login page.
* **Product Management Dashboard:** A clean and functional interface to view all products at a glance.
* **Full CRUD Functionality:** Admins can easily **C**reate new products, **R**ead (view) existing ones, **U**pdate their details (name, price, etc.), and **D**elete them from the store.
* **Real-time Updates:** Any changes made in the admin panel are immediately reflected on the live customer-facing site.

---

## Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript (ES6)
* **Data Storage:** Browser Local Storage (for product data & cart) and Session Storage (for admin login state).
* **Icons:** [Boxicons](https://boxicons.com/)

---

## 📸 Preview  

<img width="1917" height="866" alt="Admin_Panel" src="https://github.com/user-attachments/assets/16579d1c-d43a-4678-ac98-01c277968a30" />
<img width="1919" height="870" alt="Dashboard" src="https://github.com/user-attachments/assets/2b96f745-de0d-4e5f-92cd-1e9dd154317e" />
<img width="1916" height="865" alt="Add_Product" src="https://github.com/user-attachments/assets/12d0daf9-5549-4961-bb9b-f3a86b35906f" />
<img width="1919" height="872" alt="Home" src="https://github.com/user-attachments/assets/b602768f-b3ed-4bbc-b0e4-bf6d7955478a" />
<img width="1918" height="866" alt="About_Us" src="https://github.com/user-attachments/assets/0f8b9c52-7d4b-47bc-9153-b0dcf49eec9c" />
<img width="1919" height="869" alt="Products" src="https://github.com/user-attachments/assets/0e2aaf34-5270-4fd9-a2ab-ceaac22779fa" />
<img width="1917" height="862" alt="Customers" src="https://github.com/user-attachments/assets/a8a00765-8c87-4d5d-b5f7-ebe920b5feeb" />
<img width="1918" height="866" alt="Cart" src="https://github.com/user-attachments/assets/ad28b444-a9f5-4e6f-95f5-faaa1d8d5f71" />

---

## 🚀 Installation and Setup

No complex build tools are required. You can run this project locally with these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/golden-bean-coffee.git](https://github.com/your-username/golden-bean-coffee.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd golden-bean-coffee
    ```

3.  **Open `index.html` in your browser.**
    * For the best experience (to avoid any potential CORS issues with local files), it's recommended to use a live server. If you are using VS Code, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

---

## 🔑 Admin Access

To access the admin panel for managing products:

1.  Navigate to the `/admin/` directory in your browser.
    * Example: `http://127.0.0.1:5500/admin/index.html`

2.  Use the following hardcoded credentials to log in:
    * **Username:** `admin`
    * **Password:** `password123`
