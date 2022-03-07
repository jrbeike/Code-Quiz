//DOM elements
var goBackBtnEl = document.querySelector("#go-back-btn");
var clearScoreBtnEl = document.querySelector("#clear-scores-btn");
var textFieldReadOnlyEl = document.querySelector("textArea");
var scoresEntriesEl = document.querySelector(".scores-entries-wrapper");

//on page load

displayHighScores();

//helper functions

//display high scores
function displayHighScores() {
    var allScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (allScores.length != 0) {
        var rank = 1;
    //sprts array of objects by highsest scores
    var sortedByHighest = allScores.sort((a, b) => b.score - a.score);
    for (var i = 0; i < sortedByHighest.length; i++) {
        var scoreEntryEl = document.createElement("textarea");
        scoreEntryEl.readOnly = true;
        scoreEntryEl.setAttribute("class", "score-entry");
        scoreEntryEl.value = `${rank}. ${sortedByHighest[i].initials}: ${sortedByHighest[i].score}`;
        scoresEntriesEl.appendChild(scoreEntryEl);
        if (i == 0) {
            // highlights highest score
            scoresEntriesEl.firstElementChild.setAttribute(
                "style",
                "background-color: cyan; text-align:center; color: red; font-size: 16pt"
            );
            scoreEntryEl.value = `${rank}. ${sortedByHighest[i].initials}: ${sortedByHighest[i].score}`;
        }
        rank++;
    }
    } else {
        handleNoScoresStyling();
    }     
}
// handles empy scores list
function handleNoScoresStyling() {
    clearScoreBtnEl.setAttribute("class", "hide");
    var headerEl = document.createElement("p");
    headerEl.setAttribute(
        "style",
        "color: white; font-size: 24pt; background: gray"
    );
    headerEl.textContent =
        "You get to be the first score! Go ahead and take the quiz!";
    scoresEntriesEl.appendChild(headerEl);
}

//event handler
// clears all scores from local storage
var clearScoreHandler = function () {
    if (confirm("Are you sure you want to clear the high scores?")) {
        localStorage.removeItem("highScores");
        scoresEntriesEl.innerHTML = "";
        handleNoScoresStyling();
    }
};

///event listeners

clearScoreBtnEl.addEventListener("click", clearScoreHandler);
