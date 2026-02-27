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

// --- NEW VARIABLES FOR SPREAD 4, 5, 6, 7, 8 & 9 ---
let pastSeen = false;
let gatewayPullDist = 0;
let isDraggingGateway = false;
let gatewayPassed = false;
let spread4Opacity = 0;
let spread5Opacity = 0;

// Spread 5 Flap Variables
let flapL_X = 0; let isDraggingL = false; let startXL = 0;
let flapT_Y = 0; let isDraggingT = false; let startYT = 0;
let flapR_X = 0; let isDraggingR = false; let startXR = 0;

// Spread 6 Variables
let s6Opacity = 0;
let flapsS6 = [];
let numFlapsS6 = 13;
let anyFlapClicked = false;
let s6PullUpDist = 0;
let isDraggingS6 = false;
let s6FullyPulled = false;

// Spread 8 Variables
let s8Opacity = 0;
let s8_p1, s8_p2, s8_p3, s8_p4;

// Spread 9 Variables
let s9_pMeanwhile, s9_pCruise, s9_pHit, s9_pDied, s9_pVanish;
let s9Opacity = 0;

// --- ENDING ---
let endCoverImg;
let endCoverX = 0;

// --- INSTRUCTION ASSETS ---
let mouseImg, scrollArrowImg, grabImg, clickImg;

// Asset Variables
let coverVid, s1BG, pA, pB, diyaImg;
let s2BG, gHead, gFront;
let s3Past, s3Modern, gAway, gAway2;
let s4BG, s4Gateway;
let s5BG, flapL_Img, flapT_Img, flapR_Img;
let s6Present, s7Past;
let flapImagesS6 = [];

let poorRichardFont, gillFont, gillBoldFont;

// PNG Sequence for Persistent Diya
let diyaSeq = [];
let numDiyaFrames = 60;

function preload() {
    coverVid = createVideo(['./assets/01_coverAnim/coverAnim_allLayers.mp4']);
    coverVid.hide();
    coverVid.loop();
    coverVid.volume(0);

    poorRichardFont = loadFont('./assets/POORICH.ttf');
    gillBoldFont = loadFont('./assets/Gill Sans MT Condensed Bold.ttf');
    gillFont = loadFont('./assets/Gill Sans MT Condensed.ttf');

    for (let i = 0; i < numDiyaFrames; i++) {
        diyaSeq[i] = loadImage('./assets/PersistentDiya_pngSeq/diya' + i + '.png');
    }

    // Instructions
    mouseImg = loadImage('./assets/icons/mouse.png');
    scrollArrowImg = loadImage('./assets/icons/arrow.png');
    grabImg = loadImage('./assets/icons/drag.png');
    clickImg = loadImage('./assets/icons/click.png');

    s1BG = loadImage('./assets/02_spread1/spread1bg.jpg');
    pA = loadImage('./assets/02_spread1/spread1_panelA.jpg');
    pB = loadImage('./assets/02_spread1/spread1_panelB.jpg');
    diyaImg = loadImage('./assets/02_spread1/spread1_diya.png');

    s2BG = loadImage('./assets/03_spread2/pg3_topPanels.jpg');
    gHead = loadImage('./assets/03_spread2/pg3_closeUpPanel.jpg');
    gFront = loadImage('./assets/03_spread2/pg3_gFront.png');

    s3Past = loadImage('./assets/04_spread3/pg4B.jpg');
    s3Modern = loadImage('./assets/04_spread3/pg4_cut.png');
    gAway = loadImage('./assets/04_spread3/pg4_gAway.png');

    s4BG = loadImage('./assets/05_spread4/kv.png');
    s4Gateway = loadImage('./assets/05_spread4/entry frame.png');
    gAway2 = loadImage('./assets/05_spread4/ancestor.png');

    s5BG = loadImage('./assets/06_spread5/past_bg.png');
    flapL_Img = loadImage('./assets/06_spread5/present_left.png');
    flapT_Img = loadImage('./assets/06_spread5/present_top.png');
    flapR_Img = loadImage('./assets/06_spread5/present_right.png');

    s6Present = loadImage('./assets/07_spread6/spread 6_bg2_cutout.png');
    s7Past = loadImage('./assets/07_spread6/spread7_bg2.png');

    for (let i = 0; i < numFlapsS6; i++) {
        flapImagesS6[i] = loadImage('./assets/07_spread6/flap' + (i + 1) + '.png');
    }

    s8_p1 = loadImage('./assets/08_spread8/8top.png');
    s8_p2 = loadImage('./assets/08_spread8/8mid1.png');
    s8_p3 = loadImage('./assets/08_spread8/8mid2.png');
    s8_p4 = loadImage('./assets/08_spread8/8bottom.png');

    s9_pMeanwhile = loadImage('./assets/09_spread9/9meanwhileDiya.png');
    s9_pCruise = loadImage('./assets/09_spread9/9cruise.png');
    s9_pHit = loadImage('./assets/09_spread9/9diyaHit.png');
    s9_pDied = loadImage('./assets/09_spread9/9diyaDied.png');
    s9_pVanish = loadImage('./assets/09_spread9/9ghostVanish.png');

    endCoverImg = loadImage('./assets/endCover.png');
}

function setup() {
    createCanvas(1480, 1160);

    let manualCoords = [
        { x: 1648, y: 129 }, { x: 1647, y: 350 }, { x: 1743, y: 626 },
        { x: 1635, y: 853 }, { x: 1913, y: 277 }, { x: 1876, y: 790 },
        { x: 2116, y: 187 }, { x: 2094, y: 400 }, { x: 2044, y: 627 },
        { x: 2134, y: 954 }, { x: 2308, y: 828 }, { x: 2524, y: 30 },
        { x: 2752, y: 322 }
    ];

    for (let i = 0; i < numFlapsS6; i++) {
        flapsS6.push({
            x: manualCoords[i].x,
            y: manualCoords[i].y,
            w: 125,
            h: 125,
            img: flapImagesS6[i],
            alpha: 255,
            clicked: false,
            revealTime: 0
        });
    }
}

function draw() {
    background(0);
    drawCover();
    transitionTo();

    if (scrollPos > 500) { drawSpread1(); }
    
    let initialScrollAlpha = map(scrollPos, 400, 1000, 255, 0, true);
    if (initialScrollAlpha > 0) {
        drawScrollInstruction(width/2, height*0.85, initialScrollAlpha);
    }

    if (scrollPos > 18000) { drawSpread4(); }

    if (scrollPos > 14800 && scrollPos < 18000) {
        let grab3Alpha = map(scrollPos, 14800, 15500, 0, 255, true);
        if (pastSeen) grab3Alpha = map(pullDist, 0, height*0.4, 255, 0, true); 
        drawGrabInstruction(width*0.55, height*0.12, grab3Alpha, 0); 
    }

    if (scrollPos > 18000 && scrollPos < 23000) {
        let grab4Alpha = map(scrollPos, 18000, 19000, 0, 255, true);
        if (gatewayPassed) grab4Alpha = map(gatewayPullDist, 0, -50, 255, 0, true); 
        drawGrabInstruction(width*0.15, height*0.2, grab4Alpha, PI);
    }

    if (scrollPos > 23000) { drawSpread5(); }

    if (scrollPos > 23000 && scrollPos < 26000) {
        let s5GrabAlpha = map(scrollPos, 23000, 24000, 0, 255, true);
        let leftAlpha = s5GrabAlpha * map(abs(flapL_X), 0, 100, 1, 0, true);
        let topAlpha = s5GrabAlpha * map(abs(flapT_Y), 0, 100, 1, 0, true);
        let rightAlpha = s5GrabAlpha * map(abs(flapR_X), 0, 100, 1, 0, true);
        drawGrabInstruction(width*0.15, height/2, leftAlpha, HALF_PI); 
        drawGrabInstruction(width/2, height*0.2, topAlpha, PI);          
        drawGrabInstruction(width*0.85, height/2, rightAlpha, -HALF_PI); 
    }

    if (scrollPos > 26000) { drawSpread6(); }

    if (scrollPos > 31500 && !anyFlapClicked) {
        let clickAlpha = map(scrollPos, 31500, 32000, 0, 255, true);
        drawClickInstruction(width*0.155, height*0.15, clickAlpha);
    }

    if (anyFlapClicked && !s6FullyPulled) {
        let grab6Alpha = map(scrollPos, 32000, 32500, 255, 255, true);
        if (s6PullUpDist < -50) grab6Alpha = map(s6PullUpDist, 0, -200, 255, 0, true);
        drawGrabInstruction(width*0.75, height*0.5, grab6Alpha, PI);
    }

    if (scrollPos > 32500) { drawSpread8(); }
    if (scrollPos > 43000) { drawSpread9(); }
    if (scrollPos > 57000) { drawEnding(); }

    drawPersistentDiya();
}

// --- INSTRUCTION FUNCTIONS (With Alpha Parameters) ---

function drawGrabInstruction(x, y, masterAlpha, rotation = 0) {
    if (masterAlpha <= 0) return;
    let grabMove = map(sin(frameCount * 0.08), -1, 1, 0, 40);
    push();
    translate(x, y);
    rotate(rotation);
    imageMode(CENTER);
    tint(255, masterAlpha);
    image(grabImg, 0, grabMove, 80, 80);
    pop();
}

function drawScrollInstruction(x, y, masterAlpha) {
    let bounce = sin(frameCount * 0.05);
    let waveAlpha = map(bounce, -1, 1, 150, 255) * (masterAlpha / 255);
    let mouseMove = map(bounce, -1, 1, 0, 10);
    let arrowMove = map(bounce, -1, 1, 0, 30);
    push();
    imageMode(CENTER);
    tint(255, waveAlpha);
    image(mouseImg, x, y + mouseMove, 80, 90);
    image(scrollArrowImg, x, y + 60 + arrowMove, 40, 40);
    pop();
}

function drawClickInstruction(x, y, masterAlpha) {
    if (masterAlpha <= 0) return;
    let pulse = map(sin(frameCount * 0.05), -1, 1, 0.9, 1.1);
    push();
    imageMode(CENTER);
    translate(x, y);
    scale(pulse);
    tint(255, masterAlpha);
    image(clickImg, 0, 0, 80, 80);
    pop();
}

// --- ACTION FUNCTIONS ---

function drawCover() { push(); tint(255, map(scrollPos, 0, 500, 255, 0, true)); image(coverVid, 0, 0, width, height); pop(); }
function transitionTo() { push(); transitionOpacity = map(scrollPos, 0, 500, 0, 255, true); fill(20, 20, 20, transitionOpacity); rect(0, 0, width, height); pop(); }

function drawSpread1() {
    let masterFade = map(scrollPos, 5300, 7300, 255, 0, true);
    noStroke();
    let spread1Opacity = map(scrollPos, 600, 800, 0, 255, true);
    spread1BGX = map(scrollPos, 2000, 3800, 0, -1470, true);
    push();
    tint(255, (spread1Opacity * masterFade) / 255);
    image(s1BG, spread1BGX, 0, width * 2, height);
    let text1Wipe = map(scrollPos, 850, 1500, 0, 800, true);
    let text2Wipe = map(scrollPos, 1300, 1900, 0, 500, true);
    push(); drawingContext.save(); drawingContext.beginPath(); drawingContext.rect(spread1BGX + 110, height * 0.08, text1Wipe, 100); drawingContext.clip(); fill(255, (spread1Opacity * masterFade) / 255); textSize(40); textFont(poorRichardFont); text("On the eve of Dev Deepawali,", spread1BGX + 110, height * 0.12); drawingContext.restore(); pop();
    push(); drawingContext.save(); drawingContext.beginPath(); drawingContext.rect(spread1BGX + 110, height * 0.1, text2Wipe, 150); drawingContext.clip(); fill(255, (spread1Opacity * masterFade) / 255); textSize(40); textFont(poorRichardFont); text("Varanasi", spread1BGX + 110, height * 0.155); drawingContext.restore(); pop();
    let panelA_Opacity = map(scrollPos, 3900, 4200, 0, 255, true);
    let panelA_Y = map(scrollPos, 3900, 4400, -200, 50, true);
    tint(255, (panelA_Opacity * masterFade) / 255);
    image(pA, spread1BGX + width * 1.57, panelA_Y, 570, 370);
    let panelB_Opacity = map(scrollPos, 4500, 4800, 0, 255, true);
    let panelB_Y = map(scrollPos, 4500, 5000, height / 2 - height / 8, height / 2, true);
    tint(255, (panelB_Opacity * masterFade) / 255);
    image(pB, spread1BGX + width * 1.57, panelB_Y - height * 0.1, 570, 700);
    pop();
    let diyaOpacity = map(scrollPos, 4500, 4800, 0, 255, true);
    diyaScale = map(scrollPos, 5800, 6800, 1.5, 1.75, true);
    diyaY = map(scrollPos, 5800, 7170, 0, -240, true);
    diyaX = map(scrollPos, 7170, 8800, 0, -width * 0.62, true);
    if (scrollPos > 6300) { drawSpread2(); }
    push();
    let diyaFinalFade = map(scrollPos, 9300, 10300, 255, 0, true);
    tint(255, (diyaOpacity * diyaFinalFade) / 255);
    translate(diyaX + spread1BGX + width * 1.7 + 150, panelB_Y + 370 + diyaY);
    scale(diyaScale);
    imageMode(CENTER);
    image(diyaImg, 0, 0, 240, 240);
    pop();
}

function drawSpread2() {
    let spread2Opacity = map(scrollPos, 6300, 7800, 0, 255, true);
    spread2BGX = map(scrollPos, 6300, 8800, width, width * 0.05, true);
    let spread2SlideLeft = map(scrollPos, 14800, 16800, 0, -width, true);
    push(); translate(spread2SlideLeft, 0);
    let spread2MasterFade = map(scrollPos, 14800, 15800, 255, 0, true);
    let ghostZoom = map(scrollPos, 9300, 10800, 1, 4, true);
    let headAndPanelFade = map(scrollPos, 9800, 11300, 255, 0, true);
    let headAndPanelX = map(scrollPos, 9800, 11300, 0, -100, true);
    push(); tint(255, (spread2Opacity * headAndPanelFade * spread2MasterFade) / (255 * 255)); image(s2BG, spread2BGX + headAndPanelX, height * 0.2, width * 0.9, height * 0.55); pop();
    push(); let zoomRectOpacity = map(scrollPos, 10300, 11300, 0, 255, true); let zoomRectScale = map(scrollPos, 10300, 11300, 0, 1, true); whiteRectX = map(scrollPos, 11400, 12800, width * 0.35, width * 0.05, true); translate(whiteRectX + width * 0.5, height * 0.35); scale(zoomRectScale); tint(255, (zoomRectOpacity * spread2MasterFade) / 255); imageMode(CENTER); image(gHead, -width * 0.3, -height * 0.15, width * 0.4, height * 0.2); pop();
    let text1Opacity = map(scrollPos, 12300, 13300, 0, 255, true);
    fill(255, (text1Opacity * spread2MasterFade) / 255); textSize(38); textFont(gillFont); text("ARE, KIDHAR AA GAYE HUM?", whiteRectX, height * 0.4); text("I WAS SUPPOSED TO", whiteRectX, height * 0.44); text("BE IN BANARAS, NA", whiteRectX, height * 0.48);
    let frontGhostOpacity = map(scrollPos, 13300, 14300, 0, 255, true);
    let lookAwayFade = map(scrollPos, 14800, 15300, 255, 0, true);
    tint(255, (frontGhostOpacity * lookAwayFade) / 255); image(gFront, width * 0.2, height * 0.24, width * 0.7, height * 0.8);
    let text2Opacity = map(scrollPos, 13800, 14800, 0, 255, true);
    fill(255, (text2Opacity * spread2MasterFade) / 255); text("WHY SO MANY PEOPLE HERE?", width * 0.7, height * 0.13); text("AND MY GRANDSON,", width * 0.7, height * 0.17); text("WHERE'S HE?", width * 0.7, height * 0.21); text("CHAL KYA RAHA HAI YE?", width * 0.7, height * 0.25);
    pop();
    if (scrollPos > 14800) { drawSpread3(); }
}

function drawSpread3() {
    spread3Opacity = map(scrollPos, 14800, 15800, 0, 255, true);
    let ghostAwayOpacity = map(scrollPos, 14800, 16300, 0, 255, true);
    let ghostAwayX = map(scrollPos, 14800, 16300, 0, -480, true);
    let ghostAwayX2 = map(scrollPos, 18000, 20000, 0, 1000, true);
    push(); tint(255, spread3Opacity); image(s3Past, 0, 0, width, height); 
    fill(200, spread3Opacity); textSize(34); textFont(gillFont);
    text("WHAT'S WITH THESE LIGHTS?", width * 0.08, height * 0.1); 
    text("THEY HURT MY EYE", width * 0.08, height * 0.14); 
    text("KUCH DIKH NHI RAHA", width * 0.08, height * 0.18); 
    text("SIRF BHEED HI BHEED", width * 0.08, height * 0.22); 
    text("WHERE'S THAT", width * 0.08, height * 0.3); 
    text("PEACEFUL MAAHAUL?", width * 0.08, height * 0.34); 
    text("WO SHAANTI...", width * 0.08, height * 0.38);
    push(); translate(0, pullDist); drawingContext.shadowOffsetX = -20; drawingContext.shadowOffsetY = 0; drawingContext.shadowBlur = 2; drawingContext.shadowColor = color(10, 10, 10, (spread3Opacity / 255) * 250); tint(255, spread3Opacity); image(s3Modern, 0, 0, width, height); pop();
    tint(255, ghostAwayOpacity); image(gAway, width * 0.32 + ghostAwayX + ghostAwayX2, height * 0.36, width * 0.4, height * 0.67); pop();
}

function drawPersistentDiya() {
    diya2Opacity = map(scrollPos, 10300, 11300, 0, 255, true);
    let dScale = map(scrollPos, 49000, 50500, 1, 2.5, true);
    let dX = map(scrollPos, 49000, 50500, width * 0.87, width * 0.75, true);
    let dY = map(scrollPos, 49000, 50500, height * 0.9, height * 0.85, true);
    let driftX = map(scrollPos, 56000, 58000, 0, -width/4, true);
    let finalDiyaFade = map(scrollPos, 56000, 58000, 255, 0, true);

    if (diya2Opacity > 0) {
        let currentFrame = floor(frameCount / 2) % diyaSeq.length;
        push();
        tint(255, (diya2Opacity * finalDiyaFade) / 255);
        imageMode(CENTER);
        translate(driftX, 0);
        if (scrollPos > 51000) {
            image(s9_pDied, dX, dY-height*0.2, 220 * dScale, 330 * dScale);
        } else {
            image(diyaSeq[currentFrame], dX, dY, 730 * dScale, 640 * dScale);
        }
        pop();
    }
}

function drawSpread4() {
    spread4Opacity = map(scrollPos, 18000, 19500, 0, 255, true);
    let gAway2Opacity = map(scrollPos, 18000, 20500, 0, 255, true);
    let gAway2X = map(scrollPos, 18000, 20000, width * 0.01, width * 0.66, true);
    
    push();
    tint(255, spread4Opacity);
    image(s4BG, 0, 0, width, height);
    
    fill(255, spread4Opacity);
    textFont(gillFont);
    textSize(40);
    textAlign(LEFT);
    text("YE BADKA SA DARWAJA...", width*0.12, height*0.7);
    text("WHERE DID THIS COME FROM?", width*0.12, height*0.74);
    text("YE KYA HO GAYA HAI", width*0.12, height*0.3);
    text("BANARAS KO?", width*0.12, height*0.34);
    pop();

    push();
    translate(0, gatewayPullDist);
    tint(255, spread4Opacity);
    image(s4Gateway, 0, 0, width, height); 
    pop();

    push();
    tint(255, gAway2Opacity);
    image(gAway2, gAway2X, height * 0.5, width * 0.35, height * 0.6);
    pop();
}

function drawSpread5() {
    spread5Opacity = map(scrollPos, 23000, 24500, 0, 255, true);
    let s6SlideX = map(scrollPos, 26000, 32000, width, -width, true);
    let spread5SlideLeft = s6SlideX - width;
    
    push();
    translate(spread5SlideLeft, 0);
    tint(255, spread5Opacity);
    image(s5BG, 0, 0, width, height);

    fill(0, spread5Opacity);
    textFont(gillFont);
    textSize(36);
    textAlign(CENTER);
    text("AUR YE KACHORI GALI ME ITNA SANNATA?", width/2, height * 0.67);
    text("IT USED TO BE BUSTLING WITH PEOPLE,", width/2, height * 0.7);
    text("WO MAAHAUL YAAR...", width/2, height * 0.79);
    text("BACHCHE TABLA, KATHAK PRACTICE KARTE", width/2, height * 0.82);
    text("THE IDHAR, USKA ALAG HI AANAND THA.", width/2, height * 0.85);

    push(); translate(flapL_X, 0); image(flapL_Img, 0, 0, width / 3, height); pop();
    push(); translate(0, flapT_Y); image(flapT_Img, width / 3, 0, width / 3, height * 0.565); pop();
    push(); translate(flapR_X, 0); image(flapR_Img, width - width / 3, 0, width / 3, height); pop();
    pop();
}

function drawSpread6() {
    s6Opacity = map(scrollPos, 26000, 27500, 0, 255, true);
    let s6SlideX = map(scrollPos, 26000, 32000, width, -width, true);
    let revealProg = map(s6PullUpDist, 0, -height, 0, 1, true);
    let s7Scale = lerp(1.0, 0.5, revealProg);
    let s7FixedX = lerp(s6SlideX, 0, revealProg);
    let s7FixedY = lerp(-height, 0, revealProg);

    // DRAW SPREAD 7 (THE PAST)
    push();
    translate(s7FixedX * s7Scale, s7FixedY * s7Scale); scale(s7Scale);
    tint(255, s6Opacity);
    image(s7Past, 0, 0, width * 2, height * 2);
    
    fill(255, s6Opacity);
    textFont(gillFont);
    textSize(72);
    textAlign(LEFT);
    text("WO SAKRI GALIYAAN HI TOH JAAN THI\nEVERYTHING - HOUSES, SHOPS, PEOPLE\nWERE CONNECTED THROUGH THEM.", width*0.1, height * 0.15);
    pop();

    // DRAW SPREAD 6 (THE MODERN)
    push();
    translate(s6SlideX, s6PullUpDist); 
    tint(255, s6Opacity);
    image(s6Present, 0, 0, width * 2, height);

    let s6TextAlpha = map(s6PullUpDist, 0, -300, 255, 0, true);
    fill(255, (s6Opacity * s6TextAlpha) / 255);
    textFont(gillFont);
    textSize(36);
    textAlign(LEFT);
    text("HUMARA GHAR... GONE\nWHERE ARE THEY ALL LIVING NOW?\nWO SAARE MANDIR...\nWO GALIYAN...", width * 0.08, height * 0.1);
    text("HOW CAN THEY JUST VANISH?\nAND INSTEAD THIS BIG.\nBOX OF BRICKS STANDS", width * 0.08, height * 0.3);
    
    for (let f of flapsS6) {
        //pulsing glow behind the flaps
        if (f.alpha > 0 && !f.clicked) {
            let glowPulse = map(sin(frameCount * 0.04), -1, 1, 40, 120);
            push();
            noStroke();
            fill(255, 255, 180, (s6Opacity * glowPulse) / 255);
            ellipse(f.x + f.w/2, f.y + f.h/2, f.w * 1.6);
            pop();
        }

        if (!f.clicked && f.alpha < 255) { if (millis() - f.revealTime > 2000) { f.alpha += 5; } }
        else if (f.clicked) { f.alpha = 0; }
        if (f.alpha > 0) { push(); tint(255, (s6Opacity * f.alpha) / 255); image(f.img, f.x, f.y, f.w, f.h); pop(); }
    }
    pop();
}

function drawSpread8() {
    s8Opacity = map(scrollPos, 32500, 33500, 0, 255, true);
    let s8ExitStart = 43000;
    let s9StartShift = map(scrollPos, s8ExitStart, s8ExitStart + 1500, 0, -width, true);
    let master8FadeOut = map(scrollPos, s8ExitStart, s8ExitStart + 1000, 255, 0, true);
    
    // BG Color Shift: Grey to Blue
    let bgB = map(scrollPos, 56000, 57000, 40, 65, true);
    push();
    fill(40, 40, bgB, s8Opacity);
    rect(0, 0, width, height);

    push();
    translate(s9StartShift, 0); 
    let p1Opacity = map(scrollPos, 34000, 35000, 0, 255, true);
    tint(255, (s8Opacity * p1Opacity * master8FadeOut) / (255 * 255));
    image(s8_p1, width*0.2, 0, width*0.68, height*0.35);
    let t1Opacity = map(scrollPos, 35500, 36500, 0, 255, true);
    fill(200, (s8Opacity * t1Opacity * master8FadeOut) / (255 * 255));
    textFont(gillFont); textSize(30); textAlign(LEFT);
    text("DON'T KNOW WHERE MY GRANDSON IS...\nDON'T KNOW WHERE I AM. \n\nDIMMAG CHAKRA RAHA\nHUMRA...", 60, 80);
    let t2Opacity = map(scrollPos, 37000, 38000, 0, 255, true);
    textAlign(LEFT);
    fill(200, (s8Opacity * t2Opacity * master8FadeOut) / (255 * 255));
    text("YE BANARAS\nBANARAS NHI RAHA.", width*0.8, height*0.22);
    let p2Opacity = map(scrollPos, 38500, 39500, 0, 255, true);
    tint(255, (s8Opacity * p2Opacity * master8FadeOut) / (255 * 255));
    image(s8_p2, 50, height*0.35, width*0.2, height*0.27);
    let p3Opacity = map(scrollPos, 40000, 41000, 0, 255, true);
    tint(255, (s8Opacity * p3Opacity * master8FadeOut) / (255 * 255));
    image(s8_p3, width*0.2 + 100, height*0.35, width * 0.68, height*0.27);
    pop();

    let p4Opacity = map(scrollPos, 41500, 42500, 0, 255, true);
    let finalP4Fade = map(scrollPos, 51000, 52000, 255, 0, true);
    tint(255, (s8Opacity * p4Opacity * finalP4Fade) / (255 * 255));
    image(s8_p4, 0, height*0.62, width, height*0.38);

    pop();
}

function drawSpread9() {
    s9Opacity = map(scrollPos, 43000, 44000, 0, 255, true);
    let s9ExitFade = map(scrollPos, 56000, 58000, 255, 0, true);
    push();
    tint(255, s9ExitFade);
    fill(255, (s9Opacity * s9ExitFade) / 255);
    textFont(poorRichardFont); textSize(40); textAlign(LEFT);
    text("Meanwhile, the diya...", 100, 100);
    
    let cruiseOpacity = map(scrollPos, 45500, 47000, 0, 255, true);
    let cruiseFadeOut = map(scrollPos, 51000, 52500, 255, 0, true);
    let cruiseX = map(scrollPos, 45500, 47000, 200, 0, true); 
    push();
    translate(cruiseX, 0);
    tint(255, (s9Opacity * cruiseOpacity * cruiseFadeOut * s9ExitFade) / (255 * 255 * 255));
    image(s9_pCruise, 0, 0, width, (height / 3) * 2);
    pop();

    let meanwhileOpacity = map(scrollPos, 44500, 46000, 0, 255, true);
    let meanwhileFadeOut = map(scrollPos, 49000, 50000, 255, 0, true);
    let meanwhileX = map(scrollPos, 43500, 44500, 250, 50, true);
    push();
    translate(meanwhileX, 0);
    tint(255, (s9Opacity * meanwhileOpacity * meanwhileFadeOut * s9ExitFade) / (255 * 255 * 255));
    image(s9_pMeanwhile, 0, 50, 400, 400); 
    pop();

    let hitOpacity = map(scrollPos, 49000, 50500, 0, 255, true);
    let hitX = map(scrollPos, 49000, 50500, 50, 50, true);
    push();
    translate(hitX, 0);
    tint(255, (s9Opacity * hitOpacity * s9ExitFade) / (255 * 255));
    image(s9_pHit, 0, 50, 540, 400);
    pop();

    let vanishOpacity = map(scrollPos, 52000, 53500, 0, 255, true);
    let vanishX = map(scrollPos, 52000, 53500, 250, 50, true);
    push();
    translate(vanishX, 0);
    tint(255, (s9Opacity * vanishOpacity * s9ExitFade) / (255 * 255));
    image(s9_pVanish, 0, height / 2 + 50, 540, height*0.35);
    pop();
    pop();
}

function drawEnding() {
    let endOpacity = map(scrollPos, 57000, 59500, 0, 255, true);
    endCoverX = map(scrollPos, 68000, 85000, 0, -width * 9, true);

    push();
    tint(255, endOpacity);
    image(endCoverImg, endCoverX, 0, width * 10, height);
    
    let titleOpacity = map(scrollPos, 60000, 62000, 0, 255, true);
    let titleFadeOut = map(scrollPos, 65000, 68000, 255, 0, true); 
    
    push();
    fill(247, 220, 146, (titleOpacity * titleFadeOut) / 255);
    textFont(poorRichardFont);
    textAlign(CENTER);
    textSize(100);
    text("Bujhta Banaras", width/2, height/2 + 200);
    textSize(20);
    text("Made by Akshat Agrawal", width*0.2, height*0.95);
    text("Guided by Mathura M Govindarajan", width*0.8, height*0.95);
    pop();

    if (scrollPos > 62000 && scrollPos < 75000) {
        let sidePromptAlpha = map(scrollPos, 62000, 64000, 0, 255, true);
        let sidePromptFade = map(scrollPos, 68000, 70000, 255, 0, true);
        let combinedAlpha = (sidePromptAlpha * sidePromptFade) / 255;
        drawScrollInstruction(width/2, height * 0.85, combinedAlpha);
        fill(247, 220, 146, combinedAlpha);
        textFont(gillFont);
        textSize(35);
        textAlign(CENTER);
        text("SCROLL TO EXPLORE THE OTHER SIDE OF THIS STORY", width/2, height * 0.75);
    }

    if (scrollPos > 84000) {
        let resetOpacity = map(scrollPos, 84000, 85000, 0, 255, true);
        fill(247, 220, 146, resetOpacity);
        textSize(45);
        textFont(poorRichardFont);
        textAlign(CENTER);
        text("Experience Bujhta Banaras again", width/2, height/2 +150);
        drawClickInstruction(width/2, height - 180, resetOpacity);
    }
    pop();
}

function mousePressed() {
    if (scrollPos > 84500) {
        scrollPos = 0; pastSeen = false; gatewayPassed = false; anyFlapClicked = false; s6FullyPulled = false;
        for (let f of flapsS6) { f.alpha = 255; f.clicked = false; }
        return;
    }
    if (scrollPos > 14800 && scrollPos < 18000) { isDragging = true; startY = mouseY - pullDist; }
    else if (scrollPos > 18000 && scrollPos <= 23000) { isDraggingGateway = true; startY = mouseY - gatewayPullDist; }
    else if (scrollPos > 23000 && scrollPos < 26000) {
        if (mouseX < width / 3) { isDraggingL = true; startXL = mouseX - flapL_X; }
        else if (mouseY < height * 0.6 && mouseX > width / 3 && mouseX < width - width / 3) { isDraggingT = true; startYT = mouseY - flapT_Y; }
        else if (mouseX >= width - width / 3) { isDraggingR = true; startXR = mouseX - flapR_X; }
    } else if (scrollPos >= 26000 && scrollPos <= 32000) {
        let s6SlideX = map(scrollPos, 26000, 32000, width, -width, true);
        let clickedAFlap = false;
        for (let f of flapsS6) {
            if (mouseX > f.x + s6SlideX && mouseX < f.x + s6SlideX + f.w &&
                mouseY > f.y + s6PullUpDist && mouseY < f.y + s6PullUpDist + f.h && f.alpha > 0) {
                f.clicked = true; anyFlapClicked = true; clickedAFlap = true;
            }
        }
        if (!clickedAFlap && anyFlapClicked) { isDraggingS6 = true; startY = mouseY - s6PullUpDist; }
    }
}

function mouseWheel(event) {
    let nextScroll = scrollPos + event.delta;
    if (nextScroll > 17000 && !pastSeen) { scrollPos = 17000; }
    else if (nextScroll > 23000 && !gatewayPassed) { scrollPos = 23000; }
    else if (nextScroll > 32000 && !s6FullyPulled) { scrollPos = 32000; }
    else { scrollPos = nextScroll; }
    scrollPos = max(0, scrollPos);
}

function mouseDragged() {
    if (isDragging) { pullDist = constrain(mouseY - startY, 0, height); if (pullDist > height * 0.4) { pastSeen = true; } }
    else if (isDraggingGateway) { 
        gatewayPullDist = constrain(mouseY - startY, -height, 0); 
        if (gatewayPullDist < -20) { gatewayPassed = true; } 
    }
    else if (isDraggingL) { flapL_X = constrain(mouseX - startXL, -width / 2, 0); }
    else if (isDraggingT) { flapT_Y = constrain(mouseY - startYT, -height, 0); }
    else if (isDraggingR) { flapR_X = constrain(mouseX - startXR, 0, width / 2); }
    else if (isDraggingS6) { s6PullUpDist = constrain(mouseY - startY, -height, 0); if (s6PullUpDist < -height * 0.9) { s6FullyPulled = true; } }
}

function mouseReleased() {
    isDragging = false; isDraggingGateway = false; isDraggingS6 = false;
    pullDist = 0; isDraggingL = false; flapL_X = 0; isDraggingT = false; flapT_Y = 0; isDraggingR = false; flapR_X = 0;
    for (let f of flapsS6) { if (f.clicked) { f.clicked = false; f.revealTime = millis(); } }
}
/*
now last few updates
basically after ghost vanish panel fades away
then only cruise should fade away and bg turns bluer

and for spread 6, the click interaction icons should be only one icon at a time appearing at the next clickable flap, that is if flap 1 is not clicked it shows icon on flap 1, if it is clicked it shows on flap 2 and so on

and same for the glow, glow only on the next clickable flap to show hierarchy and order, so all flaps dont show glow together, 

and then final wide image of end cover, that scroll should only happen after the title Bujhta banaras and name Guided by is revealed, and then one more text appears - explore the city for the one last time, and then we click that text to continue scroll for the 10*width image and that prompt fades away after first scroll and title and name fade away as well, and after finishing the scroll of 10* width image, we reach the last part and it should say experience again click to experience again hierarchy and order is maintained through instruction function 

make sure that hierarchy and order of instruction icon appearing and glow appearing is strictly maintained 

so click icon only at flap 1, then flap 2, then flap 3...
and then drag up icon once all clicked 
same for glow 


and for spread 8 and 9, use the hierarchy and order to show scroll icon and grab icon, properly timed to appear after one thing is done and other thing is to be done properly 

the scroll icon to be visible initially 
then when reach spread 3, grab icon appears and stays till pastSeen true
then scroll to spread 4, grab icon appears and stays till gatewayPassed true
then scroll to spread 5, three grab icon appears and fade one by one as they move
then scroll to spread 6, scroll all the way to right side
then click icon appears on first flap, and then second and so on
and then once all clicked, drag icon for spread 6 comes on the bottom
and then scroll through spread 8 and 9
and then ending hierarchy 


keep every asset same and text same and coords same*/