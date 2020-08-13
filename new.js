const humanSelections = Array.from(document.querySelectorAll('button.player1'));
const computerSelections = Array.from(document.querySelectorAll('button.player2'));
const instruction = document.querySelector('#instruction');
const mainElement = document.querySelector('main');

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

    if (humanScore >= 5){
        gameOver = true;
        addMessage(`YOU WON!! CONGRATS [${humanScore} - ${computerScore}]`)
    }else if(computerScore >= 5){
        isGameOver = true;
        addMessage(`You lost :( [${humanScore} - ${computerScore}]`)
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
            return 'you tied!'
        case 1:
            computerScore++;
            return (Math.random() > .9) ? 'computer wins!' : 'computer wins! haha loser';
        case 2:
            humanScore++;
            return 'human wins!';
    }
}

function addMessage(message){
    const pElement = document.createElement('p');
    pElement.innerText = message;
    mainElement.append(pElement);
}

function randomInt(max){
    return Math.floor(Math.random() * max);
}