// Define variables for containers
var HeaderE = document.querySelector("header"); 
var ContainerOne = document.querySelector("#Container1");
var ContainerTwo = document.querySelector("#Container2");
var ContainerThree = document.querySelector("#Container3"); 
var ContainerFive = document.querySelector("#Container5");


// quiz start
var StartButton = document.querySelector("#start-button");
StartButton.addEventListener("click", StartCodeQuiz)

function StartCodeQuiz() {

    // View & Shield Containers
    HeaderE.setAttribute("class", "View");
    ContainerOne.setAttribute("class", "Shield");
    ContainerTwo.setAttribute("class", "View");
    ContainerThree.setAttribute("class", "Shield");
    ContainerFive.setAttribute("class", "Shield");

    // Timer Start
    TimerStart();
    // Show Questions
    ShowQuestion();
}

function Results() {

    // View & Shield applicable containers
    HeaderE.setAttribute("class", "View");
    ContainerOne.setAttribute("class", "Shield");
    ContainerTwo.setAttribute("class", "Shield");
    ContainerThree.setAttribute("class", "View");
    ContainerFive.setAttribute("class", "Shield");

    // View Results and Stop Timer
    userResults.textContent = timeLeft;
    countdownTimer.textContent = timeLeft;
    clearInterval(timeInterval);
} 

//Timer Function
var countdownTimer = document.querySelector("#countdown");
var timeLeft = 76;
var timeInterval;

function TimerStart() {
    timeInterval = setInterval(function () {
        
        // Timer count down 
        timeLeft--;
        countdownTimer.textContent = timeLeft;
        
        // when timer is zero, quiz ends
        if (timeLeft <= 0) {
            Results();
        }
    }, 1000);
}

//Start Questions
var Questions = document.querySelector("#questions");
var ChoiceOne = document.querySelector(".Choice-1");
var ChoiceTwo = document.querySelector(".Choice-2");
var ChoiceThree = document.querySelector(".Choice-3");
var ChoiceFour = document.querySelector(".Choice-4");
var QuizIndex = 0;
var Quiz = [
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
    var AskQuestions = Quiz[QuizIndex];

    // Quiz ends after the last question is Answered
    if (QuizIndex === Quiz.length) {
        Results();
    } else {
        questions.innerHTML = AskQuestions.question;
        ChoiceOne.innerHTML = AskQuestions.Choices[0];
        ChoiceTwo.innerHTML = AskQuestions.Choices[1];
        ChoiceThree.innerHTML = AskQuestions.Choices[2];
        ChoiceFour.innerHTML = AskQuestions.Choices[3];  
    }
}

// Answers To Questions
ChoiceOne.addEventListener("click", ShowAnswer);
ChoiceTwo.addEventListener("click", ShowAnswer);
ChoiceThree.addEventListener("click", ShowAnswer);
ChoiceFour.addEventListener("click", ShowAnswer);

var ContainerFour = document.querySelector("#Container4"); 

function ShowAnswer (event) {
    var selectedChoice = event.target;
    
    // Show if Answer is Correct or Not
    if (selectedChoice.textContent === Quiz[QuizIndex].answer) {
        
        // Show next question
        QuizIndex++;
        ShowQuestion();

        // Answer is Correct
        ContainerFour.setAttribute("class", "View");
        ContainerFour.textContent = "Correct!";
        setTimeout(function () {
            ContainerFour.textContent = "";    
        }, 1000);
    } else {
        
        // time counts down and shows the next question
        timeLeft -= 10;
        QuizIndex++;
        ShowQuestion();

        // Answer is Incorrect
        ContainerFour.setAttribute("class", "View");
        ContainerFour.textContent = "Incorrect!";
        setTimeout(function () {
            ContainerFour.textContent = "";    
        }, 1000);
    }
}


// Scoring Functions
var Submit = document.querySelector("#Submit");
Submit.addEventListener("click", Save);

var initials123 = document.querySelector("#initials"); 
var userResults = document.querySelector("#Final-Score"); 
var userinitials;
var allScores = [];

function Save(event) {
    event.preventDefault();
    
    var Info = {
        userResults: timeLeft,
        userinitials: initials123.value.trim()
    };

    // To add Info only if input field is filled
    if (userinitials === "") {
        alert("Field cannot be left blank");
        return false;
    } else {
        
        // Add score to array
        allScores.push(Info);
        // Save to localStorage
        localStorage.setItem("Info", JSON.stringify(allScores));
        ShowScores();
    }
}

// Score Chart
var HighScore = document.querySelector("#High-Score");
HighScore.addEventListener("click", ShowScores);

var Score = document.querySelector("#Score-Chart");

function ShowScores() {
    
    // View & Shield applicable containers
    HeaderE.setAttribute("class", "Shield");
    ContainerOne.setAttribute("class", "Shield");
    ContainerTwo.setAttribute("class", "Shield");
    ContainerThree.setAttribute("class", "Shield");
    ContainerFive.setAttribute("class", "View");

    // Get Info from localStorage
    var Saved = JSON.parse(localStorage.getItem("Info"));
  
    // Checks for data in localStorage
    if (Saved !== null) {
        allScores = Saved;
    } else {
        allScores = [];
    }

    // Sort Scores
    allScores.sort(function (a,b) {
        return b.userResults - a.userResults;
    });

    // Clear the scores
    Score.textContent = "";

    // New li for each score 
    for (var i = 0; i < allScores.length; i++) {
        var li = document.createElement("li");
        li.textContent = `${allScores[i].userResults} - ${allScores[i].userinitials}`;
        li.setAttribute("data-index", i);
        li.setAttribute("class", "#Score-Chart");
        Score.appendChild(li);
      }    
}

// Clear Results
var ClearB = document.querySelector("#Clear-B");
ClearB.addEventListener("click", ClearResults);

function ClearResults() {
    localStorage.clear();
    Score.textContent = "";
}

// Go-Back
var Goback = document.querySelector("#Go-back");
Goback.addEventListener("click", ResetAll);

function ResetAll() {

    // View & Shield applicable containers
    HeaderE.setAttribute("class", "View");
    ContainerOne.setAttribute("class", "View");
    ContainerTwo.setAttribute("class", "Shield");
    ContainerThree.setAttribute("class", "Shield");
    ContainerFive.setAttribute("class", "Shield");
    ContainerFour.setAttribute("class", "Shield");
    
    // Reset
    timeLeft = 76;
    QuizIndex = 0;
    initials123.value = "";
    countdownTimer.textContent = "0";
}