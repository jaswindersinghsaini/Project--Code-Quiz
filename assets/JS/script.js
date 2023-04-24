var score = 0;
var secondsLeft = 100;
var initInstr = document.querySelector("#instructions");
var startButton = document.querySelector("#startBtn");
var timerSpan = document.getElementById("timer");
var quesDisplayBoxEl = document.querySelector("#forQuestions");
var quest = document.querySelector("#questions");
var answer = document.querySelector("#answers");
var listBtn1 = document.querySelector(".listBtn1");
var listBtn2 = document.querySelector(".listBtn2");
var listBtn3 = document.querySelector(".listBtn3");
var listBtn4 = document.querySelector(".listBtn4");
var quizFinishScoreEl = document.querySelector(".quiz-finish");
var buttonScore = document.querySelector("#scoreBtn");
var userInitials = document.querySelector("#user-initials");
var answerReflect = document.querySelector("#answerReflect");

// Instructions on the first page
initInstr.innerHTML =
  "Try to answer the following quiz questions." +
  "<br>" +
  "For every wrong answer there will be penalty of 10secs." +
  "<br>" +
  "Remember to answer within the time limit!!";

//Clicking the start button initialize the quiz
startButton.addEventListener("click", showQuestion);

function showQuestion() {
  document
    .querySelector(".initialInst")
    .setAttribute("style", "display: none;");
  document.getElementById("head").setAttribute("style", "display: flex;");
  quesDisplayBoxEl.setAttribute("style", "display: flex; align-items: center;");
  score = 0;
  secondsLeft = 75;
  loadQuestion();
}

// For Timer

var timer;

function setTime() {
  timer = setInterval(function () {
    timerSpan.innerHTML = "Time:" + secondsLeft;

    secondsLeft--;

    if (secondsLeft < 0) {
      clearInterval(timer);
      finishQuiz();
    }
  }, 500);
}
setTime();

// Create Quiz question
var myQuestions = [
  {
    question: "How many days are in a year?",
    answers: ["200", "300", "365", "7"],
    correctAnswer: "365",
  },

  {
    question: "Why did the banana go to hospital?",
    answers: [
      "It wasn't peeling well",
      "It forgot the way to home",
      "It was feeling blue",
      "It just wanted to",
    ],
    correctAnswer: "It wasn't peeling well",
  },

  {
    question: "Why are chickens so funny?",
    answers: [
      "It was hungry",
      "It didn't see its girlfriend",
      "Becaaauuussse!!!!",
      "It is just usual",
    ],
    correctAnswer: "Becaaauuussse!!!!",
  },

  {
    question: "Why did all rabbits go on strike?",
    answers: [
      "They couldn't work",
      "They were tired",
      "They wanted to quit",
      "They wanted more Celery",
    ],
    correctAnswer: "They wanted more Celery",
  },
];

var questionIndex = 0;

//to load first question
function loadQuestion() {
  var questionList = myQuestions[questionIndex];
  quest.textContent = questionList.question;

  listBtn1.textContent = myQuestions[questionIndex].answers[0];
  listBtn2.textContent = myQuestions[questionIndex].answers[1];
  listBtn3.textContent = myQuestions[questionIndex].answers[2];
  listBtn4.textContent = myQuestions[questionIndex].answers[3];

  listBtn1.addEventListener("click", checkAnswer);
  listBtn2.addEventListener("click", checkAnswer);
  listBtn3.addEventListener("click", checkAnswer);
  listBtn4.addEventListener("click", checkAnswer);
}
//to check answer
function checkAnswer() {
  if (this.textContent === myQuestions[questionIndex].correctAnswer) {
    answerReflect.innerHTML = "Correct!!" + "😃";
    answerReflect.setAttribute(
      "style",
      "color: grey; font-size: larger; font-style: italic;"
    );
    score += 10;
  } else {
    answerReflect.innerHTML = "Wrong!!" + "💩";
    answerReflect.setAttribute(
      "style",
      "color: grey; font-size: larger; font-style: italic;"
    );

    if (secondsLeft >= 10) {
      secondsLeft = secondsLeft - 10;
    }
  }
  questionIndex++;
  if (questionIndex < myQuestions.length) {
    loadQuestion();
  } else {
    clearInterval(timer);

    finishQuiz();
  }
}

function finishQuiz() {
  quesDisplayBoxEl.setAttribute("style", "display: none");
  quizFinishScoreEl.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center;"
  );
  document.querySelector("#final-score").innerHTML = score;
}
//Save user info and score

function saveUserInfo(event) {
  event.preventDefault();
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var scores = {
    score: score,
    name: userInitials.value,
  };
  highScores.push(scores);
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.href = "highScore.html";
}

buttonScore.addEventListener("click", saveUserInfo);
