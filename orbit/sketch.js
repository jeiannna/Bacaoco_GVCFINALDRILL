// ---------- Variables that change over time ----------
let angle = 0;            // current angle of the planet, in radians
let angularSpeed = 0.001;  // radians added to the angle every frame
let isPaused = false;     // true when SPACE has paused the animation

// ---------- Fixed settings ----------
let centerX = 300;        // x of the orbit center
let centerY = 300;        // y of the orbit center
let orbitRadius = 120;    // distance from center to planet (pixels)
let baseDiameter = 30;    // planet size when sin(2 * angle) = 0
let pulseAmount = 15;     // how much the diameter grows/shrinks

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent(document.querySelector('main'));
}

function draw() {
  background(20, 24, 40);

  // Update the angle once per frame (skipped while paused)
  if (!isPaused) {
    angle = angle + angularSpeed;
  }

  // ----- MATH: circular motion with trigonometry -----
  // cos gives the horizontal part of the circle, sin gives the vertical part.
  // Multiply by the radius, then shift by the center.
  let planetX = centerX + orbitRadius * cos(angle);
  let planetY = centerY + orbitRadius * sin(angle);

  // ----- MATH: size pulses with a sine wave -----
  // sin() swings between -1 and 1, so the diameter ranges from
  // (baseDiameter - pulseAmount) to (baseDiameter + pulseAmount).
  // 2 * angle makes it pulse twice per orbit.
  let planetDiameter = baseDiameter + pulseAmount * sin(2 * angle);

  // Orbit path (a guide so the circle is visible)
  noFill();
  stroke(80, 90, 130);
  ellipse(centerX, centerY, orbitRadius * 2);

  // Center "sun"
  noStroke();
  fill(255, 200, 60);
  ellipse(centerX, centerY, 40);

  // Line from the sun to the planet (this is the radius)
  stroke(150);
  line(centerX, centerY, planetX, planetY);

  // Planet
  noStroke();
  fill(80, 170, 255);
  ellipse(planetX, planetY, planetDiameter);

  drawInfo(planetX, planetY, planetDiameter);
}

// Shows the live numbers (useful for the hand calculation) and the controls
function drawInfo(px, py, d) {
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);

  let angleDegrees = (degrees(angle) % 360 + 360) % 360;
  text("angle = " + nf(angleDegrees, 1, 2) + " deg", 10, 10);
  text("x = " + nf(px, 1, 1) + "   y = " + nf(py, 1, 1), 10, 32);
  text("diameter = " + nf(d, 1, 1), 10, 54);
  text("speed = " + nf(angularSpeed, 1, 3) + " rad/frame", 10, 76);

  text("CONTROLS:", 10, 480);
  text("UP / DOWN arrows: change speed", 10, 502);
  text("SPACE: pause / resume", 10, 524);
  text("Mouse click: reverse direction", 10, 546);
  text("R: reset angle", 10, 568);
}

// ---------- Controls ----------
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


function mousePressed() {
  angularSpeed = -angularSpeed; // negative speed = opposite direction
}
