let Orders = [];

function loadOrders() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/cart.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let users = JSON.parse(xhr.responseText);
            Orders = users.filter(user => user.status === "pending");
            filterOrders(); // Call filterOrders to display the orders initially
        }
    };
    xhr.send();
}

// Function to aggregate orders by product name
function aggregateOrders(orders) {
    let aggregatedOrders = {};

    orders.forEach(order => {
        let key = order.product_name; // Using product name as the key for aggregation
        if (aggregatedOrders[key]) {
            aggregatedOrders[key].number_of_items += Number(order.number_of_items);
            aggregatedOrders[key].total += Number(order.total);
        } else {
            aggregatedOrders[key] = {
                ...order,
                number_of_items: Number(order.number_of_items),
                total: Number(order.total)
            };
        }
    });
    return Object.values(aggregatedOrders);
}

// Function to filter and display orders based on search and order
function filterOrders() {
    let searchTerm = document.getElementById("product-search").value.trim().toLowerCase();
    let sortOrder = document.getElementById("order").value;

    // Filter orders based on search term
    let filteredOrders = Orders.filter(order => {
        return searchTerm === "" || order.product_name.toLowerCase().includes(searchTerm);
    });
    // Aggregate the filtered orders
    let aggregatedOrders = aggregateOrders(filteredOrders);

    // Sort aggregated orders based on order
    if (sortOrder === "descending") {
        aggregatedOrders.sort((a, b) => b.price - a.price); // Sort by price in descending order
    } else {
        aggregatedOrders.sort((a, b) => a.price - b.price); // Sort by price in ascending order
    }
    // Display the aggregated and sorted orders
    displayOrders(aggregatedOrders);
}

// Function to display orders in the table
function displayOrders(orders) {
    let table = document.getElementById("order-table");

    // Clear existing table rows
    table.innerHTML = "<tr><th>Image</th><th>Name</th><th>Anime</th><th>Price</th><th>Orders</th><th>Total</th></tr>";

    // Add each order to the table
    orders.forEach(order => {
        let row = table.insertRow();
        row.innerHTML = `
            <td><img id="image" src="${order.image}" alt="Product Image"></td>
            <td>${order.product_name}</td>
            <td>${order.anime}</td>
            <td>${order.price}</td>
            <td>${order.number_of_items}</td>
            <td>${order.total}</td>
            <td><button onclick="getUsers('${order.image}','${order.product_name}','${order.price}','${order.anime}')">Orders</button></td>
            <td><button onclick="updateStatus('${order.product_name}')">Out for Delivery</button></td>
        `;
    });
}

// Event listeners for order search and order dropdown
document.getElementById("product-search").addEventListener("input", filterOrders);
document.getElementById("order").addEventListener("change", filterOrders);

// Load orders when the page loads
window.onload = loadOrders;

function getUsers(image, product_name, price, anime) {
    window.open("http://localhost/action-figure/admin/user_orders_page.php?image=" + image + "&product_name=" + product_name + "&product_price=" + price + "&product_anime=" + anime, "_self");
}

function updateStatus(product_name) {
    // Ask for confirmation before updating status
    if (confirm("Are you sure you want to mark this order as Out for Delivery?")) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Reload the orders to reflect the changes
                loadOrders();
            }
        };
        xhr.open("POST", "../backend/update_status.php", true); // Endpoint for updating status
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("product_name=" + encodeURIComponent(product_name) + "&status=delivered");
    }
}