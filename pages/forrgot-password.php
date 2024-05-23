<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <title>Forgot Password</title>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,700&display=swap');

        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: 'Poppins', serif;
        }
        .div{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            gap: 2rem;
            height: 100vh;
            width: 100vw;
            background-color: black;
        }

        .div input{
            margin-top: -1rem;
            padding: 0.5rem;
            border-radius: 0.4rem;
            width: 25%;
        }

        .div label{
            align-self: flex-start;
            padding-left: 31rem;
            color: white;
        }

        .div button{
            align-self: end;
            background-color: white;
            padding: 0.3rem 0.5rem;
            border-radius: 0.4rem;
            border: none;
            margin-right: 31rem;

            cursor: pointer;
        }
    </style>
</head>
<body>
    <?php include '../components/navbar.php'?>

    <div class="div">
        <label for="username">Username</label>
        <input type="text" name="username" placeholder="Username" id="username" readonly value="<?php echo isset($_GET['username']) ? htmlspecialchars($_GET['username']) : ''; ?>">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" id="email" readonly value="<?php echo isset($_GET['email']) ? htmlspecialchars($_GET['email']) : ''; ?>">
        <button onclick="sendCode()">Send Code</button>
    </div>
    <script>
        function sendCode(){
            let id = "<?php echo isset($_GET['id']) ? htmlspecialchars($_GET['id']) : ''; ?>";
            createToast("success", "fa-solid fa-circle-check", "Success", "Sent Successful!");


            setTimeout(() => {
                window.open(`change-password.php?id=${encodeURIComponent(id)}`, "_self");
            }, 2000);
        }

        function createToast(type, icon, title, text){
            let notifications = document.querySelector('.notifications');
            let newToast = document.createElement('div');
            newToast.innerHTML = `
                <div class="toast ${type}">
                    <i class="${icon}"></i>
                    <div class="content">
                        <div class="title">${title}</div>
                        <span>${text}</span>
                    </div>
                    <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
                </div>`;
            notifications.appendChild(newToast);
            newToast.timeOut = setTimeout(
                ()=>newToast.remove(), 5000
            )
        }
    </script>
</body>
</html>
