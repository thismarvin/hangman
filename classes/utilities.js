let scale;
let canvasWidth;
let canvasHeight;

function initialize() {    
    smartResize();
}

function smartResize(paddingPerctange=0.1) {
    let usable = 1 - paddingPerctange;
    canvasWidth = windowWidth * usable;
    canvasHeight = canvasWidth * 9 / 16;

    if (canvasHeight > windowHeight * usable) {        
        canvasHeight = windowHeight * usable;
        canvasWidth = canvasHeight * 16 / 9;
    }

    scale = canvasWidth / 320;
    
    createCanvas(canvasWidth, canvasHeight);
}

function windowResized() {
    smartResize();
}

function getRandomWord() {
    return words[int(random() * words.length)];
}