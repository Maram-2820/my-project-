// LOGIN BUTTON EVENT


let loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", loginAdmin);
}

function loginAdmin() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let errorMessage = document.getElementById("errorMessage");

  if (email === "mhaiamaram@gmail.com" && password === "qwerty") {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    errorMessage.textContent = "Incorrect email or password!";
  }
}


// PROTECT ADMIN PAGES
if (
  window.location.pathname.includes("dashboard.html") ||
  window.location.pathname.includes("products.html") ||
  window.location.pathname.includes("orders.html") ||
  window.location.pathname.includes("users.html")
) {
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// LOGOUT
let logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
  });
}









// PRODUCT MANAGEMENT
let products = JSON.parse(localStorage.getItem("products")) || [];

let addProductBtn = document.getElementById("addProductBtn");

if (addProductBtn) {
  addProductBtn.addEventListener("click", addProduct);
  displayProducts(products);
}

function addProduct() {
  let name = document.getElementById("productName").value;
  let brand = document.getElementById("productBrand").value;
  let price = document.getElementById("productPrice").value;
  let category = document.getElementById("productCategory").value;
  let specs = document.getElementById("productSpecs").value;
  let quantity = document.getElementById("productQuantity").value;
  let image = document.getElementById("productImage").value;

  if (name === "" || brand === "" || price === "" || category === "" || quantity === "") {
    alert("Please fill all important fields!");
    return;
  }

  let product = {
    name: name,
    brand: brand,
    price: price,
    category: category,
    specs: specs,
    quantity: quantity,
    image: image
  };

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  clearProductForm();
  displayProducts(products);
}

function displayProducts(productList) {
  let tableBody = document.getElementById("productTableBody");

  if (!tableBody) return;

  tableBody.innerHTML = "";

  productList.forEach(function(product, index) {
    tableBody.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.price} DA</td>
        <td>${product.category}</td>
        <td>${product.quantity}</td>
        <td>
          <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function clearProductForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productBrand").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productSpecs").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("productImage").value = "";
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts(products);
}

function editProduct(index) {
  let product = products[index];

  document.getElementById("productName").value = product.name;
  document.getElementById("productBrand").value = product.brand;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productSpecs").value = product.specs;
  document.getElementById("productQuantity").value = product.quantity;
  document.getElementById("productImage").value = product.image;

  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts(products);
}

// SEARCH PRODUCT
let searchProduct = document.getElementById("searchProduct");

if (searchProduct) {
  searchProduct.addEventListener("input", function () {
    let keyword = searchProduct.value.toLowerCase();

    // If empty → show all products
    if (keyword === "") {
      displayProducts(products);
      return;
    }

    let filteredProducts = products.filter(function (product) {
      return (
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
      );
    });

    displayProducts(filteredProducts);
  });
}






// ORDER MANAGEMENT
let orders = JSON.parse(localStorage.getItem("orders")) || [
  {
    id: "ORD001",
    customer: "Ali Ahmed",
    product: "iPhone 13",
    total: "120000",
    status: "In Progress"
  },
  {
    id: "ORD002",
    customer: "Sara Ben",
    product: "HP Laptop",
    total: "95000",
    status: "Delivered"
  },
  {
    id: "ORD003",
    customer: "Yacine Karim",
    product: "Wireless Mouse",
    total: "2500",
    status: "Pending"
  }
];

let ordersTableBody = document.getElementById("ordersTableBody");

if (ordersTableBody) {
  displayOrders();
}

function displayOrders() {
  ordersTableBody.innerHTML = "";

  orders.forEach(function(order, index) {
    ordersTableBody.innerHTML += `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.product}</td>
        <td>${order.total} DA</td>
        <td>${order.status}</td>
        <td>
          <select class="status-select" onchange="updateOrderStatus(${index}, this.value)">
            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${order.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
            <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("orders", JSON.stringify(orders));
}

function updateOrderStatus(index, newStatus) {
  orders[index].status = newStatus;
  localStorage.setItem("orders", JSON.stringify(orders));
  displayOrders();
}

let exportOrdersBtn = document.getElementById("exportOrdersBtn");

if (exportOrdersBtn) {
  exportOrdersBtn.addEventListener("click", function() {
    alert("Order history exported successfully!");
  });
}




// USER MANAGEMENT
let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: "USR001",
    name: "Ali Ahmed",
    email: "ali@gmail.com",
    role: "client",
    status: "Active"
  },
  {
    id: "USR002",
    name: "Sara Ben",
    email: "sara@gmail.com",
    role: "client",
    status: "Active"
  },
  {
    id: "USR003",
    name: "Admin TechZone",
    email: "admin@techzone.com",
    role: "admin",
    status: "Active"
  }
];

let usersTableBody = document.getElementById("usersTableBody");

if (usersTableBody) {
  displayUsers();
}

function displayUsers() {
  usersTableBody.innerHTML = "";

  users.forEach(function(user, index) {
    usersTableBody.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <select class="role-select" onchange="changeUserRole(${index}, this.value)">
            <option value="client" ${user.role === "client" ? "selected" : ""}>client</option>
            <option value="admin" ${user.role === "admin" ? "selected" : ""}>admin</option>
          </select>
        </td>
        <td>${user.status}</td>
        <td>
          <button class="block-btn" onclick="blockUser(${index})">Block</button>
          <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("users", JSON.stringify(users));
}

function changeUserRole(index, newRole) {
  users[index].role = newRole;
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}

function blockUser(index) {
  if (users[index].status === "Active") {
    users[index].status = "Blocked";
  } else {
    users[index].status = "Active";
  }

  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}

function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  displayUsers();
}