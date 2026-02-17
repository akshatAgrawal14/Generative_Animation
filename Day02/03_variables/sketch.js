let x;
let y;

function setup() {
  createCanvas(400, 400);
  x=0;
  y=400;
  
}

function draw() {
  background(220);

  noStroke();

  fill(0,y,x,100);
  ellipse(x,100,1.2*x);
  x=(x+15);

  fill(0,x,y,100);
  ellipse(y,300,1.2*x);
  y=(y-15);

  fill(0,mouseX,mouseY,100);
  ellipse(mouseX,mouseY, 30);

}
