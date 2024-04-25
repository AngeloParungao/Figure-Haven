<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Figure Haven</title>
        <link rel="stylesheet" href="css/style.css">
        <script src="js/script.js"></script>
        <link rel="icon" href="images/logo.png" type="image/png">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </head>
    <body>

        
        <?php include 'components/navbar.php'?>
        <section id="hero">
            <div id="content">
                <h1></h1>
            </div>
        </section>

        <section id="top-selling">
            <h2>TOP SELLING ITEMS</h2>
            <div id="items">
                <!--<div class="top-selling-items">
                    <img src="" alt="">
                </div>-->
            </div>
        </section>

        <section id="products">
            <h2>Products</h2>
            <div id="search-bar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search" placeholder="Search">
            </div>
            <div class="products-container">
            </div>
        </section>

        <section id="description">
            <div class="wrapper">
                <div>
                    <img src="images/logo.png" alt="">
                </div>
                <div>
                    <span>Figure Haven</span>
                    <div>
                        <p>Welcome to our online anime figure emporium, where imagination meets craftsmanship! Dive into our vast collection of meticulously crafted anime figures, where your favorite characters come to life in stunning detail.</p>
                        <p>Explore a treasure trove of figures spanning a multitude of genres, from action-packed shonen epics to heartwarming slice-of-life tales. Whether you're a seasoned collector or a newcomer to the world of anime figures, our shop offers something for everyone.</p>
                        <p>Indulge your passion with figures ranging from petite pocket-sized charms to grandiose masterpieces that demand attention. Crafted from premium materials like PVC, resin, and vinyl, each figure is a testament to the dedication of its creators, capturing every nuance of your beloved characters with precision and care.
                        Immerse yourself in a world of creativity and expression as you peruse our extensive selection of figures, each one a miniature work of art waiting to be admired. From iconic characters to hidden gems, our shop is your gateway to a universe of imagination and wonder.</p>
                        <p>Join our community of fellow enthusiasts and collectors as you embark on your journey to build the ultimate anime figure collection. With new arrivals regularly added to our inventory, there's always something exciting to discover.
                        Experience the thrill of bringing your favorite characters into your home with our online anime figure shop. Start your collection today and let the adventure begin!</p>
                    </div>
                </div>
            </div>
        </section>

        <?php include 'components/footer.php'?>
    </body>
</html>