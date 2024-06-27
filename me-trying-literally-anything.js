let characterImg;
let bgImage;
let bgMusic, fallSound;
let buttonSize = 100;
let buttonClicks = 0;
let isFalling = false;
let animationStarted = false;
let bgY = 0;
let fallingY = 0;
let angle = 0;
let buttonColor = 255;

function preload() {
    characterImg = loadImage('./stuff/go-getter.png');
    bgImage = loadImage('./stuff/stairs.png');
    bgMusic = loadSound('./stuff/bgMusic.mp3');
    fallSound = loadSound('./stuff/the-fall.mp3');
}

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('canvasContainer');

    // Resize background image to match canvas size
    bgImage.resize(width, height + 1000);

    bgMusic.loop();

    document.getElementById('startButton').addEventListener('click', startAnimation);
}

function startAnimation() {
    bgMusic.loop();
    animationStarted = true;
    document.getElementById('startButton').style.display = 'none';
}
function draw() {
    if (!animationStarted) {
        return;
    }

    background(220);

    // Calculate the position for background images to create vertical movement
    bgY += 1; // Speed of vertical movement

    // Wrap around the background image
    if (bgY >= height - 600) {
        bgY = -height;
    }

    // Display background images to create the infinite scrolling effect
    image(bgImage, 0, bgY);

    // Display character
    if (!isFalling) {
        image(characterImg, width / 2 - characterImg.width / 2, height / 2 - characterImg.height / 2);
    } else {
        // Move character down when falling
        fallingY += 1; // Adjust this value to control the speed of falling

        // Display falling character
        push();
        // translate(width / 2, height / 2);
        translate(width / 2, fallingY);
        rotate(angle);
        image(characterImg, -characterImg.width / 20, -characterImg.height / 20, characterImg.width / 10, characterImg.height / 10);
        pop();

        angle += 0.1;
    }

    // Display button inside canvas and adjust size
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(buttonColor);
    stroke(0);
    strokeWeight(2);
    rect(width / 2 - buttonSize / 2, height - 60, buttonSize, 40);
    fill(0);
    noStroke();
    text('Keep going', width / 2, height - 40);

    if (isFalling) {
        // Clear previous screen by drawing background again
        background(220);

        // Character falls off the canvas
        push();
        // translate(width / 2, height / 2);
        translate(width / 2, fallingY);
        rotate(angle);
        image(characterImg, -characterImg.width / 20, -characterImg.height / 20, characterImg.width / 10, characterImg.height / 10);
        pop();

        angle += 0.1;
    }
}

function mouseClicked() {
    // Check if mouse is over the button
    if (mouseX >= width / 2 - buttonSize / 2 && mouseX <= width / 2 + buttonSize / 2 &&
        mouseY >= height - 60 && mouseY <= height - 20) {
        buttonClicks++;
        buttonSize += 30;

        // Blinking effect
        buttonColor = 255; // Reset to original color
        let blinkInterval = setInterval(function () {
            buttonColor = (buttonColor === 255) ? 'red' : 255; // Toggle between original color and red
        }, 50); // Blinking interval (50ms)

        setTimeout(function () {
            clearInterval(blinkInterval); // Stop blinking after 3 seconds
            buttonColor = 255; // Ensure button color is back to normal
        }, 3000);

        if (buttonClicks >= 3) {
            bgMusic.stop();
            fallSound.play();
            isFalling = true;
            fallSound.onended(resetScene);
        }
    }
}

function resetScene() {
    buttonClicks = 0;
    isFalling = false;
    buttonSize = 100;
    bgMusic.loop();
}