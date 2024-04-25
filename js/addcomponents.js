
// Load the navbar
fetch('http://localhost/action-figure/components/navbar.html')
    .then(response => response.text())
    .then(template => {
        // Compile navbar template
        const compiledTemplate = Handlebars.compile(template);
        // Render navbar
        const navbarHtml = compiledTemplate();
        // Insert rendered navbar into the DOM
        document.querySelector('.navbar').innerHTML = navbarHtml;
        
        // Set userID in the navbar
        let userID = localStorage.getItem('userID') || '';
        let username = localStorage.getItem('username') || '';

        if(userID != ''){
            document.getElementById('logged-in').style.display = 'block';
            document.getElementById('logged-out').style.display = 'none';
            document.getElementById('logged-in').innerHTML = username;
        }
        else{
            document.getElementById('logged-in').style.display = 'none';
            document.getElementById('logged-out').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error fetching or rendering navbar template:', error);
    });