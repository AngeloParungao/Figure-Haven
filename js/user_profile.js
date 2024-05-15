let id = localStorage.getItem("userID");
let name = localStorage.getItem("name");
let user_name = localStorage.getItem("username");
let email = localStorage.getItem("email");
let contact_number = localStorage.getItem("contact");
let address = localStorage.getItem("address");
let profile_picture = localStorage.getItem("profile");


document.getElementById("name").value = name;
document.querySelector(".detail #username").value = user_name;
document.getElementById("email").value = email;
document.getElementById("contact").value = contact_number;
document.getElementById("address").value = address;
document.getElementById("pfp-preview").src = profile_picture;


document.getElementById("pfp-input").addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      document.getElementById("pfp-preview").src = URL.createObjectURL(file);
    }
});

document.getElementById("update-btn").addEventListener("click", function () {
  const file = document.getElementById("pfp-input").files[0];

  if (file) {
      // If there's a file selected, upload it first
      uploadImage(file).then(function (profilePicture) {
          // Once the image is uploaded, proceed to update user information
          updateUser(profilePicture);
      }).catch(function (error) {
          console.error("Failed to upload image:", error);
      });
  } else {
      // If no file is selected, update user information without changing the profile picture
      updateUser(profile_picture);
  }
});

function uploadImage(file) {
  return new Promise(function (resolve, reject) {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "../backend/upload.php", true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  const response = JSON.parse(xhr.responseText);
                  if (response.success) {
                      resolve(response.filename);
                  } else {
                      reject(response.message);
                  }
              } else {
                  reject("Error occurred while uploading image. HTTP status: " + xhr.status);
              }
          }
      };
      xhr.send(formData);
  });
}

function updateUser(profilePicture) {
  let name = document.getElementById("name").value;
  let username = document.querySelector(".detail #username").value;
  let email = document.getElementById("email").value;
  let contact = document.getElementById("contact").value;
  let address = document.getElementById("address").value;

  // Check if a file is selected
  const file = document.getElementById("pfp-input").files[0];

  if (file) {
      // If a file is selected, concatenate the directory path with the filename
      profilePicture = "../user-profile/" + file.name;
  } else {
      // If no file is selected, use the existing profile picture
      profilePicture = profile_picture;
  }


  let updateData = JSON.stringify({
      id: id,
      name: name,
      username: username,
      email: email,
      contact: contact,
      address: address,
      profilePicture: profilePicture
  });

  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "../backend/index.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        console.log("Response from server:", xhr.responseText); // Log the response
        if (xhr.status == 200) {
            
                // Update localStorage with the new data if needed
                localStorage.setItem("name", name);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                localStorage.setItem("contact", contact);
                localStorage.setItem("address", address);
                localStorage.setItem("profile", profilePicture);
                window.location.reload();
           
        } else {
            console.error("Error occurred while processing the request. HTTP status:", xhr.status);
        }
    }
};


  xhr.send(updateData);
}
  