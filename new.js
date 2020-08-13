const humanSelections = Array.from(document.querySelectorAll('button.player1'));
const computerSelections = Array.from(document.querySelectorAll('button.player2'));

let isHumanTurn = true;
let isGameOver = false;
let humanSelection = '';
let computerSelection = '';
let humanScore = 0;
let computerScore = 0;

humanSelections.forEach(element => {
    element.addEventListener('click', humanPlay);
});

function humanPlay(event){
    if (!isHumanTurn || isGameOver){
        return;
    }

    const instruction = document.querySelector('#instruction');
    instruction.classList.add('hidden')
    humanSelections.forEach(element => {
        element.classList.remove('selected');
    });
    
    isHumanTurn = false;
    event.target.classList.add('selected');
    humanSelection = event.target.id;
    computerPlay();
    setTimeout(() => {
        isHumanTurn = true;
        instruction.classList.remove('hidden')
    }, 1000)

    let result = getResult();
    let message = getMessage(result);
    addMessage(message);
    updateResults();

    if (humanScore >= 5){
        gameOver = true;
        setInterval(() => {
            addMessage(`YOU WON!! CONGRATS!!!`)
        }, 500);
    }else if(computerScore >= 5){
        isGameOver = true;
        setInterval(() => {
            addMessage(`YOU LOST D:`)
        }, 500);
    }

    return;
}

function computerPlay(){
    computerSelections.forEach(element => {
        element.classList.remove('selected');
    });
    const button = computerSelections[randomInt(3)];
    button.classList.add('selected');
    computerSelection = button.id;
}

function getResult(){
     // 0 = tie, 1 = computer won, 2 = human won
    if (humanSelection == computerSelection){
        return 0;
        }

    switch (humanSelection){ //Main logic
        case 'rock':
            return (computerSelection == 'paper') ? 1 : 2;
        case 'paper':
            return (computerSelection == 'scissors') ? 1 : 2;
        case 'scissors':
            return (computerSelection == 'rock') ? 1 : 2;
    }

}

function getMessage(result){
    switch (result){
        case 0:
            return 'tie :|'
        case 1:
            computerScore++;
            return (Math.random() < .99) ? 'you lost this round :(' : 'computer won! haha loser';
        case 2:
            humanScore++;
            return (Math.random() < .99) ? 'you won this round :)' :'YOU WON!! (this round)';
    }
}

function addMessage(message){
    const mainElement = document.querySelector('main');
    const pElement = document.createElement('p');
    pElement.innerText = message;
    mainElement.insertBefore(pElement, mainElement.childNodes[10]);
}

function updateResults() {
    const score1 = document.querySelector('#score1');
    const score2 = document.querySelector('#score2');
    score1.textContent = humanScore;
    score2.textContent = computerScore;

}

function randomInt(max){
    return Math.floor(Math.random() * max);
}