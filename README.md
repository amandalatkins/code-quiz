# Quiz Application

## Summary

This is an application that runs numerous quizzes to test a user's knowledge. The application features sound and display effects to enhance the experience as well as the ability to persistently save scores using local storage.

## Prerequisites

- Web Browser (Chrome, Safari, Firefox, etc)
- [JavaScript](https://enablejavascript.co/)
- [Local Storage](https://voicethread.com/howto/enabling-cookies/)

## Installing

Copy the repository link.

```
https://github.com/amandalatkins/code-quiz.git
```

Clone the repository to your local development environment

```
git clone https://github.com/amandalatkins/code-quiz.git
```

Open ``index.html`` in your prefered web browser

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Bootstrap](https://getbootstrap.com)

## Deployed Link

* [See Live Site](https://amandalatkins.github.io/code-quiz)

## Screenshots

![Quiz Intro](/assets/images/quiz-intro.png)
![Quiz Question](/assets/images/quiz-question.png)
![High Scores](/assets/images/high-scores.png)

## Code Snippets

The following snippet shows the function that sets the quiz timer.

```
    function setTimer() {
    // Just in case there's an interval already set, let's clear it
    clearInterval(timer);

    // set an interval to run every 1 second
    timer = setInterval(function() {
        //Subtract one from the timeLeft and display it on the frontend
        timeLeft--;
        timeLeftContainer.textContent = timeLeft;
            
        // If there are 10 seconds left, warn the player
        if (timeLeft <= 10) {
            // If the player hasn't been warned yet
            if (!timeWarning) {
                warningSound.play();
                timerContainer.classList.add('bg-danger');
                timeWarning = true;
            }
            // Don't do anything if the player has already received the warning
        }

        // When the time left gets to zero, clear the interval and end the quiz
        if (timeLeft === 0) {
            // Play timer ran out sound
            timeOverSound.play();
            clearInterval(timer);
            endQuiz();
        }
    }, 1000)
    
}
```

## Authors

* ### Amanda Atkins
    - [Portfolio](https://digitalrainstorm.com)
    - [Github](https://github.com/amandalatkins)
    - [LinkedIn](https://www.linkedin.com/in/amandalatkins)

See also the list of [contributors](https://github.com/amandalatkins/code-quiz/contributors) who participated in this project.

## License

This project is licensed under the MIT License.

Sound effects are licensed under [ZapSplat's Standard License](https://www.zapsplat.com/license-type/standard-license/).

## Acknowledgments

* [ZapSplat](https://www.zapsplat.com) for the sound effects
