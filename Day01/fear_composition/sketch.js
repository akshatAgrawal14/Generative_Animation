function setup() {
  createCanvas(1000, 1000);
}



function draw() {
  background(10,10,10);
  
  noStroke();
  
  fill(30,30,30);
  quad(150,0,250,1000,750,1000,850,0);
  triangle(150,0,250,1000,100,400);
  triangle(750,1000,850,0,900,400);
  
  
  fill(179, 0, 0);
  ellipse(500,250,450,650);
  ellipse(500,650,300,400);
  ellipse(500,950,280,300);
  
  
  //legs left
  quad(385,530,220,130,190,200);
  quad(220,130,190,200, -60,110,20,-30);
  
  quad(385,530,200,300,190,350);
  quad(200,300,190,350, 0,380,0,290);
  
  quad(385,530,200,450,190,500);
  quad(200,450,190,500, 0,600,0,500);
  
  quad(385,530,170,610,200,680);
  quad(170,610,200,680, 10,1100,-10,850);
  
  
  //legs right
  quad(615,530,780,130,810,200);
  quad(780,130,810,200, 1060,110,980,-30);
  
  quad(615,530,800,300,810,350);
  quad(800,300,810,350, 1000,380,1000,290);
  
  quad(615,530,800,450,810,500);
  quad(800,450,810,500, 1000,600,1000,500);
  
  quad(615,530,830,610,800,680);
  quad(830,610,800,680, 990,1100,1010,850);
  
  
  
  fill(30,30,30);
  ellipse(500,1000,250,300);
  
  
  //triangles
  fill(180,180,180);
  triangle(410,1000,470,1000,440,700);
  triangle(530,1000,590,1000,560,700);
  triangle(470,0,530,0,500,300);
  triangle(220,0,280,0,350,200);
  triangle(780,0,720,0,650,200);
  
  fill(140,0,0);
  quad(400,250,435,350,430,450,390,365);
  quad(600,250,565,350,570,450,610,365);
  quad(500,470,520,550,500,630,480,550);

  
  //drawGrid();
}


//Ignore Below Code
//Function to draw a grid in the background
function drawGrid() {
  stroke(50);

  //find number of segmentation first
  let segX = (width / 100) * 10;
  let segY = (height / 100) * 10;

  //find width of one segment
  let xW = width / segX;
  let yW = height / segY;

  //draw Columns - loop
  for (let i = 0; i < segX; i++) {
    //change line stroke weight
    strokeWeight(0.4);

    //change stroke width on every 10th line
    if (i % 10 == 0) {
      strokeWeight(2);
    }
    line(xW * i, 0, yW * i, height);
  }

  //draw rows - loop
  for (let i = 0; i < segY; i++) {
    //change line stroke weight
    strokeWeight(0.4);

    //change stroke width on every 10th line
    if (i % 10 == 0) {
      strokeWeight(2);
    }
    line(0, yW * i, width, yW * i);
  }

  stroke(255);
}
