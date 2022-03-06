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
    for (var i = 0; i < sortedByHighest.length; i++) {
        var scoreEntryE1 = document.createElement("textarea");
        scoreEntryE1.readOnly =true;
        scoreEntryE1.setAttribute("class", "score-entry");
        scoreEntryE1.value = `${rank}. ${sortedByHighest[i].initials}: ${sortedByHighest[i].score}`;
        scoresEntriesE1.appendChild(scoreEntryE1);
        if (i == 0) {
            // highlights highest score
            scoresEntriesE1.firstElementChild.setAttribute(
                "style",
                "background-color: cyan; text-align:center; color: red; font-size: 16pt"
            );
            scoreEntryE1.value = `${rank}. 🏅${sortedByHighest[i].initials}: ${sortedByHighest[i].score}🏅`;
        }
        rank++;
    }
    } else {
        handleNoScoresStyling();
    }     
}
// handles empy scores list
function handleNoScoresStyling() {
    clearScoreBtnE1.setAttribute("class", "hide");
    var headerE1 = document.createElement("p");
    headerE1.setAttribute(
        "style",
        "color: green; font-size: 24pt; background: tan"
    );
    headerE1.textContent =
        "You to be the first score! Go ahead and take the quiz!";
    scoresEntriesE1.appendChild(headerE1);
}

//event handler
// clears all scores from local storage
var clearScoreHandler = function () {
    if (confirm("Are you sure you want to clear the high scores?")) {
        localStorage.removeItem("highScores");
        scoresEntriesE1.innerHTML ="";
        handleNoScoresStyling();
    }
};

///event listeners

clearScoreBtnE1.addEventListener("click", clearScoreHandler);
