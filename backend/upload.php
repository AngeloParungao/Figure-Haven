<?php
// Check if the file is actually uploaded
if(isset($_FILES['file'])) {
    $uploadDir = '../user-profile/'; // Specify the directory where you want to upload the images
    $uploadedFile = $uploadDir . basename($_FILES['file']['name']); // Get the path of the uploaded file
    
    // Move the uploaded file to the specified directory
    if(move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFile)) {
        // File uploaded successfully
        echo json_encode(['success' => true, 'filename' => basename($_FILES['file']['name']), 'message' => 'Upload Successful']);
    } else {
        // Failed to upload file
        echo json_encode(['success' => false, 'message' => 'Upload Failed']);
    }
} else {
    // No file uploaded
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
}
?>









