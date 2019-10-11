
function smartResize(paddingPerctange=0.1) {
    let usable = 1 - paddingPerctange;
    let finalWidth = windowWidth * usable;
    let finalHeight = finalWidth * 9 / 16;

    if (finalHeight > windowHeight * usable) {        
        finalHeight = windowHeight * usable;
        finalWidth = finalHeight * 16 / 9;
    }
    
    createCanvas(finalWidth, finalHeight);
}

function windowResized() {
    smartResize();
}

function getRandomWord() {
    return words[int(random() * words.length)];
}