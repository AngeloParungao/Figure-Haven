<?php

include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "POST") {
    $product_name = $_POST['product_name'];
    $userID = $_POST['userID'];

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM cart WHERE user_id = ? AND product_name = ?");
    $stmt->bind_param("is", $userID, $product_name);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    // Return result
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
