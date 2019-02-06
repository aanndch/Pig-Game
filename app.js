/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

function nextPlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
}

function roll() {

    // Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display result as well as change display to block
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //Update round score IF rolled number is NOT 1
    if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

        // HOLD to WIN
        if (roundScore + scores[activePlayer] >= 20) {
            document.querySelector('.hold2win').textContent = 'HOLD to WIN!';
        }

    } else {
        // Next player
        nextPlayer();
    }

}

function hold() {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Upddate the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check WIN condition
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        // Next player
        nextPlayer();
    }

}

document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);

//document.querySelector('#current-' + activePlayer).textContent = dice;
//var x = document.querySelector('#score-0').textContent;
