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
        const number = getNumberFromUrl();
        const id = getCartFromUrl();
        let productName = "<?php echo $_GET['product_name']?>";
        let items = "<?php echo $_GET['items']?>";
        let total = "<?php echo $_GET['total']?>";


        document.getElementById("number").value = number;

        function getNumberFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('number');
        }

        function getCartFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('id');
        }



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
            xhr.open("PUT", "http://localhost/action-figure/backend/cart.php", true);
            xhr.send("product_id=" + id + "&status=pending" + "&product_name=" + productName + "&items=" + items + "&total=" + total);
        }
    </script>
</body>
</html>