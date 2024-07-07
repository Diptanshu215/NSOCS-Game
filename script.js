let timer;
let timeLeft = 10;
let score = 0;
let currentQuestionIndex = 0;

const questions = [
    {
        question: "When was IIT Patna established?",
        options: ["2000", "2008", "2010", "2012"],
        answer: "2008"
    },
    {
        question: "What is the motto of IIT Patna?",
        options: ["Knowledge is Power", "Education for all", "Innovate, Integrate, Transform", "Learning for Life"],
        answer: "Innovate, Integrate, Transform"
    },
    {
        question: "Who is the current director of IIT Patna?",
        options: ["Prof. Pushpak Bhattacharyya", "Prof. T. N. Singh", "Prof. Rajiv Misra", "Prof. Chandan Tilak Bhunia"],
        answer: "Prof. T. N. Singh"
    }
    // Add more questions as needed
];

function startQuiz() {
    document.getElementById('rules-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    loadQuestion(currentQuestionIndex);
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
            document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
        }
        if (timeLeft < 0) {
            clearInterval(timer);
            document.getElementById('timer').innerText = "Time is over!";
            submitQuiz();
        }
    }, 1000);
}

function loadQuestion(index) {
    if (index >= questions.length) {
        submitQuiz();
        return;
    }
    
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const question = questions[index];
    const questionText = document.createElement('p');
    questionText.innerText = question.question;
    questionContainer.appendChild(questionText);

    question.options.forEach(option => {
        const optionLabel = document.createElement('label');
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'question';
        optionInput.value = option;
        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(document.createTextNode(option));
        questionContainer.appendChild(optionLabel);
    });

    document.getElementById('next-button').style.display = index < questions.length - 1 ? 'block' : 'none';
    document.getElementById('submit-button').style.display = index === questions.length - 1 ? 'block' : 'none';
    document.getElementById('score').innerText = `Score: ${score}`;
    timeLeft = 10;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
}

function submitQuiz() {
    clearInterval(timer);
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
    }
    showResult();
}

function showResult() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    document.getElementById('result').innerText = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('rules-page').style.display = 'block';
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 10;
}

// Start typing animation on page load
window.onload = function() {
    document.getElementById('typing-text').style.display = 'block';
}
