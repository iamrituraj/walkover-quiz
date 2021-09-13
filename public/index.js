            

 (function () {
     const forms = document.querySelectorAll('.requires-validation');
     Array.from(forms)
         .forEach(function (form) {
             form.addEventListener('submit', function (e) {
                 handleLoginSubmit(e)
             });
         });
})()
                    


function handleLoginSubmit(event) {
    var element = document.getElementById("contactForm");
    if (!element.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        element.classList.add('was-validated');
    }
    else {
        element.classList.add('was-validated');
        var name = element.name.value;
        var email = element.email.value;
        event.preventDefault();
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        window.location.href = "instructions.html";
    }

}
// var inputVal = document.getElementById("name-input").value;
// console.log(inputVal);
            
// localStorage.setItem("df", "Smith");

// function data() {
//              alert("Hello! I am an alert box!!");

//       // Get the value of the name field.
//         var name = document.getElementById('name').value;
//               var email = document.getElementById('email').value;

//       // Save the name in localStorage.
//         localStorage.setItem('name', name);
//     localStorage.setItem('email', email);
    
    

//     setTimeout(function () {
//         document.getElementById('anchor').href = 'instructions.html';
//     }, 500);


//     };

// window.onload = function() {

//   // Check for LocalStorage support.
//   if (localStorage) {
// console.log("start")
//     // Add an event listener for form submissions
//       let submit = document.getElementById('submit')
//       console.log(submit);

//       submit.addEventListener('submit', data());

//   }

// }