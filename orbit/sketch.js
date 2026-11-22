
 // Variables that change over time 
let angle = 0;
let angularSpeed = 0.001;
let isPaused = false;

//Fixed settings
let centerX = 300;
let centerY = 300;
let orbitRadius = 120;
let baseDiameter = 30;
let pulseAmount = 15;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent(document.querySelector('main'));
}

function draw() {
  background(20, 24, 40);

  // Update the angle once per frame
  if (!isPaused) {
    angle = angle + angularSpeed;
  }

  // Calculate the planet's X and Y positions
  let planetX = centerX + orbitRadius * cos(angle);
  let planetY = centerY + orbitRadius * sin(angle);

  // Calculate the changing planet diameter
  let planetDiameter = baseDiameter + pulseAmount * sin(2 * angle);

  // Draw the orbit path
  noFill();
  stroke(80, 90, 130);
  ellipse(centerX, centerY, orbitRadius * 2);

  // Draw the sun
  noStroke();
  fill(255, 200, 60);
  ellipse(centerX, centerY, 40);

  // Draw the line from the sun to the planet
  stroke(150);
  line(centerX, centerY, planetX, planetY);

  // Draw the planet
  noStroke();
  fill(80, 170, 255);
  ellipse(planetX, planetY, planetDiameter);

  // Display mathematical values
  drawInfo(planetX, planetY, planetDiameter);
}

// Display information 
function drawInfo(px, py, d) {
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);

  // Convert radians to degrees
  let angleDegrees = (degrees(angle) % 360 + 360) % 360;

  text("angle = " + nf(angleDegrees, 1, 2) + " deg", 10, 10);
  text("x = " + nf(px, 1, 1) + "   y = " + nf(py, 1, 1), 10, 32);
  text("diameter = " + nf(d, 1, 1), 10, 54);
  text("speed = " + nf(angularSpeed, 1, 4) + " rad/frame", 10, 76);

  // Display controls
  text("CONTROLS:", 10, 480);
  text("UP / DOWN arrows: change speed", 10, 502);
  text("SPACE: pause / resume", 10, 524);
  text("Mouse click: reverse direction", 10, 546);
  text("R: reset angle", 10, 568);
}

//Keyboard controls
function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;

  } else if (keyCode === UP_ARROW) {
    angularSpeed = angularSpeed + 0.0002;

  } else if (keyCode === DOWN_ARROW) {
    angularSpeed = angularSpeed - 0.0002;

  } else if (key === 'r' || key === 'R') {
    angle = 0;
  }

  return false;
}

// Mouse control
function mousePressed() {
  angularSpeed = -angularSpeed;
}
