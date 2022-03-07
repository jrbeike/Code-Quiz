/*Global variables */

var score = 0;
var correctAnswers = 0;
var quiz = [
    {
        question: "Commonly used data types DO Not Include:",
        answer1: "strings",
        answer2: "booleans",
        answer3: "alerts",
        answer4: "numbers",
        correctAnswer: "alerts",

    },
    {
        question: "The condition if an if / else statement is enclosed with _________.",
        answer1: "quotes",
        answer2: "curly brackets",
        answer3: "parenthesis",
        answer4: "square brackets",
        correctAnswer: "parenthesis",

    },
    {
        question: "Arrays in JavaScript can be used store ________.",
        answer1: "numbers and strings",
        answer2: "other arrays",
        answer3: "booleans",
        answer4: "all of the above",
        correctAnswer: "all of the above",

    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answer1: "commas",
        answer2: "curly brackets",
        answer3: "quotes",
        answer4: "parenthesis",
        correctAnswer: "quotes",

    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
        answer1: "Javascript",
        answer2: "terminal/bash",
        answer3: "for loops",
        answer4: "console.log()",
        correctAnswer: "console.log()",

    },
];

/*global dom variables*/
var timerEl =document.querySelector("#timer");
var pageContentEl = document.querySelector(".page-content");
var startQuizBtnEl = document.querySelector("#start-quiz");
var pageTitleEl = document.querySelector(".page-title");
var introMsgEl = document.querySelector(".page-content p");
var buttonsWrapperEl = document.querySelector(".btn-wrapper");
var scoreEl = document.querySelector("#timer");
var submitFormBtnEl = document.querySelector("#submit-form-btn");
var answerMsgEl = document.querySelector(".answer-msg");

/**Event handlers/ */
var startQuizHandler =function () {
    //set intial timer to 75 seconds
    score = 75;
    timerEl.textContent = score;

    //modifies CSS
    pageContentEl.style.alignItems = "flex-start";

    // removes start button and intro text
    startQuizBtnEl.remove();
    introMsgEl.remove();

    countDown();
    displayQuestion();
};

//handles quiz and checks the answers
var quizHandler =function (event) {
    //debugger
    document.querySelector(".answer-wrapper").classList.remove("hide");
    var targetEl = event.target;
    //removes span and stores it value as the answer
    var answer =  targetEl.innerHTML;
    answer=answer.replace(/<span>\d. <\/span>/, "");

    //checks answer
    if (answer === quiz[0].correctAnswer){
        answerMsgEl.setAttribute("style","color: green");
        answerMsgEl.textContent = "Correct!";
        correctAnswers++;
        clearAnswerValidationMsg();
      } else if (answer != quiz[0].correctAnswer) {
        answerMsgEl.setAttribute("style", "color: red");
        answerMsgEl.textContent = "Wrong!";
        score = score - 15;
        clearAnswerValidationMsg();
        //set element value
        scoreEl.textContent =score;
    }   
    // removes answered questions fromt eh array of question objects
    quiz.shift();
    if (quiz.length > 0 && score > 0) {
        displayQuestion();
    }
    else if (quiz.length === 0 || score === 0) {
        //gather initials
        displayDonePage();
    }
};

//submuit the iniutials and score form
var submitScoreFormHandler = function() {
    pageRedirect();
};

//handles countdown
function countDown(){
    //use the set interbal method to call a fucntuion to be executed every 1000 ms
    var timeInterval = setInterval(function () {
        // as long as the score is grater than 1 and there are no mroe questions left
        //keep counting doiwn
        if (score >= 1 && quiz.length >=1) {
            timerEl.textContent = score;
            score--;
            console.error(quiz.length);
        }
        else {
            clearInterval(timeInterval);
            displayDonePage();
        }
    }, 1000);
}

//adds current question and answer to the form
function displayQuestion() {
    // checkss if there are existing answers already displayed
    var buttonElChildElementsCount = document.querySelector(".btn-wrapper")
    .childElementCount;
    if (buttonElChildElementsCount > 0) {
        document.querySelector(".btn-wrapper").innerHTML = "";
    }
    //id counter that will be then assigned to DOM entry for a given answer
    var index = 0;
    //dynamically retrieves all answer keys from the given quiz
    // for each answer creates a new buttom and writes answers value into elements text
    for (var key in quiz[0]) {
        if (/^answer/.test(key)) {
            var newSpanEl = document.createElement("span");
            newSpanEl.innerText = `${index}. `;

            var answerBtnEl =document.createElement("button");
            answerBtnEl.setAttribute("class", "btn left-aligned");
            answerBtnEl.innerHTML = `<span>${index}. </span>${quiz[0][key]}`;

            //displayts question
            pageTitleEl.textContent = quiz[0].question;

            //displays answer
            buttonsWrapperEl.appendChild(answerBtnEl);
        }
        index++;    
    }
    return;
}

//clears answer validations msg
function clearAnswerValidationMsg(){
    setTimeout(function () {
        document.querySelector(".answer-wrapper").classList.add("hide");
    }, 2000);
}

//displays final score, collects initials
function displayDonePage() {
    pageTitleEl.textContent = "All Done!";
    buttonsWrapperEl.remove();
    document.querySelector(".timer-wrapper").classList.add("hide");

    // unhides intitals form in DOM
    var initialsFormWrapperEl = document.querySelector(".initials-form-wrapper");
    initialsFormWrapperEl.classList.remove("hide");

    var finalScoreEl = document.querySelector(".initials-form-wrapper p");

    if (correctAnswers === 0 || score <= 0){
        score = 0;
        finalScoreEl.textContent = `None of your answers are correct, and your final score is: ${score}.`;
        return;
    }   else finalScoreEl.textContent = `Your fional score is ${score}. Good Job!`;
    return;
}
// saves initials and score in local storage then redirects to high score page
function pageRedirect() {
    var initials = document.querySelector("#initials").value;
    if (initials) {
        saveScoreInLocalStorage();
        window.location.href = "high-scores.html?";
    }   else {
        alert("Please provide your initials");
    }
}
// adds the score to the local storage for further re-use in high-scores.js
function saveScoreInLocalStorage() {
    var initials = document.querySelector("#initials").value.trim().toUpperCase();
    //we want to preserve the existing score rather than overwriting them
    var scoresArray =JSON.parse(localStorage.getItem("highScores")) || [];
    // handles score update for the existing user
    if (scoresArray.length !=0) {
        for (var i = 0; i < scoresArray.length; i++) {
            // if existing user, check current score
            // and only update if current score is grater than existing score for this user
            if (scoresArray[i].initials === initials) {
                window.alert(
                    "Looks like you already are in our system, we will go ahead and upddate your highest score."
                );
                var existingUserRecord = parseInt(scoresArray[i].score);
                if (existingUserRecord < score) {
                    scoresArray.splice(i, 1);
                    var highScore = {
                        initials: initials,
                        score: score,
                    };
                    break;
                }   else return;
            }else if (scoresArray[i].initials != initials){
                var highScore ={
                    initials: initials,
                    score: score,
                };
            }
        }
        scoresArray.push(highScore);
        localStorage.setItem("highScores", JSON.stringify(scoresArray));
        return;
        //if new user then create and push the score object to the array
    }else {
        var highScore= {
            initials: initials,
            score: score,
        };
        scoresArray.push(highScore);
        localStorage.setItem("highScores", JSON.stringify(scoresArray));
    }
}

/***Event Listeners */

startQuizBtnEl.addEventListener("click", startQuizHandler);
buttonsWrapperEl.addEventListener("click", quizHandler);
submitFormBtnEl.addEventListener("click", submitScoreFormHandler);