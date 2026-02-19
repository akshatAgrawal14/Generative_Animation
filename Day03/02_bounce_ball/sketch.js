let xPos=60;
let xSpeed=20;
let yPos=60;
let ySpeed=30;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(220);
  angleMode(DEGREES);
}

function draw() {

  fill(sin(frameCount)*255,cos(frameCount)*255,sin(frameCount)*255);

  ellipse(xPos,yPos,100);
  //xPos+=xSpeed;
  yPos+=ySpeed;

  if(yPos>height-50 || yPos < 50){
    ySpeed=-ySpeed;
  }
  //else if(xPos>width-50 || xPos < 50){
   // xSpeed=-xSpeed;
  //}



}
