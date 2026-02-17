function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  //ellipse(100,100,50);

}


function mousePressed(){
  fill(40,50,60);
  house(mouseX,mouseY);
}

function mouseDragged(){
  fill(100,100,200);
  house(mouseX,mouseY,mouseX,mouseY,180);
}

function house(x,y,a,b,c){
  noStroke();
  fill(a,b,c);
  rect(x-50,y-25,100,50);
  triangle(x-50,y-25,x+50,y-25,x,y-75);
}