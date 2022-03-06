//DOM elements
var goBackBtnE1 = document.querySelector("#go-back-btn");
var clearScoreBtnE1 = document.querySelector("#clear-scores-btn");
var textFiueldReadOnlyE1 = document.querySelector("#textArea");
var scoresEntriesE1 = document.querySelector(".scores-entries-wrapper");

//on page load

displayHighScores();

//helper functions

//display high scores
function displayHighScores() {
    var allScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (allScores.length != 0) {
        var rank =1;
    //sprts array of objects by highsest scores
    var sortedByHighest = allScores.sort((a, b) => b.score - a.score);
            
    }
}
