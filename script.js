'use strict';

// Player 01 attributes
const player01 = document.querySelector(".player-1");
const currentScorePlayer02 = document.getElementById("current--2");
const totalScorePlayer02 = document.querySelector(".player-2-total");
// Player 02 attributes
const player02 = document.querySelector(".player-2");
const currentScorePlayer01 = document.getElementById("current--1");
const totalScorePlayer01 = document.querySelector(".player-1-total");
// Game attributes
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
// attributes for calculation
let totalScore = [0, 0];
let totalCurrentScore = 0;
let activePlayer = 1;
let playing = true

// Initialize everything when player selects a new Game
const doInit = () => {
    totalScorePlayer01.textContent = 0;
    currentScorePlayer01.textContent = 0;
    totalScorePlayer02.textContent = 0;
    currentScorePlayer02.textContent = 0;

    totalScore = [0, 0];
    totalCurrentScore = 0;
    activePlayer = 1;
    playing = true;

    player01.classList.add("player--active");
    player01.classList.remove("player--winner");
    player02.classList.remove("player--active");
    player02.classList.remove("player--winner");

    dice.classList.add("hidden");
};

// Function to switch active player
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    totalCurrentScore = 0;
    activePlayer = (activePlayer === 1) ? 2 : 1;
    player01.classList.toggle("player--active");
    player02.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
    // continue only if there is no winner yet
    if (playing) {      
        const diceNumber = Math.floor((Math.random() * 6) + 1);
        dice.classList.remove("hidden");

        totalCurrentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = totalCurrentScore;
        dice.src = `./images/dice-${diceNumber}.png`;
        
        // if dice rolls out 1 then switch the active player
        if (diceNumber === 1) {
            switchPlayer();
        } 
    }
    
});

btnHold.addEventListener("click", () => {
    // continue only if there is no winner yet
    if (playing) {    
        // calculate active player's total score
        totalScore[(activePlayer - 1)] += totalCurrentScore;
        document.querySelector(`.player-${activePlayer}-total`).textContent = totalScore[activePlayer - 1];
        // check if total score >= 100
        // if yes then declare that active player as winner
        // else switch the active player
        if (totalScore[activePlayer - 1] >= 100) {
            
            document.querySelector(`.player-${activePlayer}`).classList.add("player--winner");
            dice.classList.add("hidden");
            playing = false;            
        } else {
            
            switchPlayer();
        }
    }
});

btnNewGame.addEventListener("click", doInit);
