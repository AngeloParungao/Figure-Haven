<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/user_profile.css">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <title>profile</title>
</head>
<body>
<?php include '../components/navbar.php'?>
<div class="content">
        <!-- Account -->
        <div class="account-container">
            <div class="account">
                <div class="account-details">
                    <h1>Account Details</h1>
                    <div class="center">
                        <div class="details">
                            <div class="detail">
                                <span class="label">Name</span>
                                <input type=text" id="name" />
                            </div>
                            <div class="detail">
                                <span class="label">Username</span>
                                <input type="text" id="username" />
                            </div>
                            <div class="detail">
                                <span class="label">Email</span>
                                <input type="email" id="email" />
                            </div>
                            <div class="detail">
                                <span class="label">Contact Number</span>
                                <input type="phone" id="contact" />
                            </div>
                            <div class="detail">
                                <span class="label">Address</span>
                                <input type="address" id="address" />
                            </div>
                        </div>
                        <div class="display-picture">
                            <img id="pfp-preview">
                            <label for="pfp-input">Choose File</label>
                            <input type="file" id="pfp-input" accept="image/*">
                        </div>
                    </div>
                    <button id="update-btn">Save</button>
                </div>
            </div>
        </div>
    </div>
    </div>

    <?php include '../components/footer.php'?>

    <script src="../js/user_profile.js"></script>

</body>
</html>