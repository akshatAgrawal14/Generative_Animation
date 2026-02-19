let cols=["#50998d","#335ed4","#891db8","#e04fa4"];
let gSize=150;


let gridImages=[];


function preload(){
  gridImages[0]=loadImage("./Assets/0.png");
  gridImages[1]=loadImage("./Assets/1.png");
  gridImages[2]=loadImage("./Assets/2.png");
  gridImages[3]=loadImage("./Assets/3.png");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  
  frameRate(0.5);
}

function mousePressed() {
  background(220);
  tint(255*random(0,1),255*random(0,1),255*random(0,1));
  for(i=0;i<width;i+=gSize){
    for(j=0;j<height;j+=gSize){
      choice=(floor(random(0,gridImages.length)));
      
      
      image(gridImages[choice], i,j, gSize, gSize);
    }
      
  }
}
