// Extract anime name from the URL query parameters
function getAnimeNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('anime');
  }
  
  // Function to filter figures by anime name
  function filterByCatalog(animeName) {
    let xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let products = JSON.parse(xhr.responseText);
        console.log(products); // Handle the filtered products data here
      }
    }
  
    // Send a request to filter_figures.php with the anime name as a query parameter
    xhr.open("GET", "http://localhost/action-figure/backend/filter_figures.php?anime=" + encodeURIComponent(animeName), true);
    xhr.send();
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
  