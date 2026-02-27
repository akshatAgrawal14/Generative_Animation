let mySound;
let xPos,yPos;
let speed=5;;

function preload(){
  soundFormats('mp3','ogg');
  mySound=loadSound("./assets_sounds/1.mp3");
  mySound2=loadSound("./assets_sounds/2.mp3");
  xPos=80;
  yPos=40;
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(xPos,yPos,50);
  xPos+=speed;
  yPos+=speed;

  if (((xPos>width-25)||(xPos<25))){
    speed=-speed;
    mySound2.play();
  }

  if (((yPos>height-25)||(yPos<25))){
    speed=-speed;
    mySound.play();
  }
}


function mousePressed(){
  mySound.play();
}