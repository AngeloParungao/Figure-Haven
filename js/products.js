// Extract anime name from the URL query parameters
function getAnimeNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('anime');
  }
  
  // Call filterByCatalog() onload with the extracted anime name
  window.onload = function() {
    const animeName = getAnimeNameFromUrl();
    if (animeName) {
      filterByCatalog(animeName);
    } else {
      console.error('Anime name not found in URL');
    }
  }


  // Function to filter figures by anime name
  function filterByCatalog(animeName) {
    let products;
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        products = JSON.parse(xhr.responseText);
      }
      display(products);
    }
  
    // Send a request to filter_figures.php with the anime name as a query parameter
    xhr.open("GET", "http://localhost/action-figure/backend/filter_figures.php?anime=" + encodeURIComponent(animeName), true);
    xhr.send();

    let search = document.getElementById("search");
    search.addEventListener("keyup", function(){
      let value = search.value.trim().toLowerCase(); // Trim whitespace and convert the search value to lowercase for case-insensitive comparison
      let filteredCatalog = products.filter(function(anime){
        return anime.name.toLowerCase().includes(value); // Check if the anime name includes the search value
      });
      // Update the displayed catalog with the filtered catalog
      display(filteredCatalog);
    });
  }

  function display(products){
    let dom = document.querySelector(".product-container");
    dom.innerHTML = ''; // Clear existing product elements

  
    console.log(products);
  
    products.forEach(function(product){
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
        if(localStorage.getItem('userID') == null){
          window.open('http://localhost/action-figure/pages/login.php','_self');
          alert("Please Sign-up/Login first");
        }
        else{
          document.getElementById("product-clicked").style.display ="block";
          
          openProduct(product);
          ;
        }
      };
    });
  }

  
  function openProduct(product){
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling behavior
    });
    document.getElementById("name").textContent = product.name;
    document.getElementById("anime").textContent = product.anime;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    document.getElementById("image").src = product.location;

    let dom = document.querySelector("#left");

    let wrapper = document.createElement("div");
    wrapper.classList.add("quantity-wrapper");
    let addButton = document.createElement("button");
    addButton.textContent = "+"
    let minusButton = document.createElement("button");
    minusButton.textContent = "-"
    let span = document.createElement("span");
    span.id = "quantity";
    span.textContent = "1"


    let counter = 1;
    let priceString = product.price;

    // Remove all non-numeric characters
    let Price = priceString.replace(/[^0-9]/g, '');
    let total = Price;

    addButton.onclick = function() {
        span.textContent = ++counter; // Increment counter and then display it
        total = total * counter;
    };
    
    minusButton.onclick = function() {
        if (counter > 1) { // Check if counter is greater than 1 before decrementing
            span.textContent = --counter; // Decrement counter and then display it
            total = total - Price;
        }
    };



    let addToCart = document.createElement("button");
    let buyNow = document.createElement("button");

    addToCart.id = "addToCart";
    buyNow.id = "buyNow";

    addToCart.textContent = "Add To Cart"
    buyNow.textContent = "Buy Now"

    wrapper.appendChild(minusButton);
    wrapper.appendChild(span);
    wrapper.appendChild(addButton);
    dom.appendChild(wrapper);
    dom.appendChild(addToCart);
    dom.appendChild(buyNow);

    addToCart.onclick = function() {
      if (confirm("Are you sure you want to add this item to the cart?")) {
        let product_name = product.name;
        let product_image = product.location;
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
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              console.log(xhr.responseText); // Log the response
              location.reload();
          }
        };
        xhr.send("product_name=" + product_name + "&image=" + product_image + "&userID=" + userID + "&name=" + name + "&contact=" + contact + "&email=" + email + "&address=" + address + "&username=" + username + "&items=" + counter + "&total=" + total + "&status=" + status);
      } else {
          // Action canceled
          console.log("Action canceled");
      }
    }
  }
  
  



  