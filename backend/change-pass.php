<?php
// change-pass.php

include_once 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["password"], $_POST["userId"])) {
        $password = $_POST["password"];
        $id = $_POST["userId"];

        $stmt = $conn->prepare("UPDATE users SET password=? WHERE id=?");
        $stmt->bind_param("si", $password, $id);

        if ($stmt->execute()) {
            echo "success";
        } else {
            echo "Error updating password: " . $conn->error;
        }
    } else {
        echo "Required parameters are missing.";
    }
} else {
    echo "Invalid request method.";
}
?>
