<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../images/logo.png" type="image/png">
  <link rel="stylesheet" href="../css/account_page.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <title>User Orders</title>
</head>
<body onload="getUsers()">
  <?php include '../components/admin-sidebar.php'?>
  <div class="account-user-wrapper">
    <div class="accounts">
      <div class="product">
        <div>
          <img src="<?php echo $_GET['image'];?>" alt="">
        </div>
        <div class="details">
          <span><?php echo $_GET['product_name'];?></span>
          <span><?php echo $_GET['product_anime'];?></span>
          <span>₱ <?php echo $_GET['product_price'];?></span>
        </div>
      </div>
      <div class="table">
        <table>
          <tr>
            <th>Username</th>
            <th>Full name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <script src="../js/user_orders_page.js"></script>
</body>
</html>