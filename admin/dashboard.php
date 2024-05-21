<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Dashboard</title>
</head>
<body>
    <?php include '../components/admin-sidebar.php'?>;
    <div class="dashboard-wrapper">
        <div class="dashboard">
            <span>Dashboard</span>
            <div class="date-selectors">
                <label for="month">Month:</label>
                <select id="month"></select>

                <label for="day">Day:</label>
                <select id="day"></select>

                <label for="year">Year:</label>
                <select id="year"></select>

                <button id="generate-monthly-report">Generate Monthly Report</button>
                <button id="generate-daily-report">Generate Daily Report</button>
            </div>
            
            <div class="box-container">
                <div class="box">
                    <span>Total Accounts</span>
                    <span id="account"></span>
                </div>
                <div class="box">
                    <span>Order this Month</span>
                    <span id="orders"></span>
                </div>
                <div class="box">
                    <span>Sales this month</span>
                    <span id="sales"></span>
                </div>
                <div class="box">
                    <span>Sales this Day</span>
                    <span id="today-sales"></span>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/admin-dashboard.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.20/jspdf.plugin.autotable.min.js"></script>
</body>
</html>