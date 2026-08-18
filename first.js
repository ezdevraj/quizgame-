const quizData = [
    {
        category: "geography",
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        category: "space",
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        category: "geography",
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        category: "math",
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: 2
    },
    {
        category: "politics",
        question: "How many members are in the Indian Lok Sabha?",
        options: ["543", "550", "250", "500"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;

// Update high score text when the page opens
window.onload = function () {
    updateHighScoreDisplay();
};

function updateHighScoreDisplay() {
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    document.getElementById("high-score-text").textContent = `Best Score: ${savedHighScore}/${quizData.length}`;
}

function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    currentQuestion = 0;
    score = 0;

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button, index) {
        button.onclick = function () {
            checkAnswer(index);
        };
    });

    loadQuestion();
}

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];

    document.getElementById("question").textContent = currentQuiz.question;
    document.getElementById("category-badge").textContent = `Category: ${currentQuiz.category}`;
    document.getElementById("score-counter").textContent = `Score: ${score}/${quizData.length}`;

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button, i) => {
        button.textContent = currentQuiz.options[i];
    });
}

function checkAnswer(selectedIndex) {
    const currentQuiz = quizData[currentQuestion];

    if (selectedIndex === currentQuiz.answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showScorecard();
    }
}

function showScorecard() {
    document.getElementById("score-modal").style.display = "flex";
    document.getElementById("final-score-text").textContent = `Your Final Score: ${score}/${quizData.length}`;

    const savedHighScore = localStorage.getItem("quizHighScore") || 0;

    if (score > savedHighScore) {
        localStorage.setItem("quizHighScore", score);
        document.getElementById("new-high-score-msg").textContent = "🏆 New High Score!";
    } else {
        document.getElementById("new-high-score-msg").textContent = "";
    }

    updateHighScoreDisplay();
}

function toggleMenu() {
    const menu = document.getElementById("menu-content");
    const restartBtn = document.getElementById("restart-button");
    const exitBtn = document.getElementById("exit-button");

    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
        restartBtn.style.display = "block";
        exitBtn.style.display = "block";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score-modal").style.display = "none";
    document.getElementById("menu-content").style.display = "none";
    loadQuestion();
}

function exitQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("game-screen").style.display = "none";
    document.getElementById("score-modal").style.display = "none";
    document.getElementById("menu-content").style.display = "none";
    document.getElementById("start-screen").style.display = "flex";
}
