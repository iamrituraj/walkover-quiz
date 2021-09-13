 function clear_input() {
     document.getElementById('question').value = "";
     document.getElementById('options').value = "";
     document.getElementById('correctindex').value = "";
 }


 async function question_send(question, choices, correctindex) {

     const data = {
         question,
         choices,
         correctindex
     };

     console.log(data);

     const options = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
     };

     const response = await fetch('/add_questions', options);
     console.log('data')
     const json = await response.json();
     console.log(json);

 }


 function handleLoginSubmit(event) {
     console.log(event.target + "here");
     event.preventDefault();

     let question = document.getElementById('question').value;
     let choices = document.getElementById('options').value;
     let correctindex = document.getElementById('correctindex').value;
     let options = choices.split(",");

     clear_input();
     question_send(question, options, correctindex);
 }



 (function () {
     const forms = document.querySelectorAll('.question-form');
     Array.from(forms)
         .forEach(function (form) {
             form.addEventListener('submit', function (e) {
                 console.log('iam')
                 handleLoginSubmit(e)
             });
         });
 })()