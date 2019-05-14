window.addEventListener('load', init)
// Globals

const levels = {
    easy: 7,
    medium: 5,
    hard: 3
};

//Level change
const currentlevel = levels.medium;

let time = currentlevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// Initialize

function init() {
    //Show number of seconds in ui
    seconds.innerHTML = currentlevel;
    //Load word from array
    showWord(words);
    //Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50)
}


//Start game
function startMatch() {
    if (matchWords()) {
        isPlaying  = true;
        time = currentlevel + 1
        showWord(words);
        wordInput.value = '';
        score++;
    }
    
    //If score is -1 display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score
    }
}


//Match current word to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        return true
    } else {
        message.innerHTML = '';
        return false;
    }
}

//Pick and show random word
function showWord(words) {
    //Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    //Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    // Make sure time does not run out
    if (time > 0) {
        // Decrement
        time--; 
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over.'
        score = -1;
    }
}

