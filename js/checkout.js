let checkout = document.getElementById("checkout");
let number, cartId;

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
                let total = parseInt(product.shipping_fee) + parseInt(product.total);
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
                }
            });
        }
    };
    xhr.open("GET", "http://localhost/action-figure/backend/cart.php", true);
    xhr.send();
}

checkout.addEventListener("click", function(){
    let mode = document.getElementsByName("payment");
    for (i = 0; i < mode.length; i++) {
        if (mode[i].checked && mode[i].value === "gcash"){
            // Calculate the left position to center the window horizontally
            const leftPosition = (window.innerWidth - 500) / 2; // Assuming a width of 400 pixels for the popup window
            // Calculate the top position to center the window vertically
            const topPosition = (window.innerHeight - 550) / 2; // Assuming a height of 300 pixels for the popup window

            // Open the popup window with both vertical and horizontal centering
            window.open("http://localhost/action-figure/components/online_payment.php?number=" + number + "&id=" + cartId , "Popup", "width=500,height=550,top=" + topPosition + ",left=" + leftPosition + ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no,status=no");


        }
        else if(mode[i].checked && mode[i].value === "cod"){
                alert("cod");
        }
    }
});
