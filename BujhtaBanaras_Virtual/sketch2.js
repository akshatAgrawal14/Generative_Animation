let coverScene, scene1;
let startProgram=false;
function setup() {
    createCanvas(innerWidth, innerHeight);
    coverScene = new Scene(0, 0, "./assets/01_coverAnim/coverAnim_allLayers.mp4", 255, true);
    scene1 = new Scene(0, 0, "./assets/02_spread1/spread1.jpg", 255, false);
    coverScene.setCurrentScene();
    coverScene.load();
}

function draw() {
    background(220);
    if (startProgram) {
        coverScene.show();
        if (coverScene.canNextScenePlay()) {
            scene1.show();
        }
    }


}

function keyPressed() {
    startProgram = true;
}