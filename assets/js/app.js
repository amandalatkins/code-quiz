// Store the HTML elements we need in variables and initalize other global variables
var quizContainer = document.querySelector('#quizContainer');
var startBtn = document.querySelector('#startQuiz');
var timerContainer = document.querySelector('#timeLeft');
var intro = document.querySelector('#intro');
var questionContainer = document.querySelector('#questionContainer');
var questionText = document.querySelector('#question');
var choicesContainer = document.querySelector('#choices');

// Initialize global variables
// Set current question to -1 so we can have loadQuestion function queue up question 0
var currentQuestion = -1;

// This will hold the time left. Set the starting time based on how many questions there are.
var timeLeft = questions.length * 15;

// Go ahead and show the total time on the frontend
timerContainer.textContent = timeLeft;

// Add a click istener to the Start button
startBtn.addEventListener('click', startQuiz);

// Add a click listener to the choicesContainer
choicesContainer.addEventListener('click',checkAnswer);

// Function to kick off the quiz
function startQuiz(e) {
    // Hide the intro
    intro.style.display = "none";
    // Run loadQuestion function
    loadQuestion();
}

//This function loads a question and choices into our DOM
function loadQuestion() {
    // Empty the choices container
    resetChoices();

    //Load the next question
    currentQuestion++;

    var currentQuestionInfo = questions[currentQuestion];
    questionText.textContent = currentQuestionInfo.title;

    // for each answer choice, do the following...
    for (var i = 0; i < currentQuestionInfo.choices.length; i++) {
        // Create a div and set its class to 'choice'
        var newChoice = document.createElement('div');
        newChoice.setAttribute('class','choice');
        
        // Create a button and set its text content to the choice
        var newButton = document.createElement('button');
        newButton.setAttribute('class','btn btn-secondary');
        newButton.textContent = currentQuestionInfo.choices[i];

        // Append the button to the choice div and append the choice div to the choicesContainer
        newChoice.appendChild(newButton);
        choicesContainer.appendChild(newChoice);
    }
    questionContainer.style.display = "block";
}

// Use this to clear out the choices div when loading a new question
function resetChoices() {
    choicesContainer.innerHTML = "";
}

// This function checks the selected answer and manipulates the DOM
function checkAnswer(e) {
    //Get the click target
    var target = e.target;
    
    //If the part of the container that was clicked on was a button
    if (target.matches('button')) {
        //Check the textContent of that button against the answer
        if (target.textContent == questions[currentQuestion].answer) {
            logCorrectAnswer(target);
        } else {
            logIncorrectAnswer(target);
        }
    }
}

function logCorrectAnswer(target) {

}

function logIncorrectAnswer(target) {
    
}