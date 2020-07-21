// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize , ellipseMode, rectMode, CENTER, CORNER
textSize, textStyle, push, pop, BOLD, noFill, textFont, textAlign, createSelect*/

// Declaring all variables here
let outriders, blackOrder, avengers, infinityStones;
let backgroundColor;
let width, height, outridersWidth, outridersHeight, blackOrderHeight, blackOrderWidth;
let score, lives, gameIsOver, gameIsWon; 
let heroX, heroY, heroD;
let hit1, hit2, hit3, hit4, hit5, hit6, hit7, hit8;
let outridersImg, blackOrderImg, backgroundImg;
let hero;
let stoneX, stoneY, stoneD;

function preload () {
  outridersImg = loadImage ('https://cdn.glitch.com/012c5f4c-7f55-47cb-adba-9475461ff034%2Fchitauri.jpg?v=1595015192603');
  blackOrderImg = loadImage ('https://cdn.glitch.com/012c5f4c-7f55-47cb-adba-9475461ff034%2FThanos_(Endgame).png?v=1595015227564')
}

function setup() {
  // Canvas & color settings
  width = 700;
  height = 500;
  createCanvas(width, height);

  createCanvas (width+300, height)
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
 
  ellipseMode (CENTER)
  rectMode (CORNER)
  score = 0; 
  lives = 5;
  gameIsOver = false;
  gameIsWon = false;
  
  // Values for the user's circle token
  heroX = random (120, width); 
  heroY = height - 30; 
  heroD = 30;

  // Each item in the array has an argument for its y-position
  outriders = [
    new Outrider (50), 
    new Outrider (150),
    new Outrider (250),
    new Outrider(350), 
  ]
  outriders.push ();
  
  
  blackOrder = [
    new BlackOrder (100),
    new BlackOrder (200),
    new BlackOrder (300), 
    new BlackOrder (400)
  ]
    blackOrder.push ();
  
  // Each item in the array has an argument for its x-position
  infinityStones = [
    new Stone (100),
    new Stone (200), 
    new Stone (300), 
    new Stone (400), 
    new Stone (500),
    new Stone (600)
  ]
  infinityStones.push ();
  
  textFont ('Georgia')
  push ();
  textAlign (CENTER)
  
  // for the drop-down that allows user's to pick an Avenger
  hero = createSelect ();
  hero.position (10, 480)
  hero.option ('Captain America');
  hero.option ('Iron Man');
  hero.option ('The Hulk')
  hero.option ('Black Widow')
  hero.changed(chooseHero);
  pop ();
}

function draw() {
  background(backgroundColor);

  fill (56, 75, 80)
  rect (0, 0, width, 40);
  rect (0, height-40, width, 40)
  
  
  chooseHero ();
  // Outrider images move 
  for (let i=0; i < outriders.length; i++) {
    if (!gameIsOver && !gameIsWon) {
      outriders[i].move ();
    }
    outriders[i].show ();
    outriders[i].collide ();
  }
  
  //Black Order Images move
  for (let i=0; i < blackOrder.length; i++) {
    if (!gameIsOver && !gameIsWon) {
      blackOrder[i].move ();
    }
    blackOrder[i].show ();
    blackOrder[i].collide ();
  }

// different methods so that each stone has an individual color. The name corresponds to the stone name. showSpace is for the Space stone

  for (let i=0; i < infinityStones.length; i++) {
    infinityStones[0].showSpace (); 
    infinityStones[1].showMind ();
    infinityStones[2].showReality ();
    infinityStones[3].showPower ();
    infinityStones[4].showTime ();
    infinityStones[5].showSoul();
    infinityStones[i].collide ();    
  }
  
  
  checkWin ();
  displayScores ();
  instructions ()
}
// User can move if the game isn't won or over
function keyPressed () {
  if (!gameIsOver && !gameIsWon) {
    if (keyCode === UP_ARROW) {
      heroY -= 10; 
    }
   else if (keyCode === DOWN_ARROW) {
      heroY += 10;
    }
    else if (keyCode === LEFT_ARROW) {
      heroX -= 10;
    }
    else if (keyCode === RIGHT_ARROW) {
      heroX += 10; 
    }    
  }
}

// checks to see if the game is over or won
function checkWin () {
  if (lives == 0){
    gameIsOver = true;
  }
   if (lives != 0) {
    gameIsOver = false;
  }
   if (score == 300)
    gameIsWon = true;
}

// displays the score and endgame messages
function displayScores () {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 15);
  // Display Score
  // Back ticks allow you to display a variable's value
  text (`Score: ${score}`, 10, 30)

  // Display game over message if the game is over
   if (gameIsOver) {
    push ();
    textSize (32);
    textStyle (BOLD);
    text ('Game Over', 300, height/2)
    textSize (14)
    pop ();
  }
  if (gameIsWon){
    push ();
    textSize (32);
    textStyle (BOLD);
    text ('You saved the world from Thanos!', 100, height/2)
    textSize (14);
    pop ();
  }
}
// allows user's to pick an Avenger
function chooseHero () {
  let item = hero.value ();
  strokeWeight (0);
  if (item == 'Captain America') {
    fill (352, 88.24, 66.67);
    ellipse (heroX, heroY, heroD);
    fill (0, 0, 100);
    ellipse (heroX, heroY, heroD-5)
    fill (240, 100, 25.88)
    ellipse (heroX, heroY, heroD-15)
  }
  if (item == 'The Hulk') {
    strokeWeight (1);
    fill (79.4, 64.88, 80.39)
    ellipse (heroX, heroY, heroD);
    fill (288.53, 45.95, 58.04);
    ellipse (heroX, heroY, heroD-15)
  }
  if (item == 'Black Widow') {
    fill (0.65, 75.41, 47.84);
    ellipse (heroX, heroY, heroD);
    fill (21.74, 27.94, 96.86);
    ellipse (heroX, heroY, heroD-5);
    fill (9.23, 13, 39.22);
    ellipse (heroX, heroY, heroD-15)
    fill (0);
    ellipse (heroX, heroY, heroD-25);
  }
  
  if (item == 'Iron Man'){
    fill (0, 97.06, 66.67)
    ellipse (heroX, heroY, heroD);
    fill (0.63, 89.62, 41.57);
    ellipse (heroX, heroY, heroD-5);
    fill (38.7, 91.35, 72.55);
    ellipse (heroX, heroY, heroD-15)
  }
}
// The instructions on the right side of the screen. 
// Includes how to play and win.
function instructions () {
  textSize (32);
  text ('Instructions', width+60, 50);
  textSize (20);
  text ('Select a Character', width+40, 150)
  textSize (15)
  text ('Use the dropdown to pick an Avenger', width+40, 180)
  textSize (20)
  text ('How to Play', width+40, 240);
  textSize (15);
  text ('Use arrow keys to move around.', width+40, 270)
  text ('Getting hit by Thanos or his army', width+40, 300)
  text ('will result in a loss of life.', width+40, 330)
  textSize (20);
  text ('How to Win', width+40, 380);
  textSize (15)
  text ('Collect each infinity stone', width+40, 410)
  text ('just once before losing all lives.', width+40, 440)
}


class Outrider  {
  constructor (y) {
    this.x = 0; 
    this.y = y;
    this.width = 60;
    this.height = 40;
    this.masterXVelocity = random (0,3);
    this.xVelocity = this.masterXVelocity
  }
  // allows items to move horizontally on the screen
  move () {
    this.x += this.xVelocity;
    if (this.x + this.width > width) {
      this.xVelocity =  -1 * this.masterXVelocity;
    }
    if (this.x < 0) {
      this.xVelocity = this.masterXVelocity;
    }
  }
  // a rectangle without a backgroundcolour is placed on top of the image so collision detecton can occur
  show () {
    image (outridersImg, this.x, this.y, this.width, this.height)
    strokeWeight (2);
    noFill ();
    rect (this.x, this.y, this.width, this.height)
  }
  // if the user collides with the rectangle, a life is lost and they are moved to the  bottom of the screen
  collide () {
     hit1 = collideRectCircle(this.x, this.y, this.width, this.height, heroX, heroY, heroD);
        if (hit1) {
          if (lives == 0) {
            gameIsOver = true;
        } else {
          lives = lives - 1;
          heroY = height - 20;
        }
      }  
    }
  }

class BlackOrder  {
  constructor (y){
    
    this.y = y;
    this.width = 40; 
    this.x = width - this.width;
    this.height = 40;
    this.masterXVelocity = random (-3, 0);
    this.xVelocity = this.masterXVelocity;
  }
   // allows items to move horizontally on the screen
  move () {
    this.x += this.xVelocity;
     if (this.x + this.width > width){
        this.xVelocity = this.masterXVelocity;
     }
    if (this.x - this.width < 0) {
      this.xVelocity = -1 *this.masterXVelocity;
    }
  }
    // a rectangle without a backgroundcolour is placed on top of the image so collision detecton can occur
  show () {
    image (blackOrderImg, this.x- this.width, this.y, this.width, this.height)
    strokeWeight (2);
    noFill ();
    rect (this.x-this.width, this.y, this.width, this.height)
  }
   // if the user collides with the rectangle, a life is lost and they are moved to the  bottom of the screen
  collide () {
        hit2 = collideRectCircle(this.x-this.width, this.y, this.width, this.height, heroX, heroY, heroD);
        if (hit2) {
          if (lives == 0) {
            gameIsOver = true;
        } else {
          lives = lives - 1;
          heroY = height - 20;
        }
      }  
    }
  }
class Stone {
  constructor (x) {
    this.x = x;
    this.y = 20;
    this.diameter = 30;
  } 
  // if the user and infinity stone collide, the user get's points
  collide () {
  hit3 = collideCircleCircle (this.x, this.y, this.diameter, heroX, heroY, heroD);
  if (hit3){
    score = score+50;
    heroY = height-30;
    }
  }
  show (){
    fill (0, 0, 0) 
    ellipse (this.x, this.y, this.diameter)
  }
  // a method for each specifc colour of the infinity stone
  showSpace () {
    fill  (219.23, 84.55, 96.47);
    ellipse (this.x, this.y, this.diameter) 
  }
  showMind () {
    fill (49.65, 100, 100);
    ellipse (this.x, this.y, this.diameter)
  }
  showReality () {
    fill (348.9, 99.61, 100);
    ellipse (this.x, this.y, this.diameter)
  }
  showPower () {
    fill (295.82, 83.06, 94.9)
    ellipse (this.x, this.y, this.diameter)
  }
  showTime () {
    fill  (147.04, 92.21, 90.59)
    ellipse (this.x, this.y, this.diameter)
  }
  showSoul () {
    fill (32.71, 100, 100)
    ellipse (this.x, this.y, this.diameter)
  }
}