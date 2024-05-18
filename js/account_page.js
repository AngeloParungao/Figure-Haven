let usersData = []; // Array to store fetched user data

// Function to fetch users data
function getUsers() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/action-figure/backend/index.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            usersData = JSON.parse(xhr.responseText); // Store fetched data in the array
            displayUser(usersData); // Display the fetched user data
        }
    };
    xhr.send();
}


// Function to display user data in the table
function displayUser(users) {
    let table = document.querySelector(".table table");
    // Clear existing table rows
    table.innerHTML = "<tr><th>Username</th><th>Full name</th><th>Address</th><th>Email</th><th>Contact</th></tr>";
    
    // Loop through each user and create table rows
    users.forEach(userData => {
        if(userData.account_type == "user"){
            let row = table.insertRow();
            let usernameCell = row.insertCell(0);
            let fullNameCell = row.insertCell(1);
            let addressCell = row.insertCell(2);
            let emailCell = row.insertCell(3);
            let contactCell = row.insertCell(4);
    
            usernameCell.textContent = userData.username;
            fullNameCell.textContent = userData.user_fullname;
            addressCell.textContent = userData.address;
            emailCell.textContent = userData.email;
            contactCell.textContent = userData.contact_number;
        }
    });
}

// Add event listener to search input for input event
document.getElementById("username-search").addEventListener("input", function(event) {
    let usernameQuery = event.target.value.trim();
    let filteredUsers = usersData.filter(user => {
        return user.username.toLowerCase().includes(usernameQuery.toLowerCase());
    });
    displayUser(filteredUsers); // Display filtered user data
});