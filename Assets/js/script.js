// Define variables for containers
var HeaderE = document.querySelector("header"); 
var Container1 = document.querySelector("#Container1");
var Container2 = document.querySelector("#Container2");
var Container3 = document.querySelector("#Container3"); 
var Container5 = document.querySelector("#Container5");


// quiz start
var StartButton = document.querySelector("#start-button");
StartButton.addEventListener("click", StartCodeQuiz)

function StartCodeQuiz() {

    // View & Shield Containers
    HeaderE.setAttribute("class", "View");
    Container1.setAttribute("class", "Shield");
    Container2.setAttribute("class", "View");
    Container3.setAttribute("class", "Shield");
    Container5.setAttribute("class", "Shield");

    // Timer Start
    TimerStart();

    // Show Questions
    ShowQuestion();
}

function Results() {

    // View & Shield applicable containers
    HeaderE.setAttribute("class", "View");
    Container1.setAttribute("class", "Shield");
    Container2.setAttribute("class", "Shield");
    Container3.setAttribute("class", "View");
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
        ChoiceOne.innerHTML = AskQuestions.Choices[1];
        ChoiceTwo.innerHTML = AskQuestions.Choices[2];
        ChoiceThree.innerHTML = AskQuestions.Choices[3];
        ChoiceFour.innerHTML = AskQuestions.Choices[4];  
    }
}
// Answers To Questions
Questions.addEventListener("click", ShowAnswer);
ChoiceTwo.addEventListener("click", ShowAnswer);
ChoiceThree.addEventListener("click", ShowAnswer);
ChoiceFour.addEventListener("click", ShowAnswer);

var Contaianer4 = document.querySelector("#Container4"); 

function ShowAnswer (event) {
    var selectedChoice = event.target;
    
    // Show if Answer is Correct or Not
    if (selectedChoice.textContent === Quiz[QuizIndex].answer) {
        
        // Show next question
        QuizIndex++;
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
        QuizIndex++;
        ShowQuestion();

        // Answer is Incorrect
        Container4.setAttribute("class", "View");
        Container4.textContent = "Incorrect!";
        setTimeout(function () {
            Container4.textContent = "";    
        }, 1000);
    }
}
// Scoring Functions
var Submit = document.querySelector("#Submit");
Submit.addEventListener("click", Save);

var initials123 = document.querySelector("#initials"); 
var userResults = document.querySelector("#Score"); 
var userinitials;
var allScores = [];

function Save(event) {
    event.preventDefault();
    
    var Info = {
        Score: timeLeft,
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

var Score = document.querySelector("#Score");

function ShowScores() {
    
    // View & Shield applicable containers
    HeaderE.setAttribute("class", "Shield");
    Container1.setAttribute("class", "Shield");
    Container2.setAttribute("class", "Shield");
    Container3.setAttribute("class", "Shield");
    Container5.setAttribute("class", "View");

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
        li.setAttribute("class", "#Score");
        Score.appendChild(li);
      }    
}

// Clear Results
var Clear = document.querySelector("#Clear");
Clear.addEventListener("click", ClearResults);

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
    Container1.setAttribute("class", "View");
    Container2.setAttribute("class", "Shield");
    Container3.setAttribute("class", "Shield");
    Container5.setAttribute("class", "Shield");
    Container4.setAttribute("class", "Shield");
    
    // Reset
    timeLeft = 76;
    QuizIndex = 0;
    initials123.value = "";
    countdownTimer.textContent = "0";
}