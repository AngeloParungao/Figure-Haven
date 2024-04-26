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
          alert("Product clicked:"+ figure.name);
        }
        // You can perform any action here when a product is clicked
      };
    });
  }
  
  



  