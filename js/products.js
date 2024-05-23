document.addEventListener('DOMContentLoaded', function() {
  let allProducts = []; // Array to store all products
  let originalProducts = []; // Array to store the original products
  let filteredCategoryProducts = []; // Array to store products filtered by category
  let filteredSearchProducts = []; // Array to store products filtered by search

  const animeName = getAnimeNameFromUrl();

  
  if (animeName) {
    filterByCatalog(animeName);
  } else {
    console.error('Anime name not found in URL');
  }

  function getAnimeNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('anime');
  }

  if(animeName == 'all'){
    document.getElementById("type").innerHTML = "All Products";
  }
  else{
    document.getElementById("type").innerHTML = animeName;
  }
  

  function filterByCatalog(animeName) {
    let category = document.getElementById("category").value;
    let sortingOrder = document.getElementById("order").value;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            allProducts = JSON.parse(xhr.responseText);
            originalProducts = [...allProducts]; // Store original products

            filterAndDisplayProducts(category, sortingOrder,'');
        }
    };

    xhr.open("GET", "http://localhost/action-figure/backend/filter_figures.php?anime=" + encodeURIComponent(animeName), true);
    xhr.send();
  }

  function filterAndDisplayProducts(category, sortingOrder, searchQuery) {
    // Filter products by category
    filteredCategoryProducts = filterProductsByCategory(originalProducts, category);
    // Apply sorting to filtered category products
    applySorting(filteredCategoryProducts, sortingOrder);

    // Apply search filter if search query is not empty
    if (searchQuery !== '') {
        filteredSearchProducts = filterProductsBySearch(filteredCategoryProducts, searchQuery);
        // Display products based on search results
        display(filteredSearchProducts);
    } else {
        // If search query is empty, display all products from the filtered category
        display(filteredCategoryProducts);
    }
}




  function filterProductsByCategory(products, category) {
    if (category === "All") {
        return products; // Return all products
    } else {
        return products.filter(function(product) {
            return product.category === category;
        });
    }
  }

  function filterProductsBySearch(products, query) {
    return products.filter(function(product) {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  function applySorting(products, sortingOrder) {
    if (sortingOrder === "ascending") {
        products.sort((a, b) => (parseInt(a.price.trim().replace('₱', '')) > parseInt(b.price.trim().replace('₱', ''))) ? 1 : -1);
    } else if (sortingOrder === "descending") {
        products.sort((a, b) => (parseInt(a.price.trim().replace('₱', '')) < parseInt(b.price.trim().replace('₱', ''))) ? 1 : -1);
    }
  }

  document.getElementById("category").addEventListener("change", function() {
    let category = this.value;
    let sortingOrder = document.getElementById("order").value;
    let searchQuery = document.getElementById("search").value.trim().toLowerCase();
    filterAndDisplayProducts(category, sortingOrder, searchQuery);
});

document.getElementById("search").addEventListener("keyup", function() {
    let searchQuery = this.value.trim().toLowerCase();
    let category = document.getElementById("category").value;
    let sortingOrder = document.getElementById("order").value;
    filterAndDisplayProducts(category, sortingOrder, searchQuery);
});

document.getElementById("order").addEventListener("change", function() {
    let category = document.getElementById("category").value;
    let sortingOrder = this.value;
    let searchQuery = document.getElementById("search").value.trim().toLowerCase();
    filterAndDisplayProducts(category, sortingOrder, searchQuery);
});

  function display(products) {
    let dom = document.querySelector(".product-container");
    dom.innerHTML = ''; // Clear existing product elements

    products.forEach(function(product) {
        let container = document.createElement("div");
        container.classList.add('filtered');

        let img = document.createElement("img");
        img.src = product.location;

        let div = document.createElement("div");
        let name = document.createElement("span");
        let price = document.createElement("span");
        let anime = document.createElement("span");

        name.textContent = product.name;
        price.textContent = product.price;
        anime.textContent = product.anime;

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(anime);
        container.appendChild(img);
        container.appendChild(div);
        dom.appendChild(container);

        container.onclick = function() {
            if (localStorage.getItem('userID') == null) {
                window.open('http://localhost/action-figure/pages/login.php', '_self');
                alert("Please Sign-up/Login first");
            } else {
                document.getElementById("product-clicked").style.display = "block";
                openProduct(product);
            }
        };
    });
  }

  function openProduct(product) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Use smooth scrolling behavior
    });

    let total_price, items_number = 1;
    let dom = document.querySelector("#left");

    // Check if quantity wrapper already exists
    let existingWrapper = document.querySelector(".quantity-wrapper");
    if (!existingWrapper) {
        // Create elements for quantity and buttons only if the wrapper doesn't exist
        let wrapper = document.createElement("div");
        wrapper.classList.add("quantity-wrapper");
        let addButton = document.createElement("button");
        addButton.textContent = "+";
        let minusButton = document.createElement("button");
        minusButton.textContent = "-";
        let span = document.createElement("span");
        span.id = "quantity";
        span.textContent = "1";

        // Append child elements to the wrapper
        wrapper.appendChild(minusButton);
        wrapper.appendChild(span);
        wrapper.appendChild(addButton);

        // Set event listeners for buttons
        let temp = 1;
        let counter = 1; // Initialize counter to 1

        let priceString = product.price;
        let Price = parseInt(priceString.replace(/[^0-9]/g, '')); // Parse price as integer
        let total = Price;

        addButton.onclick = function() {
            temp++; // Increment temp
            counter = temp; // Update

            span.textContent = temp; // Update displayed quantity
            total = counter * Price; // Update total price
            total_price = total; // Update total_price variable
            items_number = counter; // Update items_number variable
        };

        minusButton.onclick = function () {
            if (temp > 1) {
                temp--; // Decrement temp if greater than 1
                counter = temp; // Update counter
                span.textContent = temp; // Update displayed quantity
                total = counter * Price; // Update total price
                total_price = total; // Update total_price variable
                items_number = counter; // Update items_number variable
            }
        };
        total = counter * Price;

        total_price = total;
        items_number = counter;

        // Append the wrapper to the DOM
        dom.appendChild(wrapper);
    }

    // Set product details
    document.getElementById("name").textContent = product.name;
    document.getElementById("anime").textContent = product.anime;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    document.getElementById("image").src = product.location;

    // Create and append buttons only if they don't already exist
    let addToCart = document.getElementById("addToCart");
    let buyNow = document.getElementById("buyNow");

    if (!addToCart) {
        addToCart = document.createElement("button");
        addToCart.id = "addToCart";
        addToCart.textContent = "Add To Cart";
        dom.appendChild(addToCart);
    }

    if (!buyNow) {
        buyNow = document.createElement("button");
        buyNow.id = "buyNow";
        buyNow.textContent = "Buy Now";
        dom.appendChild(buyNow);
    }

    // Set click event for addToCart button
    addToCart.onclick = function () {
      let stock = product.stock;
      if(stock > 0){
        if(stock > items_number){
            if (confirm("Are you sure you want to add this item to the cart?")) {
                let product_name = product.name;
                let userID = localStorage.getItem('userID') || '';
                
                // Check if product is already in cart
                let xhrCheck = new XMLHttpRequest();
                xhrCheck.open("POST", "http://localhost/action-figure/backend/check_cart.php", true);
                xhrCheck.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhrCheck.onreadystatechange = function () {
                    if (xhrCheck.readyState === 4 && xhrCheck.status === 200) {
                        let response = JSON.parse(xhrCheck.responseText);
                        if (response.exists) {
                            alert("Product is already in the cart.");
                        } else {
                            // If not in cart, proceed to add it
                            addProductToCart();
                        }
                    }
                };
                xhrCheck.send("userID=" + userID + "&product_name=" + product_name);
            }
        }
        else{
            alert("Items exceed to available stock");
        }
      } else {
          alert("Product isn't available");
      }
  }

  function addProductToCart() {
    let product_name = product.name;
    let product_anime = product.anime;
    let product_image = product.location;
    let product_price = product.price.replace('₱ ', '');
    let userID = localStorage.getItem('userID') || '';
    let name = localStorage.getItem('name') || '';
    let contact = localStorage.getItem('contact') || '';
    let email = localStorage.getItem('email') || '';
    let address = localStorage.getItem('address') || '';
    let username = localStorage.getItem('username') || '';
    let status = 'cart';

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/action-figure/backend/cart.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText); // Log the response
            createToast("success", "fa-solid fa-circle-check", "Success", "Added to Cart!");
            setTimeout(function() { location.reload() }, 1000);
        }
    };
    xhr.send("cart=true" + "&product_name=" + product_name + "&product_anime=" + product_anime + "&image=" + product_image + "&price=" + product_price + "&userID=" + userID + "&name=" + name + "&contact=" + contact + "&email=" + email + "&address=" + address + "&username=" + username + "&items=" + items_number + "&shipping=40"  + "&total=" + (parseFloat(total_price)) + "&paid=" + "&status=" + status);
}

    buyNow.onclick = function(){
        let product_name = product.name;
        let product_anime = product.anime;
        let product_image = product.location;
        let product_price = product.price.replace(/[^0-9]/g, '');
        let stock = product.stock;
        let userID = localStorage.getItem('userID') || '';
        let name = localStorage.getItem('name') || '';
        let contact = localStorage.getItem('contact') || '';
        let email = localStorage.getItem('email') || '';
        let address = localStorage.getItem('address') || '';
        let username = localStorage.getItem('username') || '';
        let status = 'pending';

        if(stock > 0){
            if(stock > items_number){
                window.open("http://localhost/action-figure/pages/directCheckout.php?product_name=" + product_name + "&product_anime=" + product_anime + "&image=" + product_image + "&price=" + product_price + "&userID=" + userID + "&name=" + name + "&contact=" + contact + "&email=" + email + "&address=" + address + "&username=" + username + "&items=" + items_number + "&shipping= 40"  + "&total=" + total_price + "&status=" + status + "&cart=false", '_self');     
            }
            else{
                alert("Items exceed to available stock");
            }
        }
        else{
          alert("Product isn't available");
        }
    }
  }
});