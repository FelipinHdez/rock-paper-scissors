const selections = ['rock', 'paper', 'scissors']; //Possible selections in game

game(5);

function randomInt(max){
    return Math.floor(Math.random() * max);
}

function computerPlay(){
    return selections[randomInt(3)];
}

function playRound(playerSelection, computerSelection){ //OUTPUT: 0 = tie, 1 = computer won, 2 = human won
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase(); //Make function case insensitive

    let validSelections = selections.includes(playerSelection) && selections.includes(computerSelection);
    //Check for invalid Selections
    if (!(validSelections)){
        console.error('playRound() received invalid selections');
        return null;
    }

    if (playerSelection == computerSelection){
        return 0; //Tie
    }
    switch (playerSelection){ //Main logic
        case 'rock':
            return (computerSelection == 'paper') ? 1 : 2;
        case 'paper':
            return (computerSelection == 'scissors') ? 1 : 2;
        case 'scissors':
            return (computerSelection == 'rock') ? 1 : 2;
        default:
            console.error('Something went terribly wrong');
            return null; //Not possible to reach this
    }
}

function game(rounds){
    let computerScore = 0;
    let humanScore = 0;

    for (let i = 0; i < rounds; i++){
        let humanPlay = window.prompt('Round ' + (i+1) + ': Rock paper or scissors', 'rock');
        playResult = playRound(humanPlay , computerPlay());
        let roundResult;

        switch (playResult){
            case 1:
                computerScore++;
                roundResult = 'computer wins';
                break;
            case 2:
                humanScore++;
                roundResult = 'human wins';
                break;
            default:
                roundResult = 'tie';
        }
        console.log(`Round ${i+1} out of ${rounds} - ${roundResult}`)
    }
    let message;
    if (computerScore > humanScore){
        message = 'Computer won!';
    } else if (humanScore > computerScore){
        message = 'Human won!';
    } else {
        message = 'Tie!';
    }
    console.log(`Final result: ${message}`);
}

function addMessage(message) {

}