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
                <span id="username"></span>
                <span id="address"></span>
            </div>
        </div>
        <div class="product_section">
            <img id="image" src="" alt="">
            <div>
                <span id="product"></span>
                <span id="anime"></span>
                <span id="price"></span>
                <span id="items"></span>
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
                    <span id="merchandise"></span>
                    <span id="shipping"></span>
                    <h4 id="total"></h4>
                </div>
            </div>
        </div>
        <button id="checkout">Place Order</button>
    </div>
    <script src="../js/checkout.js"></script>
</body>
</html>