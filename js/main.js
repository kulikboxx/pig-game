'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const appBody = document.querySelector('.dices-body'),
          players = appBody.querySelectorAll('.player'),
          allCurrentScores = appBody.querySelectorAll('.current-score'),
          allTotalScores = appBody.querySelectorAll('.total-score'),
          newGameBtn = appBody.querySelector('.btn-game'),
          rollBtn = appBody.querySelector('.btn-roll'),
          saveBtn = appBody.querySelector('.btn-save'),
          testBtn = appBody.querySelector('.btn-test'),
          diceImg = appBody.querySelector('.dice-img'),
          modal = appBody.querySelector('.modal'),
          modalCloseBtn = appBody.querySelector('.modal-close'),
          winner = appBody.querySelector('.winner');

    let currentScore,
        totalScore;

    const startNewGame = () => {
        players.forEach(player => {
            player.classList.remove('active');
        });
        
        allCurrentScores.forEach(item => {
            item.textContent = 0;
        });
        
        allTotalScores.forEach(item => {
            item.textContent = 0;
        });
        
        players[0].classList.add('active'); 
        diceImg.src = 'img/5.png';
    }
    
    const togglePlayers = () => {   
        for (let i = 0; i < players.length; i++) {
            if (players[i].classList.contains('active')) {
                players[i].classList.remove('active');
                i++;
                if (i === players.length) {
                    i = 0;
                }
                players[i].classList.add('active');
            }
        }
    }
        
    const rollDice = () => {
        let randomNumber = Math.floor(Math.random() * 6) + 1,
        imgName = `${randomNumber}.png`;
        diceImg.src = `img/${imgName}`;
        currentScore = document.querySelector('.active .current-score');
        currentScore.textContent === 0 ? currentScore.textContent = randomNumber : currentScore.textContent = parseInt(currentScore.textContent) + parseInt(randomNumber);

        if (randomNumber === 1) {
            currentScore.textContent = 0;
            togglePlayers();
        }
    }

    const saveScore = () => {
        totalScore = document.querySelector('.active .total-score');
        totalScore.textContent === 0 ? totalScore.textContent = currentScore.textContent : totalScore.textContent = parseInt(totalScore.textContent) + parseInt(currentScore.textContent);
        currentScore.textContent = 0;
        
        let playerName = document.querySelector('.active .player-name').textContent;
        
        if (totalScore.textContent >= 100) {
            modal.classList.add('show-modal');
            winner.textContent = `The ${playerName} has won!`;
        }
        togglePlayers();
    }

    newGameBtn.addEventListener('click', startNewGame);
    rollBtn.addEventListener('click', rollDice);
    saveBtn.addEventListener('click', saveScore);
    modalCloseBtn.addEventListener('click', () => {
        modal.classList.remove('show-modal');
        startNewGame();
    });
});