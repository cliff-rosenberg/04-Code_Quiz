// Store the questions and answers here in this array
var questionsStore = [
    {question: "Which if these is NOT a data type for a variable?",
    choices: ["Boolean", "Numeric", "String", "HTML"],
    answer: "HTML",
},
    {question: "The condition checked for in an If/Then statement is enclosed inside ________.",
    choices: ["Curly Brackets", "Square Brackets", "Quotes", "Parenthesis"],
    answer: "Parenthesis",
},
    {question: "String values must be enclosed inside _____________ when being assigned to variables.",
    choices: ["Curly Brackets", "Square Brackets", "Quotes", "Parenthesis"],
    answer: "Quotes",
},
    {question: "The command used to output to the Console is ____________",
    choices: ["Command Prompt", "Javascript", "HTML", "console.log"],
    answer: "console.log",
},
];

// Initialize global variables here
var currQuestionIdx = 0;
var timer = document.querySelector("#time");
var countdownTimer = questionsStore.length * 15;
var intervalForTimer;
var quizContain = document.querySelector("#container-quiz");
var quizButton = document.getElementById("quiz-btn");
var restartButton = document.getElementById("restart-btn");
var storePlayerScore = document.querySelector('#localScoreboard');
var playerName = document.querySelector('#playername');
var storedList = document.querySelector('#storedList');
var saved = localStorage.getItem('playername');

// This function ends the game and stops the game timer
function gameOver() {
    if (document.getElementById("answer-result-text")) {
        document.getElementById("answer-result-text").style.visibility = "hidden";
    };
    quizContain.innerHTML = "<h1>Game Over</h1>";
    document.getElementById("save-high-score").style.visibility = "visible";
    if (localStorage.getItem('playername')) {
        document.getElementById('storedList').innerHTML = localStorage.getItem("playername");
        localStorage.removeItem("playername");
    }
    clearInterval(intervalForTimer);
};

// This is the game timer control
function runTimer() {
    countdownTimer--;
    timer.textContent = "Timer: " + countdownTimer;
    if (countdownTimer <= 0) {
        gameOver();
    };
};

// This function generates the game questions from the stored array values
function questionGen() {
    // This IF checks for the end of the questions array index, which will end the game
    if (currQuestionIdx !== questionsStore.length) {
        var question = document.createElement("p");
        question.textContent = questionsStore[currQuestionIdx].question;
        var listAnswers = document.createElement("div");
        listAnswers.classList.add("answer-choices");
        // Loop through the question answer choices
        for (let i = 0; i < questionsStore[currQuestionIdx].choices.length; i++){
            var choiceOffer = document.createElement("div");
            choiceOffer.textContent = questionsStore[currQuestionIdx].choices[i];
            listAnswers.append(choiceOffer);
         };
    quizContain.append(question);
    quizContain.append(listAnswers);
    } else {
        gameOver();
    };
    
};

// Answered to questions are checked here after they are clicked on
function answerChecked(event) {
    var answerGiven = event.target.textContent;
    var correctAnswer = document.createElement("p");
    correctAnswer.id = "answer-result-text";
    if (answerGiven === questionsStore[currQuestionIdx].answer){
        correctAnswer.textContent = "That is correct!";
        timer.append(correctAnswer);
    } else {
        correctAnswer.textContent = "That is incorrect!";
        countdownTimer -= 5;
        timer.append(correctAnswer);
    };
    quizContain.innerHTML = "";
    currQuestionIdx++;
    questionGen();
};

// Starts the quiz game here
function quizStart() {
    document.getElementById("quiz-btn").style.visibility = "hidden";
    timer.textContent = "Timer: " + countdownTimer;
    // call the function to generate the first question, which starts the game
    questionGen();
    // set up the interval timer for the game
    intervalForTimer = setInterval(runTimer, 1000);
};

// function to restart game if "Restart Game" button is clicked
function restartGame() {
    localStorage.removeItem("playername");
    location.reload();
};

// Event Listener for "Quiz Start" button
quizButton.addEventListener("click", quizStart);

// Event Listener for answered to quiz questions
quizContain.addEventListener("click", answerChecked);

// Event Listener for "Submit" button to store player time score
storePlayerScore.addEventListener('submit', function (event) {

	// Don't submit the form
	event.preventDefault();

	// Ignore it if the playername item is empty
	if (playerName.value.length < 1) return;

	// Add item to playername
	storedList.innerHTML += '<li>' + playerName.value + ' ------ Time =   ' + countdownTimer + '</li>';

    // Save the list to localStorage
	localStorage.setItem('playername', storedList.innerHTML);

	// Clear input
	playerName.value = '';
  
}, false);

// Event Listener for "Restart Game" button
restartButton.addEventListener("click", restartGame);
