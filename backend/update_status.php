<?php
include_once 'connect.php'; // Include your database connection

// Start the PHP section for handling the update status request
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['product_name']) && isset($_POST['status'])) {

    $product_name = $_POST['product_name'];
    $status = $_POST['status'];

    // Prepare the SQL statement
    $stmt = $conn->prepare("UPDATE cart SET status = ? WHERE product_name = ?");
    $stmt->bind_param('ss', $status, $product_name);

    if ($stmt->execute()) {
        echo "Status updated successfully";
    } else {
        echo "Error updating status: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
    exit;
}
?>
