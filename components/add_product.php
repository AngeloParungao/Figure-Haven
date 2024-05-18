<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/add_product.css">
    <title>Add Product</title>
</head>
<body>
    <div class="form-wrapper">
        <form id="productForm" action="http://localhost/action-figure/backend/CRUDS_products.php" method="POST" enctype="multipart/form-data">
            <div class="content">
                <label for="ProductImage">Image</label>
                <input type="file" name="productImage" id="ProductImage">
            </div>
            <div class="content">
                <label for="product_name">Product Name</label>
                <input id="product_name" type="text" name="productName" placeholder="Product Name" required>
            </div>
            <div class="content">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="Resin">Resin</option>
                    <option value="Funko Pop">Funko Pop</option>
                    <option value="PVC">PVC</option>
                </select>
            </div>
            <div class="content">
                <label for="anime">Anime</label>
                <select id="anime" name="anime" required>
                    <!-- Add options dynamically from XML using JavaScript -->
                </select>
            </div>
            <div class="content">
                <label for="price">Price</label>
                <input id="price" name="price" type="number" placeholder="Price" required>
            </div>
            <div class="content">
                <label for="stock">Stock</label>
                <input id="stock" name="stock" type="number" placeholder="Stock" required>
            </div>
            <div class="content">
                <label for="description">Description</label>
                <textarea id="description" name="description" placeholder="Description" required></textarea>
            </div>
            <button type="submit">Add Product</button>
        </form>
    </div>
    <script>
        let animeSelect = document.getElementById("anime");

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "../Catalog.xml", true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let xmlDoc = xhr.responseXML;
                let animeNodes = xmlDoc.getElementsByTagName("name");
                let animeSet = new Set();
                for (let i = 0; i < animeNodes.length; i++) {
                    let animeName = animeNodes[i].textContent;
                    if (!animeSet.has(animeName)) {
                        animeSet.add(animeName);
                        let option = document.createElement("option");
                        option.text = animeName;
                        animeSelect.add(option);
                    }
                }
            }
        };
        xhr.send();

    </script>
</body>
</html>
