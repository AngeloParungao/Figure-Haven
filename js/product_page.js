
// Array to store the product data
let products = [];

// Function to load products when the page loads
function loadProducts() {
    // Simulated data for demonstration
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
                stock : figure[i].getElementsByTagName("stock")[0].childNodes[0].nodeValue,
              };
            products.push(detail);
          }
      } 
      filterProducts();
  }
  xml.open("GET","../figures.xml",true);
  xml.send();
}
  

// Function to filter and display products based on search, category, and order
function filterProducts() {
    let searchTerm = document.getElementById("product-search").value.trim().toLowerCase();
    let category = document.getElementById("category").value;
    let order = document.getElementById("order").value;

    // Filter products based on search term and category
    let filteredProducts = products.filter(product => {
        return (category === "All" || product.category === category) &&
               (searchTerm === "" || product.name.toLowerCase().includes(searchTerm));
    });

    // Sort filtered products based on order
    if (order === "descending") {
        filteredProducts.sort((a, b) => parseFloat(b.price.replace('₱ ', '')) - parseFloat(a.price.replace('₱', ''))); // Sort by price in descending order
    } else {
        filteredProducts.sort((a, b) => parseFloat(a.price.replace('₱ ', '')) - parseFloat(b.price.replace('₱', ''))); // Sort by price in ascending order
    }

    // Display the filtered and sorted products
    displayProducts(filteredProducts);
}

// Function to display products in the table
function displayProducts(products) {
    let table = document.getElementById("product-table");

    // Clear existing table rows
    table.innerHTML = "<tr><th>Image</th><th>Name</th><th>Anime</th><th>Price</th><th>Category</th><th>Sales</th><th>Stock</th></tr>";

    // Add each product to the table
    products.forEach(product => {
        let row = table.insertRow();
        row.innerHTML = `
            <td><img id="image" src="${product.location}" alt="Product Image"></td>
            <td>${product.name}</td>
            <td>${product.anime}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.sales}</td>
            <td>${product.stock}</td>
        `;
    });
}

// Event listeners for product search, category, and order dropdowns
document.getElementById("product-search").addEventListener("input", filterProducts);
document.getElementById("category").addEventListener("change", filterProducts);
document.getElementById("order").addEventListener("change", filterProducts);