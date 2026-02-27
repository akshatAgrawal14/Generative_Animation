let coverAnim;
let purpleLayerOpacity=0;
let blackLayerOpacity=0;
let sceneCount=0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  
  coverAnim=new Cover(width/2,height/2,width-500,height,255,coverAnim,sceneCount);
  coverAnim.load();
}

function draw() {
  background(28, 36, 69);
  coverAnim.draw();

  /*
  fill(14, 12, 38,purpleLayerOpacity);
  rect(0, 0, width, height);
  fill(7,7,7,blackLayerOpacity);
  rect(0, 0, width, height);
  */


  //coverAnim.drawPurple();
}
/*
function mouseWheel(event){
  if(event.deltaY>0){
    purpleLayerOpacity+=10;
    blackLayerOpacity+=1;
  }
  else{
    purpleLayerOpacity-=10;
    blackLayerOpacity-=1;
  }
  
}
  */