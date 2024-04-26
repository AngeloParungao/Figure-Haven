//localStorage.clear();


//---------REGISTER---------//
function addUser() {
  let form = document.getElementById("registerForm");
  let formData = new FormData(form);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../backend/index.php", true);

  xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log("User added successfully");
      }
  };
  xhr.send(formData);
}


//--------LOGIN---------//
function fetchUsers() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/index.php", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let users = JSON.parse(xhr.responseText);
            let found = false;
            // Loop through the users array to check for matching credentials
            users.forEach(function(user) {
                if (user.username === username && user.password === password) {
                    found = true;
                    userID = user.id; // Set the userID variable to the matched user's ID
                    // Store userID in localStorage
                    localStorage.setItem('userID', userID);
                    localStorage.setItem('username', user.username);
                }
            });

            if (found) {
                // Credentials are valid
                alert("Login successful!");
                window.open('../index.php','_self');

            } else {
                // Credentials are invalid
                alert("Invalid username or password.");
            }
        }
    };
    xhr.send();
}



//------------CATALOG.PHP------------//
function catalog(){
  let catalog = [];
  let xml = new XMLHttpRequest();

  xml.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          let animeList = this.responseXML;

          let anime = animeList.getElementsByTagName("anime");

          for(let i = 0; i < anime.length; i++){
              let detail = {
                name : anime[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
                location : anime[i].getElementsByTagName("location")[0].childNodes[0].nodeValue,
              };
            catalog.push(detail);
          }
          
          // Initially display the full catalog
          displayCatalog(catalog);
      } 
  }
  xml.open("GET","http://localhost/action-figure/catalog.xml",true);
  xml.send();

  let search = document.getElementById("catalog-search");
  search.addEventListener("keyup", function(){
    let value = search.value.trim().toLowerCase(); // Trim whitespace and convert the search value to lowercase for case-insensitive comparison
    let filteredCatalog = catalog.filter(function(anime){
      return anime.name.toLowerCase().includes(value); // Check if the anime name includes the search value
    });
    // Update the displayed catalog with the filtered catalog
    displayCatalog(filteredCatalog);
  });
}

function displayCatalog(catalog){
  let dom = document.querySelector(".catalog-container");
  dom.innerHTML = ''; // Clear existing catalog elements

  catalog.forEach(function(anime){
    let container = document.createElement("div");
    container.classList.add('catalog');

    let img = document.createElement("img");
    img.src = anime.location;

    let div = document.createElement("div");
    let name = document.createElement("span");
    name.textContent = anime.name;

    div.appendChild(name);
    container.appendChild(img);
    container.appendChild(div);
    dom.appendChild(container);

    container.onclick = function() {
      console.log("Product clicked:", anime.name);
      window.location.href = 'products.php?anime=' + encodeURIComponent(anime.name);
      // You can perform any action here when a product is clicked
    };
  });
}





function getProduct(){
  let details = [];
  
  let xml = new XMLHttpRequest();
  
  xml.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          let product = this.responseXML;
  
  
          let figure = product.getElementsByTagName("figure");
  
          for(let i = 0; i < figure.length; i++){
              let detail = {
                name : figure[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
                price : figure[i].getElementsByTagName("price")[0].childNodes[0].nodeValue,
                category : figure[i].getElementsByTagName("category")[0].childNodes[0].nodeValue,
                anime : figure[i].getElementsByTagName("anime")[0].childNodes[0].nodeValue,
                category : figure[i].getElementsByTagName("category")[0].childNodes[0].nodeValue,
                sales: figure[i].getElementsByTagName("sales")[0].childNodes[0].nodeValue,
                location : figure[i].getElementsByTagName("location")[0].childNodes[0].nodeValue,
              };
            details.push(detail);
          }
      } 
      display(details);
  }
  xml.open("GET","figures.xml",true);
  xml.send();
}



function display(details){
  let top_sales = document.querySelector("#items");
  let dom = document.querySelector(".products-container");

  // Loop through each product detail
  details.forEach(function(figure){
    let product = document.createElement("div");
    product.classList.add('product');

    let top_product = document.createElement("div");
    top_product.classList.add('top-selling-items');

    let img = document.createElement("img");
    img.src = figure.location;

    if(figure.sales>500){
      let img_top_sales = document.createElement("img");
      img_top_sales.src = figure.location;

      top_product.appendChild(img_top_sales);
      top_sales.appendChild(top_product);
    }

    let div = document.createElement("div");
    let name = document.createElement("span");
    let price = document.createElement("span");
    let anime = document.createElement("span");

    name.textContent = figure.name;
    price.textContent = figure.price;
    anime.textContent = figure.anime;


    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(anime);
    product.appendChild(img);
    product.appendChild(div);
    dom.appendChild(product);

    product.onclick = function() {
      console.log("Product clicked:", figure.name);
      // You can perform any action here when a product is clicked
    };
  });
}


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.querySelector(".navbar").classList.add("scrolled");
    document.querySelectorAll(".links > #anchors > .link").forEach(function(item) {
      item.style.color = 'black';
    });
    document.querySelector(".bar").classList.remove("black");
    document.querySelector(".bar").classList.add("white");
    document.querySelector("#logo > h5").classList.add("font-change");
    document.querySelector(".links > div > i").style.color = "black";
    document.querySelector("#logged-out").style.color = "black";
    document.querySelector("#logged-in").style.color = "black";
    document.querySelector("#nav-profile > i").style.color = "black";
  } else {
    document.querySelector(".navbar").classList.remove("scrolled");
    document.querySelectorAll(".links > #anchors > .link").forEach(function(item) {
      item.style.color = 'white';
    });
    document.querySelector(".bar").classList.add("black");
    document.querySelector("#logo > h5").classList.remove("font-change");
    document.querySelector(".links > div > i").style.color = "white";
    document.querySelector("#logged-out").style.color = "white";
    document.querySelector("#logged-in").style.color = "white";
    document.querySelector("#nav-profile > i").style.color = "white";
  }
};