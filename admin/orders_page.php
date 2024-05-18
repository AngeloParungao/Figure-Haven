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
<body onload="loadOrders()">
  <?php include '../components/admin-sidebar.php'?>
  <div class="product-wrapper">
    <div class="product">
      <span>Orders</span>
      <div id="search-bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="product-search" placeholder="Search by product">
      </div>
      <div id="dropdown">
        <span>Price:</span>
        <select id="order">
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
        </select>
      </div>
      <div class="table">
        <table id="order-table">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Anime</th>
            <th>Price</th>
            <th>Category</th>
            <th>Orders</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <script src="../js/order_page.js"></script>
</body>
</html>
