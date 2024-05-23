<?php

include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") {
    $product_name = $_POST['product_name'];
    $userID = $_POST['userID'];
    $status = "cart";

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM cart WHERE user_id = ? AND product_name = ? AND status = ?");
    $stmt->bind_param("iss", $userID, $product_name, $status);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        echo json_encode(["exists" => true]);
    } else {
        echo json_encode(["exists" => false]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
