<?php
include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $profile = "http://localhost/action-figure/user-profile/default.png";
        $fullname = $_POST['fullname'];
        $address = $_POST['address'];
        $email = $_POST['email'];
        $contact = $_POST['contact'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $account_type = "user";

        $sql = "INSERT INTO users (profile, user_fullname, address, email, contact_number, username, password, account_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssss", $profile, $fullname, $address, $email, $contact, $username, $password, $account_type);

        $stmt->execute();
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
    case "PUT":
        $data = json_decode(file_get_contents('php://input'), true);

        // Extract the data
        $id = $data['id'];
        $name = $data['name'];
        $username = $data['username'];
        $email = $data['email'];
        $contact = $data['contact'];
        $address = $data['address'];
        $profilePicture = $data['profilePicture'];

        // Prepare and execute the update query for user information
        $stmt = $conn->prepare("UPDATE users SET profile=?, user_fullname=?, username=?, email=?, contact_number=?, address=? WHERE id=?");
        $stmt->bind_param("ssssssi", $profilePicture, $name, $username, $email, $contact, $address, $id);

        // Execute the query to update user information
        $stmt->execute();
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
}
?>