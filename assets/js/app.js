// Store the HTML elements we need in variables and initalize other global variables
var quizContainer = document.querySelector('#quizContainer');
var questionContainer = document.querySelector('#questionContainer');
var choicesContainer = document.querySelector('#choices');
var resultsContainer = document.querySelector('#quizResults');
var selectQuizContainer = document.querySelector('#selectQuizContainer');
var timerContainer = document.querySelector('#timeLeftContainer');
var timeLeftContainer = document.querySelector('#timeLeft');
var codeQuizIntro = document.querySelector('#codeQuizIntro');
var caliQuizIntro = document.querySelector('#caliQuizIntro');
var scoresContainer = document.querySelector('#highScores');
var introContainer = document.querySelector('#intro');

var selectQuiz = document.querySelector('#selectQuiz');
var questionText = document.querySelector('#question');

var finalScore = document.querySelector('#finalScore');
var initials = document.querySelector('#yourInitials');

var startBtn = document.querySelector('#startQuiz');
var submitScore = document.querySelector('#submitScore');
var viewScores = document.querySelector('#viewScores');

var theScores = document.querySelector('#theScores');

// This will store the active quiz
var activeQuiz;

//This will hold our questions array once a quiz is chosen
var questions = [];

// Set current question to -1 so we can have loadQuestion function queue up question 0
var currentQuestion = -1;
var currentQuestionInfo;

// This will hold the time left. Set the starting time based on how many questions there are.
var timeLeft;
var timer;
var secondsPerQuestion = 1;
var score = 0;
var activeQuiz;
var highScores = {};

// Add a click istener to the Start button
// startBtn.addEventListener('click', startQuiz);

// Add a click listener to the choicesContainer
choicesContainer.addEventListener('click',checkAnswer);

// Toggles the quiz intro
function toggleQuiz(e) {
    activeQuiz = e.target.value;
    if (activeQuiz == "JavaScript") {

        // Clear the page and display the correct intro
        hideAllDivs();
        codeQuizIntro.style.display="block";

        // Set the questions and timeLeft
        questions = codeQuestions;
        timeLeft = questions.length * secondsPerQuestion;
        timeLeftContainer.textContent = timeLeft;


    } else if (activeQuiz == "California") {

        // Clear the page and display the correct intro
        hideAllDivs();
        caliQuizIntro.style.display="block";

        // Set the questions and timeLeft
        questions = caliQuestions;
        timeLeft = questions.length * secondsPerQuestion;
        timeLeftContainer.textContent = timeLeft;
    }
}

// Function to kick off the quiz
function startQuiz(e) {

    if (e.target.matches('button')) {
        // Clear the page
        hideAllDivs();

        // Show the timer and set it;
        timerContainer.style.display = "block";
        setTimer();

        // Run loadQuestion function
        loadQuestion();
    }
}

function setTimer() {
    // set an interval to run every 1 second
    timer = setInterval(function() {
        //Subtract one from the timeLeft and display it on the frontend
        timeLeft--;
        timeLeftContainer.textContent = timeLeft;

        if (timeLeft <= 3) {
            
            if (timeLeft === 0) {
                // PLAY GAME OVER SOUND ***
            } else {
                // PLAY WARNING SOUND ***
            }
        }

        // When the time left gets to zero, clear the interval and end the quiz
        if (timeLeft === 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000)
    
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
    // Disable the choices so user doesn't accidentally hit another button
    disableChoices();

    target.classList.add('btn-success');
    score++;
    // PLAY CORRECT SOUND ***
    nextQuestion();
}

// This function handles an incorrect answer
function logIncorrectAnswer(target) {
    // Disable the choices so user doesn't accidentally hit another button
    disableChoices();

    target.classList.add('btn-danger');

    // PLAY INCORRECT SOUND ***

    // Deduct some time from the timer
    timeLeft += -5;

    //Let's also highlight what the correct answer was by looping all the choices until we find the one that matches the answer
    var options = document.querySelectorAll('.choice');
    for (var i = 0; i < options.length; i++) {
        if (options[i].children[0].textContent == currentQuestionInfo.answer) {
            options[i].children[0].classList.add('btn-success');
        }
    }
    nextQuestion();
}

function disableChoices() {
    for (var i = 0; i < choicesContainer.children.length; i++) {
        choicesContainer.children[i].children[0].setAttribute('disabled','');
    }
}

//calls the loadQuestion function after .8 seconds
function nextQuestion() {
    setTimeout(function() {
        loadQuestion();
    }, 800);
}

//Ends the quiz and calculates score
function endQuiz() {
    // In case the time is still running, clear it
    clearInterval(timer);

    // Clear the page
    hideAllDivs();
    loadQuizResults();
}

//Load the quiz results
function loadQuizResults() {
    // Display the final score as a percentage because that's prettier
    finalScore.textContent = (score / questions.length)*100 + "%";
    // Now display the results container
    resultsContainer.style.display = "block";
}

//Save the high score in local storage
function saveScore(e) {
    // Let's grab our stored scores
    var getScores = localStorage.getItem('scores');
    
    // If there are scores stored, let's overwite our highScores array with them
    if (getScores) {
        highScores = JSON.parse(getScores);
    }

    //Now based on which quiz, let's store our score
    if (activeQuiz == "JavaScript") {
        console.log('active quiz is javascript');
        if (highScores.jsquiz) {
            console.log('found some scores for js already');
            highScores.jsquiz.push(saveScoreArray());
        } else {
            console.log('no js, saving into new node');
            console.log(yourInitials.value+ ": "+finalScore.textContent);
            highScores.jsquiz = [saveScoreArray()];
        }

    } else if (activeQuiz == "California") {
        if (highScores.caquiz) {
            highScores.caquiz.push(saveScoreArray());
        } else {
            highScores.caquiz = [saveScoreArray()];
        }
    }  

    console.log(highScores);
    
    localStorage.setItem('scores',JSON.stringify(highScores));
    localStorage.setItem('test','test');

    showHighScores();
}

function saveScoreArray() {
    console.log('setting up score array');
    return {
        initials: yourInitials.value,
        score: finalScore.textContent
    }
}

function showHighScores() {
    hideAllDivs();
    theScores.innerHTML = "";
    var getScores = localStorage.getItem('scores');
    scoresContainer.style.display = "block";
    if (!getScores) {
        var newP = document.createElement('p');
        newP.textContent = "No high scores saved!";
        theScores.appendChild(newP);
    }

    
}

// This function clears out the main quiz area
function hideAllDivs() {
    introContainer.style.display = "none";
    codeQuizIntro.style.display = "none";
    caliQuizIntro.style.display = "none";
    questionContainer.style.display = "none";
    resultsContainer.style.display = "none";
    scoresContainer.style.display = "none";
}



// All of our listeners will live here
selectQuiz.addEventListener('change',toggleQuiz);
codeQuizIntro.addEventListener('click',startQuiz);
caliQuizIntro.addEventListener('click',startQuiz);
submitScore.addEventListener('click',saveScore);
viewScores.addEventListener('click',showHighScores);