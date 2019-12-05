// Store the HTML elements we need in variables and initalize other global variables
var quizContainer = document.querySelector('#quizContainer');
var startBtn = document.querySelector('#startQuiz');
var timerContainer = document.querySelector('#timeLeft');
var intro = document.querySelector('#intro');

// Initialize global variables
var currentQuestion = 0;

// This will hold the time left. Set the starting time based on how many questions there are.
var timeLeft = questions.length * 15;

// Go ahead and show the total time on the frontend
timerContainer.textContent = timeLeft;

// Add a listener to the Start button
startBtn.addEventListener('click', startQuiz);

function startQuiz(e) {
    intro.style.display = "none";
    loadQuestion();
}

function loadQuestion() {
    var currentQuestionInfo = questions[currentQuestion];
    var newRow = document.createElement('div');
    newRow.setAttribute('id',currentQuestion);

    var newQuestion = document.createElement('h3');
    newQuestion.textContent = currentQuestionInfo.title;

    newRow.appendChild(newQuestion);

    for (var i = 0; i < currentQuestionInfo.choices.length; i++) {
        var newChoice = document.createElement('div');
        newChoice.setAttribute('class','choice');
        var newButton = document.createElement('button');
        newButton.textContent = currentQuestionInfo.choices[i];
        newChoice.appendChild(newButton);
        newRow.appendChild(newChoice);
    }

    quizContainer.appendChild(newRow);
    
}