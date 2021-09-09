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


let scoresArray;
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

    endButton.classList.add('hide')
    const value = inpValue.value
    console.log(value);



    if (value) {
        let object = {
            name: value,
            score: score
        }
        var stringifiedScores = localStorage.getItem("userScores") || "[]"
        console.log(stringifiedScores)

        var parsedScores = JSON.parse(stringifiedScores)
        console.log(parsedScores)

        parsedScores.push(object)
        var updatedScoresStringified = JSON.stringify(parsedScores)
        console.log(updatedScoresStringified)

        localStorage.setItem("userScores", updatedScoresStringified);
        update_scores()
    }

    //---------------fix sorting method----------------
    // const sortedScores = scoresArray.sort(function(a, b) {
    //     if (b.score > a.score) {
    //         return 1;
    //     } else
    //         return -1
    // });


});


function remove_scores() {
    const row = document.getElementById("myTable")
    row.innerHTML = "";
}



function update_scores() {
    remove_scores();
    var scoresArray = JSON.parse(localStorage.getItem("userScores")) || [];
    //----------sort scores array by value
    const table = document.getElementById("myTable")


    scoresArray.sort(function(a, b) {

        return b.score - a.score;
    });
    console.log(scoresArray, 'after sort')

    for (let i = 0; i < scoresArray.length; i++) {
        //-------overwrite the existing table

        var row = table.insertRow(i);
        var player_name = row.insertCell(0)
        var player_score = row.insertCell(1)
        player_name.innerHTML += scoresArray[i].name;
        player_score.innerHTML += scoresArray[i].score;
    }

}




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