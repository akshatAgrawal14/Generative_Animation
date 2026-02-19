let cols=["#50998d","#335ed4","#891db8","#e04fa4"];
let gSize=40;

function setup() {
  createCanvas(innerWidth/2, innerHeight/2);
  background(220);
  frameRate(24);
  translate(width/2,height/2);
}

function draw() {
  
  

  for(i=0;i<width;i+=gSize){
    for(j=0;j<height;j+=gSize){
      choice=(floor(random(0,cols.length)));
      fill(cols[choice]);
      rect(i,j,gSize);
    }
      
  }
}
