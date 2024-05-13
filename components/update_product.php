<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form id="productForm" enctype="multipart/form-data">
        <input type="file" id="productImage" name="productImage">
        <input id="product_name" type="text" name="productName" placeholder="Product Name" required>
        <select id="category" name="category" required>
            <option value="Resin">Resin</option>
            <option value="Funko Pop">Funko Pop</option>
            <option value="PVC">PVC</option>
        </select>
        <select id="anime" name="anime" required>
            <!-- Add options dynamically from XML using JavaScript -->
        </select>
        <input id="price" name="price" type="number" placeholder="Price" required>
        <input id="stock" name="stock" type="number" placeholder="Stock" required>
        <textarea id="description" name="description" placeholder="Description"></textarea>
        <input type="hidden" name="_method" value="PUT"> <!-- Add this hidden field -->
        <button type="button" onclick="updateProduct()">Update Product</button>
    </form>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Retrieve data from URL parameters
            <?php
                $product_name = isset($_GET['product_name']) ? $_GET['product_name'] : '';
                $product_anime = isset($_GET['product_anime']) ? $_GET['product_anime'] : '';
                $product_price = isset($_GET['price']) ? str_replace('₱ ', '', $_GET['price']) : '';
                $product_category = isset($_GET['category']) ? $_GET['category'] : '';
                $product_stock = isset($_GET['stock']) ? $_GET['stock'] : '';
                $product_description = isset($_GET['description']) ? $_GET['description'] : '';

                // Handle special characters in description
                $product_description = htmlspecialchars($product_description, ENT_QUOTES, 'UTF-8');
            ?>

            document.getElementById("product_name").value = "<?php echo $product_name; ?>";
            document.getElementById("price").value = "<?php echo $product_price; ?>";
            document.getElementById("stock").value = "<?php echo $product_stock; ?>";
            document.getElementById("description").innerHTML = "<?php echo $product_description; ?>";

            // Fetch anime options dynamically from XML
            let animeSelect = document.getElementById("anime");
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    console.log("XML data fetched successfully");
                    let xmlDoc = xhr.responseXML;
                    let animeNodes = xmlDoc.getElementsByTagName("name");
                    for (let i = 0; i < animeNodes.length; i++) {
                        let animeName = animeNodes[i].textContent;
                        let option = document.createElement("option");
                        option.text = animeName;
                        animeSelect.add(option);
                    }
                    // Select the correct option in the anime dropdown
                    for (let i = 0; i < animeSelect.options.length; i++) {
                        if (animeSelect.options[i].value === "<?php echo $product_anime; ?>") {
                            animeSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            };
            xhr.open("GET", "../Catalog.xml", true);
            xhr.send();


            // Select the correct option in the category dropdown
            let categorySelect = document.getElementById("category");
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].value === "<?php echo $product_category; ?>") {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }
        });

        function updateProduct() {
            let formData = new FormData(document.getElementById("productForm"));

            console.log(formData);
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        alert("Product updated successfully.");
                        window.close();
                        window.opener.location.reload();
                    } else {
                        alert("Failed to update product. Please try again later.");
                    }
                }
            };
            xhr.open("POST", "http://localhost/action-figure/backend/CRUDS_products.php", true);
            xhr.send(formData);
        }
    </script>
</body>
</html>
