<?php

include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $product_name = $_POST['product_name'];
        $userID = $_POST['userID'];
        $name = $_POST['name'];
        $contact = $_POST['contact'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $username = $_POST['username'];
        $items = $_POST['items'];
        $total = $_POST['total'];
        $status = $_POST['status'];

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare SQL statement
        $sql = "INSERT INTO cart (user_id, product_name, `name`, contact_number, email, `address`, username, number_of_items, total, `status`)
                VALUES ('$userID', '$product_name', '$name', '$contact', '$email', '$address', '$username', '$items', '$total', '$status')";

        // Execute SQL statement
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        break;
    case "GET":
        $sql = "SELECT * FROM cart";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $users = array();
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        } else {
            echo json_encode(["message" => "No users found"]);
        }
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
}

?>