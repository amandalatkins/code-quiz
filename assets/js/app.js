// Store the HTML elements we need in variables and initalize other global variables
var quizContainer = document.querySelector('#quizContainer');
var questionContainer = document.querySelector('#questionContainer');
var choicesContainer = document.querySelector('#choices');
var resultsContainer = document.querySelector('#quizResults');
var selectQuizContainer = document.querySelector('#selectQuizContainer');
var timerContainer = document.querySelector('#timerContainer');
var timeLeftContainer = document.querySelector('#timeLeft');
var codeQuizIntro = document.querySelector('#codeQuizIntro');
var caliQuizIntro = document.querySelector('#caliQuizIntro');

var scoresContainer = document.querySelector('#highScores');

var questionText = document.querySelector('#question');

var finalScore = document.querySelector('#finalScore');
var initials = document.querySelector('#yourInitials');

var startBtn = document.querySelector('#startQuiz');
var submitScore = document.querySelector('#submitScore');

var scoresList = document.querySelector('#scoresList');

// Initialize global variables

// This will store the active quiz
var activeQuiz;

// Set current question to -1 so we can have loadQuestion function queue up question 0
var currentQuestion = -1;
var currentQuestionInfo;



// This will hold the time left. Set the starting time based on how many questions there are.
var timeLeft = questions.length * 15;
var score = 0;



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

    // if currentQuestion is equal to the length of questions then the quiz is over
    if (currentQuestion == questions.length) {
        return endQuiz();
    }

    currentQuestionInfo = questions[currentQuestion];
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
    
    //If the part of the container that was clicked was a button
    if (target.matches('button')) {
        //Check the textContent of that button against the answer
        if (target.textContent == currentQuestionInfo.answer) {
            logCorrectAnswer(target);
        } else {
            logIncorrectAnswer(target);
        }
    }
}

// This function handles a correct answer
function logCorrectAnswer(target) {
    target.classList.add('btn-success');
    score++;
    nextQuestion();
}

// This function handles an incorrect answer
function logIncorrectAnswer(target) {
    target.classList.add('btn-danger');

    //Let's also highlight what the correct answer was by looping all the choices until we find the one that matches the answer
    var options = document.querySelectorAll('.choice');
    for (var i = 0; i < options.length; i++) {
        if (options[i].children[0].textContent == currentQuestionInfo.answer) {
            options[i].children[0].classList.add('btn-success');
        }
    }r
    nextQuestion();
}

//calls the loadQuestion function after 1 second
function nextQuestion() {
    setTimeout(function() {
        loadQuestion();
    }, 1000);
}

//Ends the quiz and calculates score
function endQuiz() {
    // Hide the question div
    questionContainer.style.display = "none";
    loadQuizResults();
}

//Load the quiz results
function loadQuizResults() {
    // Display the final score as a percentage because that's prettier
    finalScore.textContent = (score / questions.length)*100 + "%";
    // Now display the results container
    resultsContainer.style.display = "block";
}

