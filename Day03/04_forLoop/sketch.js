let gSize = 20;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(220);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  for (let i = 0; i < width; i += gSize) {
    for (let j = 0; j < height; j += gSize) {
      fill(random(0,10), random(80,120), random(220,255))
      ellipse(i, j,gSize*sin(frameCount+mouseX));
      noStroke();
    }

  }
}
