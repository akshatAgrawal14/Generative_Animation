let rot=20;
let div=4;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  background(220);
}

function draw() {
  background(220);

  push();

  translate(width/2,height/2);
  noStroke();



  rotate(frameCount);
  for(let i=0; i<=div; i++ ){



    fill(235, 64, 52);
    ellipse(90+ mouseX/10,0,20);
    triangle(30+mouseX/10,-20, 30+mouseX/10,20,50+ mouseX/5,0);
   

    fill(232, 172, 21);
    ellipse(110+ mouseX/10,60,40);

    fill(28, 76, 235);
    triangle(130+mouseX/20,-20, 130+mouseX/20,20,150+ mouseX/5,0);
    rotate(360/div);
  }

  rotate(-frameCount);
  for(let i=0; i<=div; i++ ){
      fill(0,0,40);
      ellipse(0,0,50);

      fill(102, 6, 73);
      ellipse(20 + mouseX/10,0,40);
      rotate(360/div);
  }



  pop();
}



function mousePressed(){
  div+=1;
}
