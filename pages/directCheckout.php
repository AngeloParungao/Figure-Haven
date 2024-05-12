<?php
    $product_name = $_GET['product_name'];
    $product_anime = $_GET['product_anime'];
    $product_image = $_GET['image'];
    $userID = $_GET['userID'];
    $name = $_GET['name'];
    $contact = $_GET['contact'];
    $email = $_GET['email'];
    $address = $_GET['address'];
    $username = $_GET['username'];
    $product_price = $_GET['price'];
    $items = $_GET['items'];
    $shipping = $_GET['shipping'];
    $total = $_GET['total'];
    $status = $_GET['status'];

    $final_total = (int)$total + (int)$shipping;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/checkout.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Place Order</title>
</head>
<body>
<?php include '../components/navbar.php'?>
    <div class="wrapper">
        <div class="address_section">
            <div>
                <i class="fa-solid fa-location-dot"></i>
                <h3>Delivery Address</h3>
            </div>
            <div>
                <span id="username"><?php echo $name?></span>
                <span id="address"><?php echo $address?></span>
            </div>
        </div>
        <div class="product_section">
            <img id="image" src="<?php echo $product_image?>" alt="">
            <div>
                <span id="product"><?php echo $product_name?></span>
                <span id="anime"><?php echo $product_anime?></span>
                <span id="price">Original Price: ₱ <?php echo $product_price?></span>
                <span id="items">Items: <?php echo $items?></span>
            </div>
        </div>
        <div class="payment_option">
            <div id="option">
                <i class="fa-solid fa-peso-sign"></i>
                <h3>Payment Option</h3>
            </div>
            <div class="mode">
                <div id="cod">
                    <input type="radio" id="cod" name="payment" value="cod">
                    <label for="cod">Cash on Delivery (COD)</label><br>
                </div>
                <div id="online">
                    <input type="radio" id="gcash" name="payment" value="gcash">
                    <label for="gcash">GCash</label><br>
                </div>
            </div>
        </div>
        <div class="payment_details">
            <div id="payment">
                <i class="fa-solid fa-circle-info"></i>
                <h3>Payment Details</h3>
            </div>
            <div>
                <div class="total_desc">
                    <span>Merchandise Subtotal:</span>
                    <span>Shipping Fee</span>
                    <h4>TOTAL:</h4>
                </div>
                <div class="total">
                    <span id="merchandise">₱ <?php echo $total?></span>
                    <span id="shipping">₱ <?php echo $shipping?></span>
                    <h4 id="total">₱ <?php echo $final_total?></h4>
                </div>
            </div>
        </div>
        <button id="directCheckout">Place Order</button>
    </div>
    <script>
        document.getElementById('directCheckout').onclick = function(){
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
        let userID = localStorage.getItem('userID') || '';
        let name = localStorage.getItem('name') || '';
        let contact = localStorage.getItem('contact') || '';
        let email = localStorage.getItem('email') || '';
        let address = localStorage.getItem('address') || '';
        let username = localStorage.getItem('username') || '';
        let items_number = "<?php echo $items?>";
        let total_price = "<?php echo $final_total?>"; 
        let product_name = "<?php echo $product_name?>";
        let product_anime = "<?php echo $product_anime?>";
        let product_image = "<?php echo $product_image?>";
        let product_price = "<?php echo $product_price?>";
        let status = "<?php echo $status?>"; 


        const leftPosition = (window.innerWidth - 500) / 2; // Assuming a width of 400 pixels for the popup window
        // Calculate the top position to center the window vertically
        const topPosition = (window.innerHeight - 550) / 2; // Assuming a height of 300 pixels for the popup window

        // Open the popup window with both vertical and horizontal centering
        window.open("http://localhost/action-figure/components/direct_online_payment.php?product_name=" + product_name + "&product_anime=" + product_anime + "&image=" + product_image + "&price=" + product_price + "&userID=" + userID + "&name=" + name + "&contact=" + contact + "&email=" + email + "&address=" + address + "&username=" + username + "&items=" + items_number + "&shipping= 40"  + "&total=" + total_price + "&status=" + status, "Popup", "width=500,height=550,top=" + topPosition + ",left=" + leftPosition + ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=no,status=no");
    }
    else if(selectedMode === "cod"){
        let userID = localStorage.getItem('userID') || '';
        let name = localStorage.getItem('name') || '';
        let contact = localStorage.getItem('contact') || '';
        let email = localStorage.getItem('email') || '';
        let address = localStorage.getItem('address') || '';
        let username = localStorage.getItem('username') || '';
        let items_number = "<?php echo $items?>";
        let total_price = "<?php echo $final_total?>"; 
        let product_name = "<?php echo $product_name?>";
        let product_anime = "<?php echo $product_anime?>";
        let product_image = "<?php echo $product_image?>";
        let product_price = "<?php echo $product_price?>";
        let status = "<?php echo $status?>"; 
        
        // Create and send XMLHttpRequest
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText); // Log the response
                    // Reload the parent window or handle success scenario
                    window.open("http://localhost/action-figure/pages/products.php?anime=all","_self");
                } else {
                    // Handle error scenario
                    console.error("Error: " + xhr.status);
                }
            }
        };
        xhr.open("POST", "http://localhost/action-figure/backend/cart.php", true);
        // Set appropriate headers if needed
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // Send the request with data
        xhr.send("product_name=" + encodeURIComponent(product_name) + "&product_anime=" + encodeURIComponent(product_anime) + "&image=" + encodeURIComponent(product_image) + "&price=" + encodeURIComponent(product_price) + "&userID=" + encodeURIComponent(userID) + "&name=" + encodeURIComponent(name) + "&contact=" + encodeURIComponent(contact) + "&email=" + encodeURIComponent(email) + "&address=" + encodeURIComponent(address) + "&username=" + encodeURIComponent(username) + "&items=" + encodeURIComponent(items_number) + "&shipping=40"  + "&total=" + encodeURIComponent(total_price) + "&status=" + encodeURIComponent(status));
    }
    else{
        alert("Please choose a payment mode");
    }
}

    </script>
</body>
</html>