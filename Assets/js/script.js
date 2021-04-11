// define variables for containers
var Container1 = document.querySelector("header"); 
var Container2 = document.querySelector("#Container2");
var Container3 = document.querySelector("#Container3");
var Container4 = document.querySelector("#Container4"); 
var Container5 = document.querySelector("#Container5");


// quiz start
var StartButton = document.querySelector("#start-button");
StartButton.addEventListener("click", StartCodeQuiz)

function Start() {

// View & Shield Containers
Container1.setAttribute("class", "View");
Container2.setAttribute("class", "Shield");
Container3.setAttribute("class", "View");
Container4.setAttribute("class", "Shield");
Container5.setAttribute("class", "Shield");

// Timer Start
TimerStart();
// Show Questions
ShowQuestion();
}

function Results() {

    // View & Shield applicable containers
    Container1.setAttribute("class", "View");
    Container2.setAttribute("class", "Shield");
    Container3.setAttribute("class", "Shield");
    Container4.setAttribute("class", "View");
    Container5.setAttribute("class", "Shield");

    // View Results and Stop Timer
    userResults.textContent = timeLeft;
    countdownTimer.textContent = timeLeft;
    clearInterval(timeInterval);
} 

//Timer Function

var countdownTimer = document.querySelector("#countdown");
var timeLeft = 76;
var timeInterval;

function startTimer() {
    timeInterval = setInterval(function () {
        
        // Timer count down 
        timeLeft--;
        countdownTimer.textContent = timeLeft;
        
        // when timer is zero, quiz ends
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}
