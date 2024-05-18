document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
    getOrders();
});

function loadUserData() {
    const id = localStorage.getItem("userID");
    const name = localStorage.getItem("name");
    const user_name = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const contact_number = localStorage.getItem("contact");
    const address = localStorage.getItem("address");
    const profile_picture = localStorage.getItem("profile");

    document.getElementById("name").value = name;
    document.getElementById("username").value = user_name;
    document.getElementById("email").value = email;
    document.getElementById("contact").value = contact_number;
    document.getElementById("address").value = address;
    document.getElementById("pfp-preview").src = profile_picture;

    document.getElementById("pfp-input").addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            document.getElementById("pfp-preview").src = URL.createObjectURL(file);
        }
    });

    document.getElementById("update-btn").addEventListener("click", function () {
        const file = document.getElementById("pfp-input").files[0];
        if (file) {
            uploadImage(file).then(profilePicture => {
                updateUser(profilePicture);
            }).catch(error => {
                console.error("Failed to upload image:", error);
            });
        } else {
            updateUser(profile_picture);
        }
    });
}

function uploadImage(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../backend/upload.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        resolve(response.filename);
                    } else {
                        reject(response.message);
                    }
                } else {
                    reject("Error occurred while uploading image. HTTP status: " + xhr.status);
                }
            }
        };
        xhr.send(formData);
    });
}

function updateUser(profilePicture) {
    const id = localStorage.getItem("userID");
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;

     // Check if a file is selected
    const file = document.getElementById("pfp-input").files[0];

    if (file) {
        // If a file is selected, concatenate the directory path with the filename
        profilePicture = "http://localhost/action-figure/user-profile/" + file.name;
    } else {
        // If no file is selected, use the existing profile picture
        profilePicture = profilePicture;
    }

    const updateData = JSON.stringify({
        id,
        name,
        username,
        email,
        contact,
        address,
        profilePicture
    });

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "../backend/index.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                localStorage.setItem("name", name);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                localStorage.setItem("contact", contact);
                localStorage.setItem("address", address);
                localStorage.setItem("profile", profilePicture);
                window.location.reload();
            } else {
                console.error("Error occurred while processing the request. HTTP status:", xhr.status);
            }
        }
    };

    xhr.send(updateData);
}

function getOrders() {
    const user_id = localStorage.getItem("userID");
    const dom = document.getElementById("orders");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/cart.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const myOrders = JSON.parse(xhr.responseText);
                myOrders.forEach(order => {
                    if (order.user_id == user_id && (order.status == "pending" || order.status == "delivered")) {
                        console.log();

                        const div = document.createElement("div");
                        div.classList.add("order-content");

                        const image_div = document.createElement("div");
                        const details_left = document.createElement("div");
                        details_left.classList.add("left");
                        const details_right = document.createElement("div");
                        details_right.classList.add("right");

                        const image = document.createElement("img");
                        const product_name = document.createElement("span");
                        const product_price = document.createElement("span");
                        const items = document.createElement("span");
                        const anime = document.createElement("span");
                        const total = document.createElement("span");
                        const mode = document.createElement("span");
                        const status = document.createElement("span");
                        const date = document.createElement("span");

                        image.src = order.image;
                        product_name.textContent = order.product_name;
                        product_price.textContent = "Price: ₱ " + order.price;
                        items.textContent = "Items: " + order.number_of_items;
                        anime.textContent = order.anime;
                        total.textContent = "Total: ₱ " + order.total;
                        date.textContent = "Date Ordered : " + order.date_ordered;
                        
                        if(order.paid == "yes"){
                            mode.textContent = "Payment Mode : GCash";
                        }
                        else{
                            mode.textContent = "Payment Mode : COD";
                        }

                        if(order.status == "pending"){
                            status.textContent = "Status: Pending";
                        }
                        else{
                            status.textContent = "Status: Complete";
                        }

                        image_div.appendChild(image);
                        details_left.appendChild(product_name);
                        details_left.appendChild(anime);
                        details_left.appendChild(product_price);
                        details_left.appendChild(items);
                        details_right.appendChild(total);
                        details_right.appendChild(status);
                        details_right.appendChild(mode);
                        details_right.appendChild(date);

                        div.appendChild(image_div);
                        div.appendChild(details_left);
                        div.appendChild(details_right);

                        dom.appendChild(div);
                    }
                });
            } else {
                console.error("Error occurred while processing the request. HTTP status:", xhr.status);
            }
        }
    };

    xhr.send();
}
