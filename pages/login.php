<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login/Sign-up</title>
    <link rel="stylesheet" href="../css/login.css">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="../js/script.js"></script>
</head>
<body>
        <?php include '../components/navbar.php'?>

        <div id="video-background">
            <video src="../video/Enemy「AMV」Anime Mix.mp4" autoplay muted></video>
        </div>

        <div id="wrapper">
            <div class="form-container">
                <div id="login-form">
                    <span>LOGIN</span>
                    <form action="" method="GET" id="userForm">
                        <input type="text" name="username" placeholder="Username" id="username" required>
                        <input type="password" name="password" placeholder="Password" id="password" required>
                        <button onclick="fetchUsers(event)">LOGIN</button>
                    </form>
                    <button id="create_account">Create Account</button>
                </div>
                <div id="register-form">
                    <span>SIGN-UP</span>
                    <form action="" method="POST" id="registerForm">
                        <input type="text" name="fullname" placeholder="Fullname" required>
                        <input type="text" name="address" placeholder="Address" required>
                        <input type="email" name="email" placeholder="Email" required>
                        <input type="number" name="contact" placeholder="Contact Number" required>
                        <input type="text" name="username" placeholder="Username" required>
                        <input type="password" name="password" placeholder="Password" required>
                        <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                        <button onclick="addUser(event)">REGISTER</button>
                    </form>
                    <button id="login_account">Already have an account</button>
                </div>
            </div>
        </div>

        <script>
            document.getElementById("create_account").onclick = () => {
                document.getElementById("login-form").style.marginLeft = "-22rem";
            }
            document.getElementById("login_account").onclick = () => {
                document.getElementById("login-form").style.marginLeft = "0";
            }
        </script>
</body>
</html>