let ball, paddle, lives, score; //let general groups of variables
let rows = 5;
let cols = 10;
let brickWidth;
let brickHeight = 20;
let bricks = [];
let colors = ['#FCF340', '#7FFF00', '#FB33D8', '#0310EA', '#38E7FC'];
let gameOver = ["You Lose", "L", "You suck", "Better luck next time", "BOOOOO"];
let gameWin = ["YAY", "Congrats", "Pog", "Nice one", "Ok"];

function setup(){
    createCanvas(800, 600);
    //all variables for ball
    //write as ball._
    ball = {
        x: width/2,
        y: height/2,
        d: 20,
        xv: 5,
        yv: 5,
        c: 'white'
    };
    //all variables for paddle
    //write as paddle._
    paddle = {
        x: width/2 - 30,
        y: height - 20,
        w: 60,
        h: 10,
        xv: 10,
        c: 'white'
    };
    brickWidth = (width - cols) / cols - 4;
    lives = 3;
    score = 0;
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            let brickColor = parseInt(random(5));
            brick = {
                x: j * (brickWidth + 5) + 2,
                y: i * (brickHeight +5) + 2,
                c: colors[brickColor]
            };
            bricks.push(brick);
        }
    }
}

function draw(){
    background('black'); //background color
    //all functions listed below will work
    //appearance
    displayBall();
    displayPaddle();
    displayBricks();
    displayScore();
    //movement
    paddleMove();
    updateBall();
    //collision
    checkEdges();
    paddleCollide();
    hitBrick();
    //lives
    countLives();
    displayLives();
    checkWin();
}
//we see the ball, paddle, bricks, and score
function displayBall(){
    fill(ball.c);
    circle(ball.x, ball.y, ball.d);
}
function displayPaddle(){
    fill(paddle.c);
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
}
function displayBricks(){
    for (let brick of bricks){
        fill(brick.c);
        rect(brick.x, brick.y, brickWidth, brickHeight);
    }
}
//show the score
function displayScore(){
    textSize(36);
    fill('white');
    textAlign(CENTER);
    text(score, width/2, height/2);
}
//paddle movement
function paddleMove(){
    if(keyIsDown(LEFT_ARROW)){
        paddle.x -= 10;
    }
    if(keyIsDown(RIGHT_ARROW)){
        paddle.x += 10;
    }
    //max paddle movement
    paddle.x = constrain(paddle.x, 0, width - paddle.w);
}

function updateBall(){ //ball's movement across the screen
    ball.x += ball.xv;
    ball.y += ball.yv;
}

function checkEdges(){
    if(ball.x <= 0 || ball.x >= width){ //when ball touches walls
        ball.xv = -ball.xv; //ball x velocity changes direction
    }
    if(ball.y <= 0){ //when ball touches ceiling
        ball.yv = -ball.yv; //ball y velocity changes direction
    }
}

function paddleCollide(){//when ball touches paddle
    if (
    ball.y + ball.d/2 >= paddle.y && //ball's y-coordinate is above paddle
    ball.x >= paddle.x && //ball is on the paddle
    ball.x <= paddle.x + paddle.w){
        ball.yv = -ball.yv; //switch y-velocity
        ball.y = paddle.y - ball.d/2;
    }
}

function hitBrick(){ //when ball touches bricks
    for(let i = bricks.length - 1; i >= 0; i--){
        if(ball.x > bricks[i].x &&
        ball.x < bricks[i].x + brickWidth &&
        ball.y - ball.d/2 < bricks[i].y + brickHeight){
            bricks.splice(i,1);
            ball.yv = -ball.yv;
            score++;
            return;
        }
    }
}

function countLives(){ //ammount of lives based on
    if (ball.y >= height + ball.d){
        lives--;
        ball.y = height/2;
        ball.x = width/2;
        noLoop();
    }
}

function displayLives(){ //lives displayed
    textSize(12);
    fill('white');
    textAlign(LEFT);
    text("Lives Remainging: " + lives, 10, height - 30);
}

function checkWin(){
    if (score == rows * cols){
        textSize(36);
        fill('white');
        textAlign(CENTER);
        let winMessage = parseInt(random(5));
        gameWin = text(gameWin[winMessage], width/2, height/2 + 50);
    }
    else if(lives == 0){
        textSize(36);
        fill('white');
        textAlign(CENTER);
        let loseMessage = parseInt(random(5));
        gameOver = text(gameOver[loseMessage], width/2, height/2 + 50);
    }
    else {
        return;
    }
}

function mousePressed(){ //restart game
    loop();
}