<?php
include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $name = $_POST['name'];
        $email = $_POST['email'];

        $sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $name, $email);
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