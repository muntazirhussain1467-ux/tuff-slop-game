let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60*1.5;

let bgImg;
let bird;
let pump;
async function setup() {
  createCanvas(480, 360);
  spawnGhost();

  try { // load bacground img
    bgImg = await loadImage('bacground.png');
    bird = await loadImage('bruh.png');
  } catch (error) {
    console.error('Error loading image:', error);
  }
}

function draw() {
  background(15, 10, 25);
  image(bgImg, 0, 0);
  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}
function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230);
  // ellipse(x, y, 60, 60);
  image(bird, x-30,y-45,)
  fill(20);
}