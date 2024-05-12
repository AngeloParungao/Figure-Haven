<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../images/logo.png" type="image/png">
  <link rel="stylesheet" href="../css/product_page.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <title>Products</title>
</head>
<body onload="loadProducts()">
  <?php include '../components/admin-sidebar.php'?>
  <div class="product-wrapper">
    <div class="product">
      <span>Products</span>
      <div id="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="product-search" placeholder="Search by product">
        </div>
      <div class="table">
      <div id="dropdown">
            <select id="category">
                <option value="All">All</option>
                <option value="Resin">Resin</option>
                <option value="Funko Pop">Funko Pop</option>
                <option value="PVC">PVC</option>
            </select>
            <select id="order">
                <option value="descending">Descending</option>
                <option value="ascending">Ascending</option>
            </select>
        </div>
        <table id="product-table">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Anime</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sales</th>
            <th>Stock</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <script src="../js/product_page.js"></script>
</body>
</html>