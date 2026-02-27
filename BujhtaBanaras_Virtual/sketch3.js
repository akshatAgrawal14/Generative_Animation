
let scrollPos = 0;
let transitionOpacity = 0;
let spread1BGX = 0;
let diyaScale = 1;
let diyaY, diyaX = 0;
let spread2BGX = 0;

let whiteRectX = 0; 
let spread3Opacity = 0;

// Bottom right Diya variable
let diya2Opacity = 0;

// Variables - drag-down interaction in Spread 3
let pullDist = 0;
let isDragging = false;
let startY = 0;

function setup() {
    createCanvas(innerWidth, innerHeight);
}

function draw() {
    background(0);

    // ACTION 1: The Cover 
    drawCover();

    // ACTION 2: The Transition (Starts at 0, ends at 500)
    transitionTo();

    // ACTION 3: Spread 1 (appears 600 to 800, moves from 900 to 2000)
    if (scrollPos > 500) {
        drawSpread1();
    }

    // ACTION 4: Next Scene (Starts at 2500)
    // if (scrollPos > 2500) { drawSpread2(); }

    // PERSISTENT ACTION: The Second Diya (Appears with Ghost Zoom, remains until the end)
    drawPersistentDiya();
}

// --- ACTION FUNCTIONS ---

function drawCover() {
    push();
    fill(100);
    rect(0, 0, width, height);
    pop();
}

function transitionTo() {
    push();
    transitionOpacity = map(scrollPos, 0, 500, 0, 255, true);
    fill(14, 12, 38, transitionOpacity);
    rect(0, 0, width, height);
    pop();
}

function drawSpread1() {
    //main fader to black for all
    let masterFade = map(scrollPos, 4500, 5000, 255, 0, true);

    noStroke();
    // spread 1 BG
    let spread1Opacity = map(scrollPos, 600, 800, 0, 255, true);
    spread1BGX = map(scrollPos, 1200, 3000, 0, -1400, true);


    push();
    fill(200, 50, 50, (spread1Opacity * masterFade) / 255);
    rect(spread1BGX, 0, width * 2, height);

    fill(255, (spread1Opacity * masterFade) / 255);
    ellipse(spread1BGX + width, 200, 200);



    // 2. PANEL A: Top Right (Fades & moves down)
    let panelA_Opacity = map(scrollPos, 3100, 3400, 0, 255, true);
    let panelA_Y = map(scrollPos, 3100, 3600, -200, 50, true);
    fill(60, (panelA_Opacity * masterFade) / 255);
    rect(spread1BGX + width * 1.7, panelA_Y, 300, 400);



    // 3. PANEL B: Bottom Right (Fades & moves down)
    let panelB_Opacity = map(scrollPos, 3700, 4000, 0, 255, true);
    let panelB_Y = map(scrollPos, 3700, 4200, height / 2 - height / 8, height / 2, true);

    fill(40, (panelB_Opacity * masterFade) / 255);
    rect(spread1BGX + width * 1.7, panelB_Y, 300, 600);
    fill(200, (panelB_Opacity * masterFade) / 255);
    ellipse(spread1BGX + width * 1.7 + 150, panelB_Y + 400, 60);

    pop();


    // 2. THE DIYA (bridge to Spread 2)
    let diyaOpacity = map(scrollPos, 3700, 4000, 0, 255, true);
    diyaScale = map(scrollPos, 5000, 6000, 1, 2, true);
    diyaY = map(scrollPos, 5000, 6000, 0, -150, true);
    diyaX = map(scrollPos, 6800, 8000, 0, -width * 0.6, true);



    // 3. SPREAD 2 APPEARS 
    if (scrollPos > 5500) {
        drawSpread2();
    }


    // The Diya stays visible while the rest fades
    push();
    // Diya fades out as the ghost zoom begins
    let diyaFinalFade = map(scrollPos, 8500, 9500, 255, 0, true);
    fill(255, 200, 50, (diyaOpacity * diyaFinalFade) / 255);
    translate(diyaX + spread1BGX + width * 1.7 + 150, panelB_Y + 400 + diyaY);
    scale(diyaScale);
    ellipse(0, 0, 60);
    pop();

}



function drawSpread2() {

    // One long Rectangle - Placeholder of three smaller panels
    let spread2Opacity = map(scrollPos, 5500, 7000, 0, 255, true);
    // scroll - more of the panel appears from the right
    spread2BGX = map(scrollPos, 6000, 8000, width, width * 0.05, true);
    
    // Global slide left when moving to Spread 3
    let spread2SlideLeft = map(scrollPos, 14000, 16000, 0, -width, true);




    push();
    translate(spread2SlideLeft, 0);

    // Fade entire spread 2 out during transition to spread 3
    let spread2MasterFade = map(scrollPos, 14000, 15000, 255, 0, true);






    // 1. Initial Panel and Head Zoom
    // As we scroll, the head zooms in and the panel fades away
    let ghostZoom = map(scrollPos, 8500, 10000, 1, 4, true);
    let headAndPanelFade = map(scrollPos, 9000, 10500, 255, 0, true);
    let headAndPanelX = map(scrollPos, 9000, 10500, 0, -100, true);

    push();
    fill(60, (spread2Opacity * headAndPanelFade * spread2MasterFade) / (255 * 255));
    // first "one third" of the long panel settling in
    rect(spread2BGX+headAndPanelX, height * 0.1, width * 0.9, height * 0.8);

    //placeholder - head of ghost (zooming)
    translate(spread2BGX + width * 0.8, height * 0.3);
    scale(ghostZoom);
    fill(255, (spread2Opacity * headAndPanelFade * spread2MasterFade) / (255 * 255));
    ellipse(headAndPanelX, 0, 80);
    pop();




    push();
    // 2. Zoomed-in White Rectangle appears
    let zoomRectOpacity = map(scrollPos, 9500, 10500, 0, 255, true);
    let zoomRectScale = map(scrollPos, 9500, 10500, 0, 1, true);
    whiteRectX = map(scrollPos, 11000, 12000, width * 0.35, width * 0.05, true);
    
    rectMode(CENTER);
    translate(whiteRectX+width*0.5, height * 0.3);
    scale(zoomRectScale);
    fill(255, (zoomRectOpacity * spread2MasterFade) / 255);
    rect(-width*0.3,0, width * 0.4, height * 0.2);
    pop();




    // 3. First Text appears below white rectangle
    let text1Opacity = map(scrollPos, 11500, 12500, 0, 255, true);
    fill(255, (text1Opacity * spread2MasterFade) / 255);
    textSize(22);
    text("Are, kidhar aa gaye hum?", whiteRectX, height * 0.44);
    text("i was supposed to", whiteRectX, height * 0.48);
    text("be in Banaras, na", whiteRectX, height * 0.52);





    // 4. Large center white rectangle (Ghost looking front)
    let frontGhostOpacity = map(scrollPos, 12500, 13500, 0, 255, true);

    let lookAwayFade = map(scrollPos, 14000, 14500, 255, 0, true);
    
    fill(255, (frontGhostOpacity * lookAwayFade) / 255);
    rect(width * 0.4, height * 0.4, width * 0.3, height * 0.6);





    // 5. Second Text appears
    let text2Opacity = map(scrollPos, 13000, 14000, 0, 255, true);
    fill(255, (text2Opacity * spread2MasterFade) / 255);
    text("Why so many people here?", width * 0.75, height * 0.24);
    text("and my grandson,", width * 0.75, height * 0.28);
    text("where's he?", width * 0.75, height * 0.32);
    text("Chal kya raha hai ye?", width * 0.75, height * 0.4);


    pop();

    // Trigger Spread 3
    if (scrollPos > 14000) {
        drawSpread3();
    }
}

function drawSpread3() {
    spread3Opacity = map(scrollPos, 14000, 15000, 0, 255, true);
    let ghostAwayOpacity = map(scrollPos, 14000, 15500, 0, 255, true);
    let ghostAwayX = map(scrollPos, 14000, 15500, 0, -400, true);




    push();
    // 1. Past BG (Behind)
    fill(255, 180, 50, spread3Opacity);
    rect(0, 0, width, height);
    
    // Text in the past (Only fully visible when dragged)
    fill(50, spread3Opacity);
    textSize(30);
    text("What's with these lgihts?", width * 0.08, height * 0.1);
    text("they hurt my eye", width * 0.08, height * 0.14);
    text("kuch dikh nhi raha", width * 0.08, height * 0.18);
    text("sirf bheed hi bheed", width * 0.08, height * 0.22);
 
    text("where's that", width * 0.08, height * 0.3);
    text("peaceful maahaul?", width * 0.08, height * 0.34);
    text("wo shaanti...", width * 0.08, height * 0.38);




    // 2. Present BG (In front)
    // We translate this layer by pullDist to reveal what's behind
    push();
    translate(0, pullDist);
    fill(20, 0, 80, spread3Opacity); // Your blue/modern color
    


    // Create the "Cut" in the top-left using a Shape with a Contour (hole)
    noStroke();
    beginShape();
    // Outer rectangle (The full background)
    vertex(0, 0);
    vertex(width, 0);
    vertex(width, height);
    vertex(0, height);
    // Inner rectangle (The "cut" hole - vertices must be in reverse order)
    beginContour();
    vertex(0, 0);
    vertex(0, 250);
    vertex(300, 200);
    vertex(350, 0);
    endContour();
    endShape(CLOSE);






    // Ghost Looking Away (Stays on the front layer)
    fill(120, 255, 255, ghostAwayOpacity);
    rect(width * 0.4 + ghostAwayX, height * 0.4, width * 0.3, height * 0.6);
    pop();

    pop();
}

// diya in the bottom right always
function drawPersistentDiya() {

    diya2Opacity = map(scrollPos, 9500, 10500, 0, 255, true);
    
    // extinguishing at the end
    let extinguishFade = map(scrollPos, 20000, 21000, 255, 0, true);

    if (diya2Opacity > 0) {
        push();
        fill(255, 200, 50, (diya2Opacity * extinguishFade) / 255);
        noStroke();
        // Positioned at the bottom right corner
        ellipse(width - 100, height - 100, 50);
        pop();
    }
}

function mouseWheel(event) {
    scrollPos += event.delta;
    if (scrollPos < 0) {
        scrollPos = 0;
    }
    console.log(scrollPos);
}



function mousePressed() {
    
    if (scrollPos > 14000) { // only if spread 3 
        isDragging = true;
        startY = mouseY - pullDist;
    }
}

function mouseDragged() {
    if (isDragging) {
        pullDist = mouseY - startY;
        pullDist = constrain(pullDist, 0, height * 0.9); //limit dragging
    }
}

function mouseReleased() {
    isDragging = false;
    
    pullDist = 0; //magnetic - back to top automatically
}