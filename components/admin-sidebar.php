<link rel="stylesheet" href="http://localhost/action-figure/css/admin-sidebar.css">
<div class="dashboard-container">
  <div class="admin">
    <img src="../images/logo.png" alt="">
    <span class="admin-text">Admin</span>
  </div>
  <hr>
  <div class="dashboard-buttons">
    <div class="dashboard-button">
      <a href="dashboard.php" data-page="dashboard">
        <i class="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </a>
    </div>
    <div class="dashboard-button">
      <a href="account_page.php" data-page="users">
        <i class="fas fa-users"></i>
        <span>Users</span>
      </a>
    </div>
    <div class="dashboard-button">
      <a href="product_page.php" data-page="products">
        <i class="fa-solid fa-list"></i>
        <span>Products</span>
      </a>
    </div>
    <div class="dashboard-button">
      <a href="orders_page.php" data-page="orders">
        <i class="fas fa-shopping-cart"></i>
        <span>Orders</span>
      </a>
    </div>
    <div class="dashboard-button">
      <a href="history.php" data-page="history">
        <i class="fa-solid fa-clock-rotate-left"></i>
        <span>History</span>
      </a>
    </div>
    <div class="dashboard-button">
      <a href="../pages/login.php" data-page="logout">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Logout</span>
      </a>
    </div>
  </div>
</div>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.dashboard-button a');
    const currentPage = localStorage.getItem('activePage') || 'dashboard';

    buttons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-page') === currentPage) {
        button.classList.add('active');
      }

      button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        localStorage.setItem('activePage', button.getAttribute('data-page'));
      });
    });
  });
</script>