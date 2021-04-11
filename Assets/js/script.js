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
    
}