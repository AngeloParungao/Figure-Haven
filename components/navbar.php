<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost/action-figure/css/navbar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <div class="navbar">
        <div class="bar black">
            <div id="logo">
                <img src="http://localhost/action-figure/images/logo.png" alt=""/>
                <h5>FigureHaven</h5>
            </div>
            <div class="links">
                <div id="anchors">
                    <a class="link" href="#">Home</a>
                    <a class="link" href="#">Catalog</a>
                    <a class="link" href="#">About Us</a>
                    <a class="link" href="#">FAQs</a>
                </div>
                <div>
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div id="nav-profile">
                    <span>
                        <a id="logged-out" class="link" href="http://localhost/action-figure/pages/login.php">Login</a>
                    </span>
                    <span>
                        <a id="logged-in" href=""></a>
                    </span>
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
        </div>    
    </div> 
</body>
<script>
    //Set userID in the navbar
    let userID = localStorage.getItem('userID') || '';
    let username = localStorage.getItem('username') || '';

    if(userID !== ''){
        document.getElementById('logged-in').style.display = 'block';
        document.getElementById('logged-out').style.display = 'none';
        document.getElementById('logged-in').innerHTML = username;
    }
    else{
        document.getElementById('logged-in').style.display = 'none';
        document.getElementById('logged-out').style.display = 'block';
    }
</script>
</html>
