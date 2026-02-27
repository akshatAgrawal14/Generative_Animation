class Cover{
    constructor(x,y,w,h,opacity,vid,sceneCount){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.opacity=opacity;
        this.vid=vid;
        this.sceneCount=sceneCount;
    }
    
    load(){
        
        this.vid=createVideo("./assets/01_coverAnim/coverAnim_allLayers.mp4");
        this.vid.hide();
        this.vid.loop();
        imageMode(CENTER);
    }


    draw(){
        this.vid.play();
        tint(255,this.opacity);
        image(this.vid,this.x,this.y,this.w,this.h);
        sceneCount=2;
    }

    drawPurple(){
        let purpleLayerOpacity=0;
        if(SceneCount==2){
            fill(14, 12, 38,purpleLayerOpacity);
            rect(0, 0, this.w, this.h);

            function mouseWheel(event){
                if(event.deltaY>0){
                    purpleLayerOpacity+=10;
                }
                else{
                    purpleLayerOpacity-=10;
                }
                
            }
        }

        
                
    }

}

