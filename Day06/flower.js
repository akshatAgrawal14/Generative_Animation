class Flower {
    constructor(x, y, col) {
        this.x = x;
        this.base=x;
        this.y = y;
        this.col = col;
    }

    drawf(){

        noStroke();
        fill(this.col);
        ellipse(this.x, this.y - 28, 20);
        ellipse(this.x - 20, this.y - 20, 20);
        ellipse(this.x + 20, this.y - 20, 20);

        triangle(this.x, this.y, this.x - 24, this.y - 11, this.x - 10, this.y - 22);
        triangle(this.x, this.y, this.x - 10, this.y - 27, this.x + 10, this.y - 27);
        triangle(this.x, this.y, this.x + 24, this.y - 11, this.x + 10, this.y - 22);
        fill(20);

        strokeWeight(5);
        rect(this.base - 1, this.y, 2, 40);
        ellipse(this.x, this.y, 20);
    }

    movef(sway){
        this.x+=sway;
    }

}
