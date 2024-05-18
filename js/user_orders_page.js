let usersData = []; // Array to store fetched user data

// Function to fetch users data
function getUsers() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/action-figure/backend/cart.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            usersData = JSON.parse(xhr.responseText); // Store fetched data in the array

            // Get product name from URL
            let urlParams = new URLSearchParams(window.location.search);
            let productName = urlParams.get('product_name');

            if (productName) {
                filterUsersByProduct(productName); // Filter and display users based on product name
            }
        }
    };
    xhr.send();
}

// Function to display user data in the table
function displayUser(users) {
    let table = document.querySelector(".table table"); 
    // Clear existing table rows
    table.innerHTML = "<tr><th>Username</th><th>Name</th><th>Address</th><th>Email</th><th>Contact</th><th>Orders</th><th>Total</th><th>Paid</th><th>Mode</th></tr>";
    
    // Loop through each user and create table rows
    users.forEach(userData => {
        if(userData.status == "pending"){
            let row = table.insertRow();
            let usernameCell = row.insertCell(0);
            let fullNameCell = row.insertCell(1);
            let addressCell = row.insertCell(2);
            let emailCell = row.insertCell(3);
            let contactCell = row.insertCell(4);
            let orderCell = row.insertCell(5);
            let totalCell = row.insertCell(6);
            let paidCell = row.insertCell(7);
            let modeCell = row.insertCell(8);

            if(userData.paid == ""){
                paidCell.textContent = "No";
                modeCell.textContent = "COD";
            }
            else{
                paidCell.textContent = "Yes";
                modeCell.textContent = "GCash";
            }
    
            usernameCell.textContent = userData.username;
            fullNameCell.textContent = userData.name;
            addressCell.textContent = userData.address;
            emailCell.textContent = userData.email;
            contactCell.textContent = userData.contact_number;
            orderCell.textContent = userData.number_of_items;
            totalCell.textContent = "₱"+userData.total;
        }
    });
}

// Function to filter users by product name
function filterUsersByProduct(productName) {
    let filteredUsers = usersData.filter(user => {
        return user.product_name && user.product_name.includes(productName);
    });
    displayUser(filteredUsers);
}