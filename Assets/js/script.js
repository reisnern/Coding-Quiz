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

//Start Questions
var questions = document.querySelector("#questions");
var ChoiceOne = document.querySelector(".Choice-1");
var ChoiceTwo = document.querySelector(".Choice-2");
var ChoiceThree = document.querySelector(".Choice-3");
var ChoiceFour = document.querySelector(".Choice-4");
var quizIndex = 0;
var quiz = [
    {
        question: "Commonly used data types DO NOT include:",
        
        Choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        Choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        Choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        Choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        Choices: ["JavaScript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];

//Questions 
function ShowQuestion() {
    var AskQuestions = quiz[quizIndex];

    // quiz ends after the last question is rendered
    if (quizIndex === quiz.length) {
        endQuiz();
    } else {
        questions.innerHTML = AskQuestions.question;
        ChoiceOne.innerHTML = AskQuestions.Choices[0];
        ChoiceTwo.innerHTML = AskQuestions.Choices[1];
        ChoiceThree.innerHTML = AskQuestions.Choices[2];
        ChoiceFour.innerHTML = AskQuestions.Choices[3];  
    }
}
// Answers To Questions
questions.addEventListener("click", ShowAnswer);
ChoiceTwo.addEventListener("click", ShowAnswer);
ChoiceThree.addEventListener("click", ShowAnswer);
ChoiceFour.addEventListener("click", ShowAnswer);

var Contaianer4 = document.querySelector("#container4"); 

function ShowAnswer (event) {
    var selectedChoice = event.target;
    
    // Show if Answer is Correct or Not
    if (selectedChoice.textContent === quiz[quizIndex].answer) {
        
        // Show next question
        quizIndex++;
        ShowQuestion();

        // Answer is Correct
        Container4.setAttribute("class", "View");
        Container4.textContent = "Correct!";
        setTimeout(function () {
            Container4.textContent = "";    
        }, 1000);
    } else {
        
        // time counts down and shows the next question
        timeLeft -= 10;
        quizIndex++;
        renderQuestion();

        // Answer is Incorrect
        Container4.setAttribute("class", "View");
        Container4.textContent = "Incorrect!";
        setTimeout(function () {
            Container4.textContent = "";    
        }, 1000);
    }
}