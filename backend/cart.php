<?php

include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $product_name = $_POST['product_name'];
        $product_anime = $_POST['product_anime'];
        $product_image = $_POST['image'];
        $userID = $_POST['userID'];
        $name = $_POST['name'];
        $contact = $_POST['contact'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        $username = $_POST['username'];
        $product_price = $_POST['price'];
        $items = $_POST['items'];
        $shipping = $_POST['shipping'];
        $total = $_POST['total'];
        $paid = $_POST['paid'];
        $status = $_POST['status'];

        if($_POST["cart"] == false){
            $xml = simplexml_load_file('../figures.xml');

            // Find the product in the XML data and update its stock and sales
            foreach ($xml->figure as $figure) {
                if ($figure->name == $product_name) {
                    $figure->stock = (int)$figure->stock - (int)$items;
                    $figure->sales = (int)$figure->sales + (int)$items;
                    break;
                }
            }

            // Save the updated XML content back to the file
            $xml->asXML('../figures.xml');
        }

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO cart (user_id, product_name, anime, image, name, contact_number, email, address, username, price, number_of_items, shipping_fee, total, online_payment, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssssssssidiss", $userID, $product_name, $product_anime, $product_image, $name, $contact, $email, $address, $username, $product_price, $items, $shipping, $total, $paid, $status);

        // Execute SQL statement
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
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
    case "PUT":
        parse_str(file_get_contents("php://input"), $_PUT);
        $productId = $_PUT['product_id'];
        $status = $_PUT['status'];
        $product_name = $_PUT['product_name'];
        $items = $_PUT['items'];
        $paid = $_PUT['paid'];
        $total = $_PUT['total'];

        $xml = simplexml_load_file('../figures.xml');

        // Find the product in the XML data and update its stock and sales
        foreach ($xml->figure as $figure) {
            if ($figure->name == $product_name) {
                $figure->stock = (int)$figure->stock - (int)$items;
                $figure->sales = (int)$figure->sales + (int)$items;
                break;
            }
        }

        // Save the updated XML content back to the file
        $xml->asXML('../figures.xml');

        $stmt = $conn->prepare("UPDATE cart SET total =?, online_payment = ?,status = ? WHERE cart_id = ?");
        $stmt->bind_param("issi", $total, $paid, $status, $productId);

        // Execute SQL statement
        if ($stmt->execute()) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $stmt->error;
        }
        $stmt->close();
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
        $stmt = $conn->prepare("DELETE FROM cart WHERE cart_id = ?");
        $stmt->bind_param("i", $productId);

        // Execute SQL statement
        if ($stmt->execute()) {
            echo "Record deleted successfully";
        } else {
            echo "Error deleting record: " . $stmt->error;
        }
        $stmt->close();
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
