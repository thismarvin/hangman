class Letter {
    constructor(x, y, charCode) {
        this.x = x;
        this.y = y;
        this.bounds = new Rectangle(this.x, this.y - 28, 18, 28);
        this.letter = String.fromCharCode(charCode);
        this.selected = false;
    }

    reset() {
        this.selected = false;
    }

    collision() {
        if (this.selected) {
            return null;
        }

        let mouseBounds = new Rectangle(mouseX / scale, mouseY / scale, 1 * scale, 1 * scale);

        if (mouseBounds.intersects(this.bounds)) {
            this.selected = true;        
            return this.letter;
        }

        return null;
    }

    show() {
        if (!this.selected) {
            fill(255);    
        } else {
            fill(100);
        }        
        noStroke();
        text(this.letter, this.x * scale, this.y * scale);

        //noFill();
        //stroke(255, 0, 0);
        //this.bounds.show();    
    }
}