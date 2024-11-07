let mic, fft;
let numPills = 60;
let img1, img2;
let soundThreshold = 0.01;

function preload() {
  img1 = loadImage('assets/I.S.A.A.C.graphic_08.png'); // Adjust path as needed
  img2 = loadImage('assets/I.S.A.A.C.graphic_11.png'); // Adjust path as needed
}

function setup() {
  createCanvas(300, 300);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  rectMode(CENTER);
}

  
function drawRadialGradient(x, y, width, height, color1, color2) {
  for (let r = width; r > 0; r -= 1) {
    let inter = map(r, 0, width, 0, 1); // Smooth transition from color1 to color2
    let c = lerpColor(color1, color2, inter); // Interpolates between color1 and color2
    fill(c);
    noStroke();
    ellipse(x, y, r, r * (height / width)); // Stretch to pill's height
  }
}


function draw() {
    clear(); // Makes the background transparent
    let spectrum = fft.analyze();
    let level = mic.getLevel();
    
    // Image size (adjust if you want a different fit)
    let imgSize = 80; 
  
    // Display either img1 or img2 based on sound level, centered in the ring
    if (level > soundThreshold) {
      image(img2, width / 2 - imgSize / 2, height / 2 - imgSize / 2, imgSize, imgSize);
    } else {
      image(img1, width / 2 - imgSize / 2, height / 2 - imgSize / 2, imgSize, imgSize);
    }
  
    // Circular spectrum code
    translate(width / 2, height / 2); // Centering the ring
    for (let i = 0; i < numPills; i++) {
      let angle = map(i, 0, numPills, 0, TWO_PI);
      let amplitude = spectrum[i * 2];
      let r = 125;
      let pillWidth = map(amplitude, 0, 255, 5, 40);
      let pillHeight = 6;
      let x = r * cos(angle);
      let y = r * sin(angle);
      
      push();
      translate(x, y);
      rotate(angle);
      // Define colors for the gradient
    let color1 = color(255, 255, 255); // Starting color (e.g., red)
    let color2 = color(61, 151, 170); // Ending color (e.g., yellow)

    // Draw gradient pill
    drawRadialGradient(0, 0, pillWidth, pillHeight, color1, color2);
    pop();
    }
  }
