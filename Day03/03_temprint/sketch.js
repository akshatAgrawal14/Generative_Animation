let xPos=0, yPos=0, gSize=100;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(220);
  frameRate(2000);
}

function draw() {
  
  


  strokeWeight(20);
  stroke(xPos/3,yPos/3, 202);
  let choice=random(0,1);

  if(choice>0.2 && choice<0.4){
    line(xPos, yPos, xPos+gSize,yPos+gSize);
    ellipse(xPos,yPos, 20);
  }
  else if(choice>0.4 && choice < 0.6){
    line(xPos+gSize/2,yPos+gSize, xPos+gSize/2,yPos);
    ellipse(xPos+gSize/2,yPos, 20);
  }
  else if(choice>0.6){
    line(xPos,yPos+gSize, xPos+gSize,yPos);
    ellipse(xPos,yPos, 20);
  }
  else{
    line(xPos,yPos+gSize/2,xPos+gSize,yPos+gSize/2);
    ellipse(xPos,yPos, 20);
  }

  
  
  
  xPos+=gSize;

  if(xPos>width){
    xPos=0;
    yPos+=gSize;
  }
}
