<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/catalog.css">
    <script src="../js/script.js"></script>
    <title>Catalog</title>
</head>
<body onload="catalog()">
    <?php include '../components/navbar.php'?>

    <section id="catalog">
        <h2>Anime List</h2>
        <div id="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="search" placeholder="Search">
        </div>
        <div class="catalog-container">
        </div>
    </section>

    <?php include '../components/footer.php'?>

</body>
</html>