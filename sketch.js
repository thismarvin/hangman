let hiddenWord;
let letters;
let lettersGuessed;
let incorrectGuesses;
let correctGuesses;
let lost;
let win;

let bruh;

function setup() {
    initialize();
    bruh = 50;
    hiddenWord = getRandomWord();
    letters = [];
    lettersGuessed = [];
    incorrectGuesses = 0;
    correctGuesses = 0;
    lost = false;
    win = false;

    for (let i = 0; i < 14; i++) {
        letters.push(new Letter(16 + 20 * i, 128, 65 + i));
    }
    for (let i = 0; i < 12; i++) {
        letters.push(new Letter(16 + 20 * i, 128 + 32, 65 + 14 + i));
    }
}

function reset() {
    hiddenWord = getRandomWord();
    lettersGuessed = [];
    incorrectGuesses = 0;
    correctGuesses = 0;

    for (let letter of letters) {
        letter.reset();
    }
}

function mousePressed() {
    if (lost || win) {
        reset();
        return;
    }

    let result;
    for (let letter of letters) {
        result = letter.collision();
        if (result != null) {
            verifyGuess(result);
        }
    }

    bruh = random() * 266;
}

function verifyGuess(guess) {
    lettersGuessed.push(guess);

    let valid = false;
    for (let i = 0; i < hiddenWord.length; i++) {
        if (hiddenWord.substring(i, i + 1).toUpperCase() == guess) {
            valid = true;
            break;
        }
    }

    incorrectGuesses = valid ? incorrectGuesses : incorrectGuesses + 1;

    if (valid) {
        for (let i = 0; i < hiddenWord.length; i++) {
            if (hiddenWord.substring(i, i + 1).toUpperCase() == guess) {
                correctGuesses++;
            }
        }
    }
}

function touchStarted() {
    
}

function draw() {
    background(bruh, 100, 50);

    // Setup font.
    textFont("Roboto Mono");
    textSize(32 * scale);

    let topLeft = 70;

    // Draw Text.
    if (!lost) {
        fill(255);
        noStroke();
        text(hiddenWord, 16 * scale, topLeft * scale);
    }

    let letterWidth = 0;
    let wordWidthAccumulation = 0;
    for (let i = 0; i < hiddenWord.length; i++) {
        // Cover letter if it hasn't been guessed.
        if (!lettersGuessed.includes(hiddenWord.substring(i, i + 1).toUpperCase())) {
            fill(50);
            noStroke();
            letterWidth = textWidth(hiddenWord.substring(i, i + 1));
            rect(16 * scale + wordWidthAccumulation, 16 * scale, letterWidth, (topLeft - 8) * scale);
        }

        // Underline letter.
        fill(255);
        noStroke();
        letterWidth = textWidth(hiddenWord.substring(i, i + 1));
        rect(16 * scale + wordWidthAccumulation, (topLeft + 8) * scale, letterWidth - 2 * scale, 2 * scale);
        wordWidthAccumulation += letterWidth;
    }

    for (let i = 0; i < 6; i++) {
        if (5 - i >= incorrectGuesses) {
            fill(255);
        } else {
            fill(100);
        }

        noStroke();
        circle(canvasWidth - 6 * 10 * scale + i * 10 * scale - 16 * scale, 24 * scale, 8 * scale);
    }

    for (let letter of letters) {
        letter.show();
    }
    
    lost = incorrectGuesses >= 6;
    win = correctGuesses === hiddenWord.length;

    if (lost) {
        fill(255, 0, 0);
        noStroke();
        textSize(32 * scale);
        text(hiddenWord, 16 * scale, topLeft * scale);
    } else if (win) {
        fill(50, 255, 0);
        noStroke();
        textSize(32 * scale);
        text(hiddenWord, 16 * scale, topLeft * scale);
    }    

    if (lost || win) {        
        fill(255);
        noStroke();
        textSize(8 * scale);
        text("click anywhere to play again", 16 * scale, (topLeft + 24) * scale);
    }

    noFill();
    stroke(255,0,0);
    circle(mouseX, mouseY, 8 * scale);
}