let x = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(120);
}

function draw() {




  if (mouseX < width / 2 && mouseY < height / 2) {
    fill(180, 50, 50);
    rect(mouseX, mouseY, x, x / 2);
  }
  else if (mouseX < width / 2 && mouseY >= height / 2) {
    fill(80, 150, 50);
    ellipse(mouseX, mouseY, x);
    
    
  }
  else if (mouseX >= width / 2 && mouseY < height / 2) {
    fill(80, 50, 150);
    ellipse(mouseX, mouseY, x);

  }
  else {
    fill(180, 150, 250);
    
    rect(mouseX, mouseY, x, x / 2);
  }

  
  x = x + 1 / 10;


}

