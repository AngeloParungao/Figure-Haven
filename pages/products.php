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
                    <span id="stock"></span>
                    <span id="price"></span>
                    <p id="description"></p>
                </div>
            </div>
            <div id="right">
                <img id="image" src="" alt="">
            </div>
        </div>  
    </section>
    <section id="product-section">
        <div  class="type">
            <span id="type"></span>
        </div>
        <div id="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="search" placeholder="Search">
        </div>

        <div id="dropdown">
            <span>Category: </span>
            <select id="category">
                <option value="All">All</option>
                <option value="Resin">Resin</option>
                <option value="Funko Pop">Funko Pop</option>
                <option value="PVC">PVC</option>
            </select>
            <span>Price:</span>
            <select id="order">
                <option value="descending">Descending</option>
                <option value="ascending">Ascending</option>
            </select>
        </div>
        <div class="product-container">
        </div>
    </section>


    <?php include '../components/footer.php'?>
</body>
</html>