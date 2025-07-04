const els = {};
const state = {
    questionDigits: 0,
    operations: ['+', '-'],
    question: null,
    correctAswer: 0,
    totalQuestion: 10,
    genQuestions: 0,
    timer: 15,
    timerInterval: null,
    timeExpired: false 

};


function init() {
    cacheDOM();
    bindEvents();

}

function cacheDOM() {
    Object.assign(els, {
        gameGuide: document.querySelector('.game-guide'),
        nextBtn: document.querySelector('.next'),
        gameLvl: document.querySelector('.choose-game-lvl'),
        gameLvlBtn: document.querySelectorAll('.game-lvl-btn'),
        displayQuestions: document.querySelector('.display-questions'),
        inputQuestion: document.querySelector('.question-container'),
        inputValue: document.querySelector('.input-number'),
        nextQuestionBtn: document.querySelector('.submit-answer'),
        result : document.querySelector('.final-score'),
        scoreContainer : document.querySelector('.final-result'),
        restartBtn :document.querySelector('.restart-game'),
        timerDisplay: document.querySelector('.count-timer'),

        

    })
}

function bindEvents() {
    els.nextBtn.addEventListener('click', handleNext);
    els.gameLvlBtn.forEach(element => element.addEventListener('click', handleSelectGameLvl));
    els.nextQuestionBtn.addEventListener('click', handleNextQuestion);
    els.restartBtn.addEventListener('click' , handleRestart)

}

function handleNext() {
    els.gameGuide.classList.add('hidden');
    els.gameLvl.classList.remove('hidden');

}
function handleSelectGameLvl(e) {
    if (e.target.innerText === 'One digit') { state.questionDigits = 1 };
    if (e.target.innerText === 'Two digit') { state.questionDigits = 2 };
    if (e.target.innerText === 'Three digit') { state.questionDigits = 3 };
    els.gameLvl.classList.add('hidden');
    els.displayQuestions.classList.remove('hidden')

    renderQuestion();

}

function handleNextQuestion() {
    if (state.timeExpired) {
        alert("Time's up!");
        return;
    }

    if (!els.inputValue.value) {
        alert('Please enter the value');
        return;
    }

    const inputNumber = Number(els.inputValue.value);
    const correctAns = eval(state.question);

    if (correctAns === inputNumber) {
        state.correctAswer += 1;
    }

    els.inputValue.value = '';
    els.inputValue.focus();
    renderQuestion();
}


function randomNum(digit) {
    if (digit === 1) return Math.floor(Math.random() * 9) + 1;
    if (digit === 2) return Math.floor(Math.random() * 90) + 10;
    if (digit === 3) return Math.floor(Math.random() * 900) + 100;
}

function genQuestions(digit) {
    let numOne = randomNum(digit);
    let numTwo = randomNum(digit);

    const operation = state.operations[Math.floor(Math.random() * state.operations.length)];

    while (operation === '-' && numOne < numTwo) {
        numOne = randomNum(digit);
        numTwo = randomNum(digit);
    }
    return `${numOne} ${operation} ${numTwo}`;

}
function renderQuestion() {
    if (state.timerInterval) clearInterval(state.timerInterval);

    state.genQuestions += 1;
    console.log("question number", state.genQuestions);

    if (state.genQuestions <= 10) {
        const question = genQuestions(state.questionDigits);
        state.question = question;
        els.inputQuestion.value = `${question} = ?`;

        els.inputValue.focus();
        timer(() => {
            alert("⏱ Time's up!");
            els.inputValue.value = '';
            renderQuestion();
        });
    } else {
        finalScore();
    }
}

function finalScore() {
    persentage = state.correctAswer/10 *100
    els.result.innerText = `your final score is ${persentage}%`
    els.displayQuestions.classList.add('hidden');
    els.scoreContainer.classList.remove('hidden');
    
}

function handleRestart(){
    clearInterval(state.timerInterval);
    state.questionDigits = 0;
    state.question = null;
    state.correctAswer = 0;
    state.genQuestions = 0;
    state.timeExpired = false;

    els.scoreContainer.classList.add('hidden');
    handleNext();
}

function timer(onTimeout) {
    state.timer = 15;
    state.timeExpired = false;

    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
        state.timer -= 1;
        console.log('Time left:', state.timer);
        if (els.timerDisplay) {
            els.timerDisplay.innerText = state.timer;
        }
        if (state.timer <= 0) {
            clearInterval(state.timerInterval);
            state.timeExpired = true;
            onTimeout();
        }
    }, 1000); 
}



document.addEventListener('DOMContentLoaded', init)