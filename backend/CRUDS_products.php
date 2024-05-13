<?php

include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "POST":
        // Load the existing XML file
        $xml = simplexml_load_file('../figures.xml');

        // Check if it's an update request
        if (isset($_POST['_method']) && $_POST['_method'] === 'PUT') {
            // Retrieve form data for update
            $productName = $_POST['productName'];
            $category = $_POST['category'];
            $price = "₱ " . $_POST['price']; // Concatenate the peso sign
            $stock = $_POST['stock'];
            $description = $_POST['description'];
            $anime = $_POST['anime'];
        
            // Check if the product name exists
            $found = false;
            foreach ($xml->figure as $product) {
                if ($product->name == $productName) {
                    // Update other fields
                    $product->price = $price;
                    $product->category = $category;
                    $product->anime = $anime; // Update anime
                    $product->description = $description;
                    $product->stock = $stock;
        
                    // Update image path if new image provided
                    if (!empty($_FILES["productImage"]["tmp_name"])) {
                        $targetDir = "../products-images/";
                        $targetFile = $targetDir . basename($_FILES["productImage"]["name"]);
                        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        
                        // Allow certain file formats
                        $allowedExtensions = array("jpg", "jpeg", "png", "gif");
                        if (!in_array($imageFileType, $allowedExtensions)) {
                            http_response_code(400); // Bad request
                            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                            exit;
                        }
        
                        // Upload file
                        if (move_uploaded_file($_FILES["productImage"]["tmp_name"], $targetFile)) {
                            // Update image path
                            $product->location = $targetFile;
                        } else {
                            http_response_code(500); // Internal server error
                            echo "Sorry, there was an error uploading your file.";
                            exit;
                        }
                    }
        
                    // Save the updated XML content back to the XML file
                    $xml->asXML('../figures.xml');
        
                    // Send a success response
                    http_response_code(200);
                    echo "Product updated successfully.";
                    $found = true;
                    break;
                }
            }
        
            // If product not found, return error
            if (!$found) {
                http_response_code(404);
                echo "Product not found.";
            }
        } else {
            // Retrieve form data for add
            $productName = $_POST['productName'];
            $category = $_POST['category'];
            $price = "₱ " . $_POST['price'];
            $stock = $_POST['stock'];
            $description = $_POST['description'];
            $anime = $_POST['anime'];

            // Validate form data
            if (empty($productName) || empty($category) || empty($price) || empty($stock) || empty($description)) {
                http_response_code(400); // Bad request
                echo "All fields are required.";
                exit;
            }

            // Check if the product name already exists
            foreach ($xml->children() as $product) {
                if ($product->name == $productName) {
                    http_response_code(400); // Bad request
                    echo "Product with the same name already exists.";
                    exit;
                }
            }

            // Handle file upload
            if (!empty($_FILES["productImage"]["tmp_name"])) {
                $targetDir = "../products-images/";
                $targetFile = $targetDir . basename($_FILES["productImage"]["name"]);
                $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

                // Allow certain file formats
                $allowedExtensions = array("jpg", "jpeg", "png", "gif");
                if (!in_array($imageFileType, $allowedExtensions)) {
                    http_response_code(400); // Bad request
                    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                    exit;
                }

                // Upload file
                if (move_uploaded_file($_FILES["productImage"]["tmp_name"], $targetFile)) {
                    $imagePath = $targetFile;
                } else {
                    http_response_code(500); // Internal server error
                    echo "Sorry, there was an error uploading your file.";
                    exit;
                }
            } else {
                $imagePath = ""; // Set empty path if no image uploaded
            }

            // Create a new XML element for the product
            $newProduct = $xml->addChild('figure');
            $newProduct->addChild('name', $productName);
            $newProduct->addChild('price', $price);
            $newProduct->addChild('category', $category);
            $newProduct->addChild('anime', $anime); // Add anime to XML
            $newProduct->addChild('sales', 0); // Assuming initial sales are 0
            $newProduct->addChild('location', $imagePath); // Add image path to XML
            $newProduct->addChild('description', $description);
            $newProduct->addChild('stock', $stock);

            // Save the updated XML content back to the XML file
            $xml->asXML('../figures.xml');

            http_response_code(201); // Created
            echo '<script>alert("Product updated successfully."); window.close(); window.opener.location.reload();</script>';
        }
        break;

    case "DELETE":
        // Retrieve the product name from the URL
        $productName = $_GET['productName'];

        // Load the existing XML file
        $xml = simplexml_load_file('../figures.xml');

        // Find the product with the specified name and remove it
        foreach ($xml->children() as $product) {
            if ($product->name == $productName) {
                // Remove the product node from the XML
                $dom = dom_import_simplexml($product);
                $dom->parentNode->removeChild($dom);
                break;
            }
        }

        // Save the updated XML content back to the XML file
        $xml->asXML('../figures.xml');

        // Send a success response
        http_response_code(200);
        echo "Product deleted successfully.";
        break;

    default:
        // If the request method is not POST or DELETE, send a method not allowed response
        http_response_code(405);
        echo "Method Not Allowed";
}


?>
