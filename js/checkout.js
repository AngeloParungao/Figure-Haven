let checkout = document.getElementById("checkout");
let number, cartId;
let items, productName, total;

const cart = getCartIdFromUrl();

if (cart) {
    getProduct(cart);
} else {
    console.error('cart id not found in URL');
}

function getCartIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('cart_id');
}

function getProduct(id) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let Products = JSON.parse(xhr.responseText);

            Products.forEach(product => {
                total = parseInt(product.shipping_fee) + parseInt(product.total);
                if (product.cart_id == id) {
                    document.getElementById("username").innerHTML = product.name;
                    document.getElementById("address").innerHTML = product.address;
                    document.getElementById("image").src = product.image;
                    document.getElementById("product").innerHTML = product.product_name;
                    document.getElementById("anime").innerHTML = product.anime;
                    document.getElementById("price").innerHTML = "Original Price: ₱ " + product.price;
                    document.getElementById("items").innerHTML = "Items: " + product.number_of_items;
                    document.getElementById("merchandise").innerHTML = "₱ " + product.total;
                    document.getElementById("shipping").innerHTML = "₱ " + product.shipping_fee;
                    document.getElementById("total").innerHTML = "₱ " + total;
                    number = product.contact_number;
                    cartId = product.cart_id;
                    items = product.number_of_items;
                    productName = product.product_name;
                }
            });
        }
    };
    xhr.open("GET", "http://localhost/action-figure/backend/cart.php", true);
    xhr.send();
}

checkout.addEventListener("click", function(){
    let modes = document.getElementsByName("payment");
    let selectedMode = null;

    // Loop through the NodeList to find the checked radio button
    for (let i = 0; i < modes.length; i++) {
        if (modes[i].checked) {
            selectedMode = modes[i].value;
            break;
        }
    }

    if (selectedMode === "gcash"){
        // Calculate the left position to center the window horizontally
        const leftPosition = (window.innerWidth - 500) / 2; // Assuming a width of 400 pixels for the popup window
        // Calculate the top position to center the window vertically
        const topPosition = (window.innerHeight - 550) / 2; // Assuming a height of 300 pixels for the popup window

        // Open the popup window with both vertical and horizontal centering
        window.open("http://localhost/action-figure/components/online_payment.php?number=" + number + "&id=" + cartId + "&product_name=" + productName + "&items=" + items + "&total=" + total, "Popup", "width=500,height=550,top=" + topPosition + ",left=" + leftPosition + ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no,status=no");
    }
    else if(selectedMode === "cod"){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText); // Log the response
                // Reload the parent window
                window.open("http://localhost/action-figure/pages/products.php?anime=all","_self");
            }
        };
        xhr.open("PUT", "http://localhost/action-figure/backend/cart.php", true);
        xhr.send("product_id=" + cartId + "&status=pending" + "&product_name=" + productName + "&items=" + items + "&total=" + total);
    }
    else{
        alert("Please choose a payment mode");
    }
});

