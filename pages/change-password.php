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
            margin-left: 31rem;
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
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" id="password" required>
        <label for="confirm_password">Confirm Password</label>
        <input type="password" name="confirm_password" placeholder="Confirm Password" id="confirm_password" required>
        <button onclick="changePass()">Save</button>
        <div class="notifications"></div>
    </div>
    <script>
        function changePass() {
            let password = document.getElementById("password").value;
            let confirm_password = document.getElementById("confirm_password").value;
            let userId = "<?php echo isset($_GET['id']) ? $_GET['id'] : ''; ?>";

            if (password.trim() === "" || confirm_password.trim() === "") {
                createToast("error", "fa-solid fa-xmark", "Error", "Complete Credentials");
            } else if (password !== confirm_password) {
                createToast("warning", "fa-solid fa-triangle-exclamation", "Warning", "Passwords do not match");
            } else {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "../backend/change-pass.php", true);

                xhr.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        // Handle response from the backend
                        console.log(xhr.responseText);
                        if (xhr.responseText.trim() === "success") {
                             createToast("success", "fa-solid fa-circle-check", "Success", "Successfully Updated!");
                            
                             setTimeout(() => {
                                    window.open(`login.php`, "_self");
                                }, 2000);
                        } else {
                            // Display error toast in parent window
                            createToast("error", "fa-solid fa-xmark", "Error", "Password change failed. Please try again.");
                        }
                    }
                };

                let formData = new FormData();
                formData.append('password', password);
                formData.append('userId', userId);

                xhr.send(formData);
            }
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

