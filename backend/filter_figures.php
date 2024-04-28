<?php
// Check if the anime query parameter is set
if (isset($_GET['anime'])) {
    // Retrieve the anime name from the query parameter
    $animeName = $_GET['anime'];

    // Load the XML file
    $xml = simplexml_load_file('../figures.xml');

    // Filter the figures based on the anime name
    $filteredFigures = [];
    if($animeName == "all"){
        foreach ($xml->figure as $figure) {
            $filteredFigures[] = [
                'name' => (string) $figure->name,
                'price' => (string) $figure->price,
                'category' => (string) $figure->category,
                'anime' => (string) $figure->anime,
                'location' => (string) $figure->location,
                'description' => (string) $figure->description,

            ];
        }
    }
    else{
        foreach ($xml->figure as $figure) {
            // Check if the anime name matches
            if ((string) $figure->anime === $animeName) {
                // Add the figure to the filtered list
                $filteredFigures[] = [
                    'name' => (string) $figure->name,
                    'price' => (string) $figure->price,
                    'category' => (string) $figure->category,
                    'anime' => (string) $figure->anime,
                    'location' => (string) $figure->location,
                    'description' => (string) $figure->description,
    
                ];
            }
        }
    }

    // Return the filtered figures as JSON
    echo json_encode($filteredFigures);
} else {
    // If the anime query parameter is not set, return an error message
    echo json_encode(['error' => 'Anime parameter is missing']);
}
?>
