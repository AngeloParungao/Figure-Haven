let id = localStorage.getItem("userID");
let name = localStorage.getItem("name");
let user_name = localStorage.getItem("username");
let email = localStorage.getItem("email");
let contact_number = localStorage.getItem("contact");
let address = localStorage.getItem("address");
let profile_picture = localStorage.getItem("profile");



console.log(name);

document.getElementById("name").value = name;
document.querySelector(".detail #username").value = user_name;
document.getElementById("email").value = email;
document.getElementById("contact").value = contact_number;
document.getElementById("address").value = address;
document.getElementById("pfp-preview").src = profile_picture;