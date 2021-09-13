var currentQuestion = 0;
var score = 0;
var totalQuestions = 10;
console.log(totalQuestions);

var container = document.getElementById("quizContainer");
var questionEl = document.getElementById("question");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var opt4 = document.getElementById("opt4");

var nextButton = document.getElementById("nextButton");
var resultCont = document.getElementById("result");


let questions;

async function data_request() {
    const response = await fetch('http://localhost:4821/api');
    console.log(response);
    let json = await response.json();
    console.log(json);
    set_question(json);

};

let timer = 180;

function interval() {
    let countdown = setInterval(() => {
        // console.log('start');
        document.getElementById("time-container").innerHTML = "Time Left:" + timer + "s ";
        timer--;
        // console.log("star" + timer)
        if (timer < 0) {
            clearInterval(countdown);
            window.location.href = "http://localhost:4821/result";
            // window.location.replace("http://localhost:4821/result.html");
        }
    }, 1000);
}


function set_question(data) {
    questions = data;
    interval();
    loadQuestion(currentQuestion);
}

function loadQuestion(questionIndex) {

    let q = questions[questionIndex]

    questionEl.textContent = (questionIndex + 1) + ". " + q.question;
    opt1.textContent = q.options[0];
    opt2.textContent = q.options[1];
    opt3.textContent = q.options[2];
    opt4.textContent = q.options[3];
};

function loadNextQuestion() {
    //If no radio option is selected, return an alert message
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if (!selectedOption) {
        alert("Please select your answer!");
        return;
    }
    //Comparing the answer value, if true add 10 to the score
    var answer = selectedOption.value;
    if (questions[currentQuestion].correctIndex == answer) {
        score += 1;
    }


    // saves score to session storage
    sessionStorage.setItem("score", score);
    console.log('score' + score);

    //Uncheck the current option, increment currentQuestion and load next question
    selectedOption.checked = false;
    currentQuestion++;
    if (currentQuestion == totalQuestions - 1) {
        nextButton.textContent = "Submit";
        let tag = document.createElement("a");
        tag.id = 'submit';
        tag.href = "score.html"
        let link = document.createTextNode("Submit");
        nextButton.textContent = "";
        // Append the text node to anchor element.
        tag.appendChild(link);
        let button = document.getElementById("nextButton");
        button.appendChild(tag);
        
    }
    //Hide the container to reveal the score after final question
    if (currentQuestion == totalQuestions) {
        // var tag = document.createElement("a");
        // tag.id = 'submit';
        // tag.href = "score.html"
        // var link = document.createTextNode("submit");
        // nextButton.textContent = "";

        // // Append the text node to anchor element.
        // tag.appendChild(link);
        // let button = document.getElementById("nextButton");
        // button.appendChild(tag);

        // container.style.display = "none";
        // resultCont.style.display = "";
        // resultCont.textContent = `Your Score: ${score}/100`;
        return;
    }

    loadQuestion(currentQuestion);
}

data_request();