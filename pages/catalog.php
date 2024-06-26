<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/catalog.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="../js/script.js"></script>
    <title>Catalog</title>
</head>
<body onload="catalog()">
    <?php include '../components/navbar.php'?>

    <section id="catalog">
        <h2>Anime List</h2>
        <div id="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="catalog-search" placeholder="Search">
        </div>
        <div class="catalog-container">
        </div>
    </section>

    <?php include '../components/footer.php'?>

</body>
</html>