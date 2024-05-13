<?php

include_once 'connect.php';

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "POST":
        // Load the existing XML file
        $xml = simplexml_load_file('../figures.xml');

        // Retrieve form data
        $productName = $_POST['productName'];
        $category = $_POST['category'];
        $price = $_POST['price'];
        $stock = $_POST['stock'];
        $description = $_POST['description'];
        $anime = $_POST['anime'];

        // Validate form data
        if (empty($productName) || empty($category) || empty($price) || empty($stock) || empty($description)) {
            echo "All fields are required.";
            exit;
        }

        // Check if the product name already exists
        foreach ($xml->children() as $product) {
            if ($product->name == $productName) {
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
                echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                exit;
            }

            // Upload file
            if (move_uploaded_file($_FILES["productImage"]["tmp_name"], $targetFile)) {
                $imagePath = $targetFile;
            } else {
                echo "Sorry, there was an error uploading your file.";
                exit;
            }
        } else {
            echo "No file uploaded.";
            exit;
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

        echo '<script>alert("Product added successfully."); window.close(); window.opener.location.reload();</script>';
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
