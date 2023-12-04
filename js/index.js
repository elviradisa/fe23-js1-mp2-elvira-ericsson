//
// FE23 - MP2 - ELVIRA ERICSSON
//

//YOURS AND OPPONENTS SCORE IS SET TO ZERO
let yourWin = 0;
let opponentWins = 0;
//ROUND STARTS WITH 1
let currentRound = 0;

//GETTING IMPORTANT ID´S AND CLASSES AND PUTTING THEM IN VARIABLES TO USE IN CODE LATER ON
const header = document.querySelector('header');
const scoreBoard = document.querySelector('#scoreBoard');
const game = document.querySelector('#rockPaperScissors');
const opponentHand = document.querySelector('.opponentHand');

//NOT DISPLAYED SINCE NAME-INPUT IS DISPLAYED FIRST
game.style.display = 'none';
header.style.display = 'none';
scoreBoard.style.display = 'none';
opponentHand.style.display = 'none';

//WHEN YOU PUT YOUR USERNAME AND 'ENTER'-BUTTON IS PRESSED DOWN, GAME STARTS
function nameInputFunction () {
    // KOMPLETTERING, visa endast username på sidan, inte hela textinputen
    const form = document.querySelector('form');
    const nameInput = document.getElementById('nameInput').value;

    //USERNAME IS DISPLAYED ON PAGE AFTER SUBMITTING IT
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        document.querySelector('.username').innerText = nameInput;
        form.style.display = 'none';
        game.style.display = 'flex';
        header.style.display = 'block';
        nameInput.style.display = 'block';
    })
}
nameInputFunction();

//CLICK ON WHICH HAND YOU WANT TO GO WITH, AND OPPONENTS HAND WILL BE DISPLAYED RANDOMLY
function playRockPaperScissors () {
    const yourAllElements = document.querySelectorAll('.yourAll img');
    //forEach-LOOP TO ITERATE OVER EACH ELEMENT IN 'yourAllElements' WHICH IS EITHER 'ROCK, PAPER OR SCISSORS'
    yourAllElements.forEach(element => { 
        element.addEventListener('click', () => {
            opponentHand.style.display = 'flex'
            //RANDOM OPPONENT HAND IS DISPLAYED
            showRandomOpponentHand(element, opponentHand);

            //CHANGES FROM ROUND 1 UP TO ROUND 10, BASED ON HOW MANY TIMES YOU CLICK
            if (currentRound < 20) {
                currentRound++;
                document.querySelector('h1').textContent = `ROUND ${currentRound}`;
            }
        });
    });
}
playRockPaperScissors();

//SCORE WILL BE UPDATED FOR EVERY COMPARISON IN showRandomOpponentHand-function
function updateScore () {
    let yourScore = document.querySelector('.yourScore p');
    let opponentScore = document.querySelector('.opponentScore p');

    yourScore.textContent = yourWin;
    opponentScore.textContent = opponentWins;
}

//SHOW OPPONENT'S RANDOM HAND WHEN CLICKING ON ONE OF YOUR HANDS
function showRandomOpponentHand (yourChoice) {
    const yourChoiceClass = yourChoice.parentElement.classList[0];
    const opponentHand1 = document.querySelector('.opponentRock');
    const opponentHand2 = document.querySelector('.opponentPaper');
    const opponentHand3 = document.querySelector('.opponentScissors');
    //ARRAY CONTAINING THREE ELEMENTS LISTED BEFORE THIS
    const opponentHandArray = [opponentHand1, opponentHand2, opponentHand3];
    //math.random CAN GENERATE DECIMALS, math.floor PREVENTS THIS, INDEX IN ARRAY NEEDS TO BE AN INTEGER 
    const opponentRandomIndex = Math.floor(Math.random() * opponentHandArray.length);
    //ALL OPPONENT HANDS ARE HIDDEN
    opponentHandArray.forEach(element => {
        element.style.display = 'none';
    });
    //ONLY ONE IS DISPLAYED AT A TIME, RANDOMLY
    opponentHandArray[opponentRandomIndex].style.display = 'block';
    //GET THE FIRST CLASS FROM THE LIST
    const opponentChoiceClass = opponentHandArray[opponentRandomIndex].classList[0];

    // KOMPLETTERING, inga poäng ges om det är lika
    // CHECK FOR TIE, IF IT'S A TIE, NO PLAYER GETS A POINT
    if (yourChoiceClass === 'yourRock' && opponentChoiceClass === 'opponentRock') {
        return;
    } else if (yourChoiceClass === 'yourPaper' && opponentChoiceClass === 'opponentPaper') {
        return;
    } else if (yourChoiceClass === 'yourScissors' && opponentChoiceClass === 'opponentScissors') {
        return;
    }

    // ADD POINTS TO PLAYER DEPENDING ON WHO WINS 
    if (yourChoiceClass === 'yourRock') {
        if (opponentChoiceClass === 'opponentScissors') {
            yourWin++;
        } else {
            opponentWins++;
        }
    } else if (yourChoiceClass === 'yourPaper') {
        if (opponentChoiceClass === 'opponentRock') {
            yourWin++;
        } else {
            opponentWins++;
        }
    } else if (yourChoiceClass === 'yourScissors') {
        if (opponentChoiceClass === 'opponentPaper') {
            yourWin++;
        } else {
            opponentWins++;
        }
    }

    // UPDATE THE SCPRES
    updateScore();

    //KOMPLETTERING, spelet avslutas (med liten delay) efter att någon eller båda har fått 3 poäng
    // IF EITHER YOU OR OPPONENT HAS THREE POINTS, CALL bestOfThree FUNCTION WITH A DELAY
    if (yourWin === 3 || opponentWins === 3) {
        setTimeout(bestOfThree, 500);
    }
}

//CHECK AND ANNOUNCE WHICH PLAYER WINS ALL THREE ROUNDS, SCOREBOARD IS DISPLAYED AND THE GAME IS NOT
function bestOfThree () {
    //HIDE GAME
    game.style.display = 'none';
    header.style.display = 'none';
    nameInput.style.display = 'none';
    scoreBoard.style.display = 'flex';

    const scoreAnnouncement = document.querySelector('#scoreBoard p');
    const winnerAnnouncement = document.querySelector('#scoreBoard h2');
    //DIFFERENT ANNOUNCEMENTS DEPENDING ON WHO WON THE GAME OR IF ITS A TIE
    if (yourWin >= 3) {
        winnerAnnouncement.textContent = 'YOU WIN!';
    } else if (opponentWins >= 3) {
        winnerAnnouncement.textContent = 'YOU LOST...';
    } else if (yourWin >= 3 && opponentWins >= 3) {
        winnerAnnouncement.textContent = "IT'S A TIE!";
    }
    //YOUR SCORE NEXT TO OPPONENTS SCORE ON SCOREBOARD
    scoreAnnouncement.textContent = `${yourWin} : ${opponentWins}`;

    //CALL playAgain-FUNCTION AND PRESS BUTTON 'PLAY AGAIN' TO - PLAY AGAIN!
    playAgain()
}

function resetGame() {
    //KOMPLETTERING, reseta poäng och rundan till 0 varje gång spelet börjar om
    //RESET CURRENT SCORES AND CURRENT ROUND TO ZERO
    yourWin = 0;
    opponentWins = 0;
    currentRound = 0;
    document.querySelector('h1').textContent = `ROUND ${currentRound}`;
    document.querySelector('.yourScore p').textContent = `${yourWin}`;
    document.querySelector('.opponentScore p').textContent = `${opponentWins}`;

    //HIDE SCOREBOARD
    scoreBoard.style.display = 'none';

    //DISPLAY GAME
    game.style.display = 'flex';
    header.style.display = 'flex';
    nameInput.style.display = 'flex';
    opponentHand.style.display = 'none';
}
//GIVE PLAYER THE CHOICE TO PLAY AGAIN, IF 'PLAY AGAIN' BUTTON GETS CLICKED, THE GAME IS DISPLAYED AGAIN
function playAgain() {
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        //CALL THE 'resetGame' FUNCTION 
        resetGame(); 
    });
}
