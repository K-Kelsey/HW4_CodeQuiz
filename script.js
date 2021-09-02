const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const endButton = document.getElementById('end-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timeCount = document.getElementById("time_sec");
const endGame = document.getElementById("gameOver")

let time;
let score = 0;
let counter;
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

endButton.addEventListener('click', startGame);

function startGame() {
    startTimer();
    startButton.classList.add('hide')
    for (let i = 0; i < questions.length; i++) {
        shuffledQuestions = questions.sort(() => Math.random() - .5)
    }
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}


function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    if (currentQuestionIndex > questions.length) {
        startButton.classList.add('hide')
        endButton.classList.remove('hide')
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        // if (answer != answer.correct) {
        //     time -= 5;
        // }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function startTimer() {
    time = 45;
    clearInterval(counter);
    counter = setInterval(function() {
        console.log(time)
        time--;
        timeCount.textContent = time;
        if (time < 10) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }

        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            gameOver()
        }

        if (currentQuestionIndex > questions.length) {
            //stop
        }
    }, 1000);
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//timer broke, will not decrease timer upon chosen wrong answer
function selectAnswer(e) {
    varscore = 0;
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct

    console.log(correct)
    clearStatusClass(document.body)
    if (question.answer = true) {
        score += 20;
    }
    if (question.answer = false) {
        score -= 10;
    }

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
        setTimeout(time);
    } else {
        clearInterval(time);
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')

        gameOver();
    }
    setScoreTracker();

}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        time -= 1;
    }
}

function gameOver() {
    endGame.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    answerButtonsElement.classList.add('hide')
    questionElement.classList.add('hide')

    const button = document.createElement('button')

    var scoreEl = document.querySelector('.score')
    scoreEl.textContent = score;
    setScoreTracker()
    console.log(score)

}

//Score function broken ---------------------------------------------
function setScoreTracker() {
    // place score in html element at game over
    console.log("Score: " + score);
}

// function saveScore() {

// }


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: 'What are the 4 primitive data types for JavaScript?',
        answer: [
            { text: 'undefined, string, number, boolean', correct: true },
            { text: 'null, number, integer, boolean', correct: false },
            { text: 'default, text, iteration, value', correct: false },
            { text: 'undefined, text, value, boolean', correct: false }
        ]
    },

    {
        question: 'What is an array in JavaScript?',
        answer: [
            { text: 'a beam of light', correct: false },
            { text: "defines the band SugarRay without the 'sug'", correct: false },
            { text: 'a list of items/objects', correct: true },
            { text: 'a word to describe the accents and verancular amongst different penguin species', correct: false }
        ]
    },

    {
        question: "What does the '.floor' in 'Math.floor' do?",
        answer: [
            { text: 'rounds the resulting number up', correct: false },
            { text: 'rounds the resulting number down', correct: true },
            { text: 'gives the product of the two numbers', correct: false },
            { text: 'destroys all exisiting math functions ever to be created by man or woman', correct: false }
        ]
    },

    {
        question: "What does DOM stand for?",
        answer: [
            { text: "Don't Overcook Mayonaise", correct: false },
            { text: 'Direct Object Mapping', correct: false },
            { text: 'Document Object Model', correct: true },
            { text: 'Descending Opererator Mechanisms', correct: false }
        ]
    },

    {
        question: "What is the final conscensus on the best mattress option available on the market?",
        answer: [
            { text: 'Temper-Pedic', correct: true },
            { text: 'Posture-Pedic', correct: true },
            { text: 'Sleep-Number', correct: true },
            { text: 'Sleep is for the weak', correct: true }
        ]
    }
]