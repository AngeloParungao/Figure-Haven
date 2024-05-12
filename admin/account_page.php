<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../images/logo.png" type="image/png">
  <link rel="stylesheet" href="../css/account_page.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <title>User Accounts</title>
</head>
<body onload="getUsers()">
  <?php include '../components/admin-sidebar.php'?>
  <div class="account-user-wrapper">
    <div class="accounts">
      <span>Accounts</span>
      <div id="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="username-search" placeholder="Search by Username">
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
  <script src="../js/account_page.js"></script>
</body>
</html>