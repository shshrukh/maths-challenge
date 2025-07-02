const els = {};
const state = {
    questionDigits: 0,
    operations: ['+', '-'],
    question: null,

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

    })
}

function bindEvents() {
    els.nextBtn.addEventListener('click', handleNext);
    els.gameLvlBtn.forEach(element => element.addEventListener('click', handleSelectGameLvl));

}

function handleNext() {
    els.gameGuide.classList.add('hidden')
    els.gameLvl.classList.remove('hidden')

}
function handleSelectGameLvl(e) {
    if (e.target.innerText === 'One digit') {
        state.questionDigits = 1;
        console.log(state.questionDigits, typeof state.questionDigits);

    } else if (e.target.innerText === 'Two digit') {
        state.questionDigits = 2;
        console.log(state.questionDigits, typeof state.questionDigits);
    } else {
        state.questionDigits = 3;
        console.log(state.questionDigits, typeof state.questionDigits);
    }
    els.gameLvl.classList.add('hidden');
    els.displayQuestions.classList.remove('hidden')

}

function randomNum(digit) {
    if (digit === 1) return Math.floor(Math.random() * 9) + 1;
    if (digit === 2) return Math.floor(Math.random() * 90) + 10;
    if (digit === 3) return Math.floor(Math.random() * 900) + 100;
}

function genQuestions(digit) {
    const numOne = randomNum();
    const numTwo = randomNum();
    const operation = state.operations[Math.floor(Math.random() * state.operations.length)];
    return `${numOne} ${operation} ${numTwo}`;

}








document.addEventListener('DOMContentLoaded', init)