let flo=[];
let sway=0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (i=0;i<flo.length;i++){
    flo[i].drawf();
  }
  
}

function mousePressed(){
  flowerCols=color(random(0,255),random(0,255),random(0,255));
  let newFlo= new Flower (mouseX, mouseY, flowerCols );
  flo.push(newFlo);
}

function mouseDragged(){
  sway=map(mouseX, 0,width, -2,2);
  for (i=0;i<flo.length;i++){
    flo[i].movef(sway);
  }
}