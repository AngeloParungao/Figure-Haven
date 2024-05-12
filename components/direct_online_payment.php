<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <title>Payment</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,700&display=swap');
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 2rem;
            height: 100vh;
            font-family: 'Poppins', serif;
        }

        img{
            width: 15rem;
        }

        input{
            height: 2rem;
            width: 20rem;
            padding: 1rem 6rem;
            font-size: 1.2rem;
            font-weight: 600;
        }
        button{
            width: 20rem;
            padding: 0.5rem;
            font-size: 1.2rem;
            border: none;
            color: white;
            background-color: blue;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <img src="../images/image.png" alt="">
    <h2>Confirm Number</h2>
    <input id="number" readonly>
    <button onclick="proceed()">Proceed</button>

    <script>
        
        let product_name = "<?php echo $_GET['product_name']?>";
        let product_anime = "<?php echo $_GET['product_anime']?>";
        let product_image = "<?php echo $_GET['image']?>";
        let userID = "<?php echo $_GET['userID']?>";
        let name = "<?php echo $_GET['name']?>";
        let contact = "<?php echo $_GET['contact']?>";
        let email = "<?php echo $_GET['email']?>";
        let address = "<?php echo $_GET['address']?>";
        let username = "<?php echo $_GET['username']?>";
        let product_price = "<?php echo $_GET['price']?>";
        let items = "<?php echo $_GET['items']?>";
        let shipping = "<?php echo $_GET['shipping']?>";
        let total = "<?php echo $_GET['total']?>";
        let status = "<?php echo $_GET['status']?>";

        document.getElementById("number").value = contact;



        function proceed(){
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText); // Log the response
                    window.close();
                    // Reload the parent window
                    window.opener.location.href = "http://localhost/action-figure/pages/products.php?anime=all";
                }
            };
            xhr.open("POST", "http://localhost/action-figure/backend/cart.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("product_name=" + product_name + "&product_anime=" + product_anime + "&image=" + product_image + "&price=" + product_price + "&userID=" + userID + "&name=" + name + "&contact=" + contact + "&email=" + email + "&address=" + address + "&username=" + username + "&items=" + items + "&shipping= 40"  + "&total=" + total + "&status=" + status);
        }
    </script>
</body>
</html>