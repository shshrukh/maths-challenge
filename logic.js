const els = {};
const state = {
    gameLvl : 0,
    operations : ['+','-']

};


function init(){
    cacheDOM(); 
    bindEvents();

}

function cacheDOM(){
    Object.assign(els,{
        gameGuide : document.querySelector('.game-guide'),
        nextBtn : document.querySelector('.next'),
        gameLvl :document.querySelector('.choose-game-lvl'),
        gameLvlBtn : document.querySelectorAll('.gmae-lvl-btn'),
        displayQuestions : document.querySelector('.display-questions'),

    })
}

function bindEvents(){
    els.nextBtn.addEventListener('click', handleNext);
    els.gameLvlBtn.forEach(element => element.addEventListener('click', handleSelectGameLvl));
    
}

function handleNext(){
    els.gameGuide.classList.add('hidden')
    els.gameLvl.classList.remove('hidden')
    
}
function handleSelectGameLvl(e){
    if(e.target.innerText === 'One digit'){
        state.gameLvl = 1;
        console.log(state.gameLvl, typeof state.gameLvl);
        
    }else if(e.target.innerText === 'Two digit'){
        state.gameLvl = 2;
        console.log(state.gameLvl, typeof state.gameLvl);
    }else{
        state.gameLvl = 3;
        console.log(state.gameLvl, typeof state.gameLvl);
    }
    els.gameLvl.classList.add('hidden');
    els.displayQuestions.classList.remove('hidden')
    
}

const randomNum = ()=> Math.floor(Math.random()*9+1);


function oneDigitNumber(){
    const question = `${randomNum()} + ${randomNum()}`;
    console.log(question);
    console.log(eval(question));
    

    
}
oneDigitNumber()















document.addEventListener('DOMContentLoaded' , init)