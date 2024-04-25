<?php
include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $fullname = $_POST['fullname'];
        $address = $_POST['address'];
        $email = $_POST['email'];
        $contact = $_POST['contact'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $account_type = "user";

        // You can remove the following line if you're not actually converting $contact to an integer
        $contact = (int)$contact;

        $sql = "INSERT INTO users (user_fullname, address, email, contact_number, username, password, account_type) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssss", $fullname, $address, $email, $contact, $username, $password, $account_type);

        if ($stmt->execute()) {
            echo json_encode(["message" => "success"]);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
        break;
    case "GET":
        $sql = "SELECT * FROM users";
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