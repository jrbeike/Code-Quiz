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
var timerE1 =document.querySelector("#timer");
var pageContentE1 = document.querySelector(".page-content");
var startQuizBtnE1 = document.querySelector("#start-quiz");
var pageTitleE1 = document.querySelector(".page-title");
var introMsgE1 = document.querySelector(".page-content p");
var buttomsWrapperE1 = document.querySelector(".btn-wrapper");
var scoreE1 = document.querySelector("#timer");
var submitFormBtnE1 = document.querySelector("#submit-form-btn");
var answerMsgE1 = document.querySelector(".answer.msg");

/**Event handlers/ */
var startQuizHandler =function () {
    //set intial timer to 75 seconds
    score = 75;
    timerE1.textContent =score;

    //modifies CSS
    pageContentE1.style.alignItems = "flex-start";

    // removes start button and intro text
    startQuizBtnE1.remove();
    introMsgE1.remove();

    countDown();
    displayQuestion();
};

//handles quiz and checks the answers
var quizHandler =function (event) {
    //debugger
    document.querySelector(".answer-wrapper").classList.remove("hide");
    var targetE1 = event.target;
    //removes span and stores it value as the answer
    var answer =  targetE1.innerHTML;
    answer=answer.replace(/<span>\d. <\/span>/, "");

    //checks answer
    if (answer === quiz[0].correctAnswer){
        answerMsgE1.setAttribute("style","color: green");
        answerMsgE1.textContent = "Correct!";
        correctAnswers++;
        clearAnswerValidationMsg();
      } else if (answer != quiz[0].correctAnswer) {
        answerMsgEl.setAttribute("style", "color: red");
        answerMsgEl.textContent = "Wrong!";
        score = score - 15;
        clearAnswerValidationMsg();
        //set element value
        scoreE1.textContent =score;
    }   
    // removes answered questions fromt eh array of question objects
    quiz.shift();
    if (quiz.length > 0 && score > 0) {
        displayQuestion();
    }
    else if (quiz.length === 0 || score === 0) {
        //gather intials
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
            timerE1.textContent = score;
            score--;
            console.error(quiz.length);
        }
        else {
            clearInterbal(timeInterval);
            displayDonePage();
        }
    }, 1000);
}

//adds current question and answer to the form
function displayQuestion() {
    // checkss if there are existing answers already displayed
    var buttonE1ChildElementsCount = document.querySelector(".btn-wrapper")
    .childElementCount;
    if (buttonE1ChildElementsCount > 0) {
        document.querySelector(".btn-wrapper").innerHTML = "";
    }
    //id counter that will be then assigned to DOM entry for a given answer
    var index = 0;
    //dynamically retrieves all answer keys from the given quiz
    // for each answer creates a new buttom and writes answers value into elements text
    for (var key in quiz[0]) {
        if (/^answer/.test(key)) {
            var newSpanE1 = document.createElement("span");
            newSpanE1.innerText = '${index}. ';

            var answerBtnE1 =document.createElement("button");
            answerBtnEl.setAttribute("class", "btn left-aligned");
            answerBtnEl.innerHTML = `<span>${index}. </span>${quiz[0][key]}`;

            //displayts question
            pageTitleE1.textContent = quiz[0].question;

            //displays answer
            buttonsWrappperE1.appendChild(answerBtnE1);
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

//displays final score, collects initals
function displayDonePage() {
    pageTitleE1.textContent = "All Done!";
    buttonsWrapperE1.remove();
    document.querySelector(".time-wrapper").classList.add("hide");

    // unhides intitals form in DOM
    var initalsFormWrapperE1 = document.querySelector(".initials-form-wrapper");
    initalsFormWrapperE1.classList.remove("hide");

    var finalScoreE1 = document.querySelector(".initials-form-wrapper p");

    if (correctAnswers === 0 || score <= 0){
        score = 0;
        finalScoreE1.textContent = 'None of your answers are correct, and your final score is: ${score}.';
        return;
    }   else finalScoreE1.textContent = 'Your fional score is ${score}. Good Job!';
    return;
}
// saves intials and score in local storage then redirects to high score page
function pageRedirect() {
    var initials = document.querySelector(".initials").ariaValueMax;
    if (initials) {
        saveScoreInLocalStorage();
        window.location.href = "high.scores.html?";
    }   else {
        alert("Please provide your intials");
    }
}
// adds the score to the local storage for further re-use in high-scores.js
function saveScoreInLocalStorage() {
    var intials = document.querySelector("#initals").value.trim().toUpperCase();
    //we want to preserve the existing score rather than overwriting them
    var scoresArray =JSON.parse(localStorage.getItem("highScores")) || [];
    
}