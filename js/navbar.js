let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/action-figure/backend/cart.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let cart = JSON.parse(xhr.responseText);
            let count = 0; // Initialize count variable

            // Loop through the cart array to count items
            let cartContent = document.getElementById("cart-content");

            // Loop through the cart array to count items and populate cart content
            cart.forEach(function(item) {
                if (item.user_id == userID) {
                    count++; // Increment count for each item in the cart matching the user ID
                    
                    // Create elements for the cart item
                    let div = document.createElement("div");
                    div.classList.add("content");
                    let details = document.createElement("div")
                    details.classList.add("details");
                    let buttons = document.createElement("div");
                    buttons.classList.add("buttons")
                    let image = document.createElement("img");
                    let product_name = document.createElement("span");
                    let product_price = document.createElement("span");
                    let items = document.createElement("span");
                    let total = document.createElement("span");
                    let placeOrder = document.createElement("button");
                    let deleteCart = document.createElement("button");
                    
                    
                    // Set text content for the cart item
                    image.src = item.image;
                    product_name.textContent = item.product_name;
                    product_price.textContent = "₱ " + item.price;
                    items.textContent = "Items: " + item.number_of_items;
                    total.textContent = "Total: ₱ " + item.total;
                    deleteCart.innerHTML = "<i class='fa-solid fa-xmark'></i>";
                    placeOrder.textContent = "Place Order"


                    // Append the product name to the cart item container
                    div.appendChild(image);
                    details.appendChild(product_name);
                    details.appendChild(product_price);
                    details.appendChild(items);
                    details.appendChild(total);
                    buttons.appendChild(deleteCart);
                    buttons.appendChild(placeOrder);


                    // Append the cart item to the cart content container
                    div.appendChild(details);
                    div.appendChild(buttons);
                    cartContent.appendChild(div);

                    deleteCart.onclick = function(){
                        var productId = item.cart_id; // Replace 123 with the actual product ID you want to delete

                        var xhr = new XMLHttpRequest();
                        xhr.open("DELETE", "http://localhost/action-figure/backend/cart.php", true);
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                // Handle successful deletion
                                console.log(xhr.responseText);
                                window.location.reload();
                            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                                // Handle error
                                console.error("Error deleting record:", xhr.responseText);
                            }
                        };
                        xhr.send("product_id=" + productId);
                    }
                }
            });

            // Update the cart count display
            document.getElementById('cart').textContent = count;
            if(count != 0){
                document.getElementById('total-cart').style .visibility = "visible";

            }

        }
    };
    xhr.send();



    //Set userID in the navbar
    let userID = localStorage.getItem('userID') || '';
    let username = localStorage.getItem('username') || '';
    let added = localStorage.getItem('addedUser');
    let login = localStorage.getItem('login');


    if(userID !== ''){
        document.getElementById('logged-in').style.display = 'block';
        document.getElementById('logged-out').style.display = 'none';
        document.getElementById('logged-in').innerHTML = username;
    }
    else{
        document.getElementById('logged-in').style.display = 'none';
        document.getElementById('logged-out').style.display = 'block';
    }

    if(added == "true"){
        createToast("success", "fa-solid fa-circle-check", "Success", "Successful!");
        localStorage.removeItem('addedUser');
    }

    if(login == "true"){
        createToast("success", "fa-solid fa-circle-check", "Success", "successful!");
        localStorage.removeItem('login');
    }

    function product(){
        window.location.href = 'http://localhost/action-figure/pages/products.php?anime=all';
    }



    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            document.querySelector(".navbar").classList.add("scrolled");
            document.querySelectorAll(".links > #anchors > .link").forEach(function(item) {
            item.style.color = 'black';
            });
            document.querySelector(".bar").classList.remove("black");
            document.querySelector(".bar").classList.add("white");
            document.querySelector("#logo > h5").classList.add("font-change");
            document.querySelector(".links > div > i").style.color = "black";
            document.querySelector("#logged-out").style.color = "black";
            document.querySelector("#logged-in").style.color = "black";
            document.querySelector("#nav-profile > i").style.color = "black";
        } else {
            document.querySelector(".navbar").classList.remove("scrolled");
            document.querySelectorAll(".links > #anchors > .link").forEach(function(item) {
            item.style.color = 'white';
            });
            document.querySelector(".bar").classList.add("black");
            document.querySelector("#logo > h5").classList.remove("font-change");
            document.querySelector(".links > div > i").style.color = "white";
            document.querySelector("#logged-out").style.color = "white";
            document.querySelector("#logged-in").style.color = "white";
            document.querySelector("#nav-profile > i").style.color = "white";
        }
    };



        var cartIcon = document.getElementById("cart-icon");
        if (cartIcon) {
            cartIcon.addEventListener("click", function() {
                // Toggle the 'show' class of the cart container
                var cartContainer = document.querySelector(".cart-container");
                cartContainer.classList.toggle("show");
            });
        }

        function createToast(type, icon, title, text){
            let notifications = document.querySelector('.notifications');
            let newToast = document.createElement('div');
            newToast.innerHTML = `
                <div class="toast ${type}">
                    <i class="${icon}"></i>
                    <div class="content">
                        <div class="title">${title}</div>
                        <span>${text}</span>
                    </div>
                    <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
                </div>`;
            notifications.appendChild(newToast);
            newToast.timeOut = setTimeout(
                ()=>newToast.remove(), 5000);
        }