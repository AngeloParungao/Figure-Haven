<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/product.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="../js/products.js"></script>
    <title>Product</title>
</head>
<body>
    <?php include '../components/navbar.php'?>   
    
    <section id="product-clicked">
        <div class="product">
            <div id="left">
                <div id="details">
                    <span id="name"></span>
                    <span id="anime"></span>
                    <span id="price"></span>
                    <p id="description"></p>
                </div>
                <button id="addToCart">Add to Cart</button>
                <button id="buyNow">Buy Now</button>
            </div>
            <div id="right">
                <img id="image" src="" alt="">
            </div>
        </div>  
    </section>
    <section id="product-section">
        <div id="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="search" placeholder="Search">
        </div>
        <div class="product-container">
        </div>
    </section>


    <?php include '../components/footer.php'?>
</body>
</html>