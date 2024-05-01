<?php

include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $product_name = $_POST['product_name'];
        $product_image = $_POST['image'];
        $userID = $_POST['userID'];
        $name = $_POST['name'];
        $contact = $_POST['contact'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $username = $_POST['username'];
        $product_price = $_POST['price'];
        $items = $_POST['items'];
        $total = $_POST['total'];
        $status = $_POST['status'];

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare SQL statement
        $sql = "INSERT INTO cart (user_id, product_name, `image`, `name`, contact_number, email, `address`, username, price, number_of_items, total, `status`)
                VALUES ('$userID', '$product_name', '$product_image', '$name', '$contact', '$email', '$address', '$username', '$product_price', '$items', '$total', '$status')";

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
    case "DELETE":
        // Extract the product ID from the request
        parse_str(file_get_contents("php://input"), $_DELETE);
        $productId = $_DELETE['product_id']; // Assuming you send the product ID in the request
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare SQL statement
        $sql = "DELETE FROM cart WHERE cart_id = $productId";

        // Execute SQL statement
        if ($conn->query($sql) === TRUE) {
            echo "Record deleted successfully";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
}

?>