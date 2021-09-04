const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const endButton = document.getElementById('end-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timeCount = document.getElementById("time_sec");
const endGame = document.getElementById("gameOver")
const scoreText = document.getElementById("score-text")
const inpValue = document.getElementById("inpValue")
const lsValue = document.getElementById("lsValue")
const myTable = document.getElementById("myTable")



let time;
let score = 0;
let counter;
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

endButton.addEventListener('click', function() {
    // myTable.remove()
    endButton.classList.add('hide')
    const value = inpValue.value
    console.log(value);

    localStorage.setItem(value, score);

    if (value === true) {
        localStorage.setItem(value);
        location.reload
    }

    remove_scores()

});

// async function new_fun(){
//     if local storage > 0
//         remove_scores()
//         await(1000)
//         update_scores()
// }else {
//         update_scores()
//     }


function remove_scores() {
    const row = document.getElementById("myTable")
    for (let j in row.cells) {
        let col = row.cells[j]
        col.deleteRows(j)
    }
}

function update_scores() {
    for (const [key1, value1] of Object.entries(localStorage)) {
        //overwrite the existing table
        const table = document.getElementById("myTable")
        var row = table.insertRow(0);
        var player_name = row.insertCell(0)
        var player_score = row.insertCell(1)
        player_name.innerHTML += key1;
        player_score.innerHTML += value1;
    }
}

// function high_scores() {
//     for (const [key2, value2] of Object.entries(document.getElementById("myTable"))) {
//         const table = document.getElementById("myTable")
//         var row = table.deleteRow(0);
//     }
//     for (const [key1, value1] of Object.entries(localStorage)) {
//         //overwrite the existing table
//         const table = document.getElementById("myTable")
//         var row = table.insertRow(0);
//         var player_name = row.insertCell(0)
//         var player_score = row.insertCell(1)
//         player_name.innerHTML += key1;
//         player_score.innerHTML += value1;
//     }
// }


function startGame() {
    startTimer();
    startButton.classList.add('hide')
    for (var i = 0; i < questions.length; i++) {
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
        clearInterval(counter)
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
    }, 1000);
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectAnswer(e) {
    varscore = 0;
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct

    console.log(correct)
    clearStatusClass(document.body)
    if (correct) {
        score += 20;
        scoreText.textContent = score;

    } else {
        score -= 10;
        scoreText.textContent = score;

    }

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
        setTimeout(time);
    } else {
        clearInterval(counter);
        endButton.innerText = 'Submit'
        endButton.classList.remove('hide')

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
    scoreText.classList.add('hide')


    var scoreEl = document.querySelector('.score')
    scoreEl.textContent = score;
    setScoreTracker()
    console.log(score)
    update_scores()
        // high_scores()
        // localStorage.clear()

}

function setScoreTracker() {
    // place score in html element at game over
    console.log("Score: " + score);
}



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