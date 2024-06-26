function openTermsPopup() {
  const leftPosition = (window.innerWidth - 500) / 2;
  const topPosition = (window.innerHeight - 550) / 2; 
  window.open("Terms-Condition.php", "Terms and Conditions", "width=500,height=550,top=" + topPosition + ",left=" + leftPosition);
}


//---------REGISTER---------//
function addUser(event) {
  event.preventDefault();

  let form = document.getElementById("registerForm");
  let formData = new FormData(form);

  let fullname = formData.get('fullname');
  let address = formData.get('address');
  let email = formData.get('email');
  let contact = formData.get('contact');
  let username = formData.get('username');
  let password = formData.get('password');
  let confirmPassword = formData.get('confirm_password');
  let termsConditions = document.getElementById("terms-conditions").checked;

  // Check if all fields are filled
  if (!fullname || !address || !email || !contact || !username || !password || !confirmPassword) {
    createToast("error", "fa-solid fa-xmark", "Error", "All fields are required.");
    return;
  }

  // Check if passwords meet the minimum length requirement
  if (password.length < 8 || confirmPassword.length < 8) {
    createToast("error", "fa-solid fa-xmark", "Error", "Passwords must be at least 8 characters long.");
    return;
}

  if (!termsConditions) {
    createToast("error", "fa-solid fa-xmark", "Error", "You must agree to the terms and conditions.");
    return;
  }

  if (password != confirmPassword) {
    createToast("error", "fa-solid fa-xmark", "Error", "Passwords do not match.");
  } else {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../backend/index.php", true);

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("User added successfully");
        localStorage.setItem("addedUser", 'true');
        window.location.reload();
      }
    };
    xhr.send(formData);
  }
}


//--------LOGIN---------//
function fetchUsers() {
  event.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  if(username == '' && password == ''){
    createToast("error", "fa-solid fa-xmark", "Error", "Please complete the credentials");
  }
  else{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            let users = JSON.parse(xhr.responseText);
            let found = false;
            // Loop through the users array to check for matching credentials
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
                if (user.username == username && user.password == password && user.account_type == "user") {
                  found = true;
                  userID = user.id;
                  localStorage.setItem('userID', userID);
                  localStorage.setItem('profile', user.profile);
                  localStorage.setItem('name', user.user_fullname);
                  localStorage.setItem('contact', user.contact_number);
                  localStorage.setItem('email', user.email);
                  localStorage.setItem('address', user.address);
                  localStorage.setItem('username', user.username);
                  localStorage.setItem("login", 'true');
                  window.open("http://localhost/action-figure/index.php", "_self");
                  break;
                }
                else if (user.username == username && user.password == password && user.account_type == "admin") {
                  found = true;
                  window.open("http://localhost/action-figure/admin/dashboard.php","_self");
                  break;
                }
                else{
                  found = false;
                }
              }
              
              if (!found) {
                // Credentials are invalid
                createToast("warning", "fa-solid fa-triangle-exclamation", "Warning", "Invalid username or password.");
              }
            }
          };
          xhr.open("GET", "../backend/index.php", true);
          xhr.send();
        } 
}


//-----------FORGOT PASSWORD-------------//

function forgotPassword(){
  let username = document.getElementById("username");

  if(username.value == ""){
    createToast("error", "fa-solid fa-xmark", "Error", "input your username");
    return;
  }
  else{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/index.php", true);

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let users = JSON.parse(xhr.responseText);
        let found = users.find(user => user.username === username.value);

        if (found) {
          const leftPosition = (window.innerWidth - 400) / 2;
          const topPosition = (window.innerHeight - 450) / 2;
          window.open(`forrgot-password.php?username=${encodeURIComponent(found.username)}&email=${encodeURIComponent(found.email)}&id=${encodeURIComponent(found.id)}`, "_self");
        } else {
          createToast("warning", "fa-solid fa-triangle-exclamation", "Warning", "Username not found");
        }
      }
    };
    xhr.send();

  }
}



//------------CATALOG.PHP------------//
function catalog(){
  let search = document.getElementById("catalog-search");
  if (search) {
    search.addEventListener("keyup", function() {
      // Your existing code for filtering the catalog
      let value = search.value.trim().toLowerCase(); // Trim whitespace and convert the search value to lowercase for case-insensitive comparison
      let filteredCatalog = catalog.filter(function(anime){
        return anime.name.toLowerCase().includes(value); // Check if the anime name includes the search value
      });
      // Update the displayed catalog with the filtered catalog
      displayCatalog(filteredCatalog);
    });
  }
  let catalog = [];
  let xml = new XMLHttpRequest();

  xml.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          let animeList = this.responseXML;

          let anime = animeList.getElementsByTagName("anime");

          for(let i = 0; i < anime.length; i++){
              let detail = {
                name : anime[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
                description : anime[i].getElementsByTagName("description")[0].childNodes[0].nodeValue,
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
    let description = document.createElement("p");
    name.textContent = anime.name;
    description.textContent = anime.description;

    div.appendChild(name);
    div.appendChild(description);
    container.appendChild(img);
    container.appendChild(div);
    dom.appendChild(container);

    container.onclick = function() {
      console.log("Product clicked:", anime.name);
      window.location.href = 'http://localhost/action-figure/pages/products.php?anime=' + encodeURIComponent(anime.name);
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




function display(details) {
  let top_sales = document.querySelector("#items");
  // Loop through each product detail
  details.forEach(function(figure) {

      let top_product = document.createElement("div");
      top_product.classList.add('top-selling-items');

      let img = document.createElement("img");
      img.src = figure.location;

      if (figure.sales > 500 && top_sales && top_product) {
          let img_top_sales = document.createElement("img");
          img_top_sales.src = figure.location;

          top_product.appendChild(img_top_sales);
          top_sales.appendChild(top_product);

          top_product.onclick = function(){
            console.log(figure.name);
          }
      }
    });
}



function createToast(type, icon, title, text){
  let notifications = document.querySelector('.notifications');
  let newToast = document.createElement('div');
  newToast.innerHTML = `
      <div class="toast ${type}">
          <i class="${icon}"></i>
          <div class="content">
              <div class="title">${title}</div>
              <span>${text}</span>
          </div>
          <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
      </div>`;
  notifications.appendChild(newToast);
  newToast.timeOut = setTimeout(
      ()=>newToast.remove(), 5000
  )
}