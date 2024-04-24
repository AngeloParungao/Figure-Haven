// Load the navbar
window.addEventListener('DOMContentLoaded', function() {
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('.navbar').innerHTML = data;
        });
});