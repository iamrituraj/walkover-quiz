    let json;


    async function data_request() {
        const response = await fetch('http://localhost:4821/api');
        console.log(response);
        json = await response.json();
    };
    data_request();



    var questionsCount = 10;
    var score = 0;
    var timer = 20;
    var timerTime = timer;

    function resetTimer() {
        timer = timerTime;
    }


    var questionField = document.getElementById("question");
    var radioBtns = document.getElementsByClassName("OptionsText");
    let correctIndex;
    var testEnd = false;
    let digit = 0;


    // function firstQuestion() {
    //         console.log('first')

    //     let question = json[digit].question;
    //     console.log("digit = " + digit)
    //     let options = json[digit].options;
    //     correctIndex = json[digit].correctIndex;

    //     questionField.innerHTML = "Q" + (11 - questionsCount) + ". " + question;
    //     for (let i = 0; i < options.length; i++) {
    //         radioBtns[i].innerHTML = options[i];
    //     }

    //     resetRadioButton();
    //     resetTimer();

    //     json.splice(digit, 1);
    //     questionsCount--;
    //     digit++;
    //     nextQuestion();
    // }
    // function interval() {
    //     console.log('heree');
    //     var countDown = setInterval(() => {
    //         console.log('start')
    //         document.getElementById("timer").innerHTML = "00h:00m:" + timer + "s ";
    //         timer--;

    //         if (timer < 0) {
    //             nextQuestion();
    //         }
    //     }, 1000);
    // }


    function nextQuestion() {
        console.log('second')
        console.log(json);

        let userSelected = getRadioValue();

        if (questionsCount <= 0) {
            if (userSelected == correctIndex && testEnd == false) {
                score++;
            }
            clearInterval(countDown);
            console.log(json);

            document.getElementById("timer").innerHTML = "00h:00m:00s";
            document.getElementById("finalMessage").innerHTML = "Your score is " + score + " points.";
            $('#myModal').modal({
                backdrop: "static"
            });
            $("#myModal").modal();
            testEnd = true;
            return 0;
        }

        console.log(userSelected + " | " + correctIndex);
        if (userSelected == correctIndex) {
            score++;
        }
        console.log(json);

        let question = json[digit].question;
        console.log(question);

        let options = json[digit].options;
        correctIndex = json[digit].correctIndex;
        console.log("digit = " + digit)

        questionField.innerHTML = "Q" + (11 - questionsCount) + ". " + question;
        for (let i = 0; i < options.length; i++) {
            radioBtns[i].innerHTML = options[i];
        }
        // interval();
        resetRadioButton();
        resetTimer();
        questionsCount--;
        digit++;
    }

    function getRadioValue() {
        let options = document.getElementsByName('optradio');

        for (let i = 0; i < options.length; i++) {
            if (options[i].checked) {
                return options[i].value;
            }
        }

        return 0;
    }

    function resetRadioButton() {
        var opt = document.getElementsByName('optradio');
        for (i = 0; i < opt.length; i++) {
            opt[i].checked = false;
        }
    }

    function reloadPage() {
        window.location.reload();
    }

    nextQuestion();

    // var currentQuestion = 0;
    // var score = 0;
    // var totalQuestions = questions.length;

    // // var container = document.getElementById("quizContainer");
    // var questionEl = document.getElementById("question");
    // var opt1 = document.getElementById("opt1");
    // var opt2 = document.getElementById("opt2");
    // var opt3 = document.getElementById("opt3");
    // var opt4 = document.getElementById("opt4");

    // var nextButton = document.getElementById("nextButton");
    // var resultCont = document.getElementById("result");