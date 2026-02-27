class Scene {
    constructor(x, y, url, opacity, isVideo) {
        this.x = x;
        this.y = y;
        this.url = url;
        this.opacity = opacity;
        this.isShowing = false;
        this.isVideo = isVideo;
        this.isCurrentScene = false;

        if (this.isVideo) {
            this.asset = createVideo(this.url);
            

        } else {
            this.asset = loadImage(this.url);

        }

    }

    load() {
        this.asset.loop();
    }


    show() {
        //change opacity
      
        this.asset.hide();
        // this.asset.loop();
        // this.asset.play();
        image(this.asset, this.x, this.y);

        //show the image or video
        // fill(0, this.opacity);
        // rect(0, 0, width, height);

        if (this.isVideo) {
            this.asset.play();
        } 
        else {
            image(this.asset, 0, 0);
            if (!this.isShowing && this.isCurrentScene) {
                this.opacity -= 1;

            }
            if (this.opacity < 0) {
                this.isShowing = true;
            }
        }
        //fill(0, this.opacity);
        //rect(0,0,width,height);
    }

    setCurrentScene() {
        this.isCurrentScene = true;
    }

    canNextScenePlay() {
        if (this.isShowing) {
            return true;
        } else {
            return false;
        }
    }
}
