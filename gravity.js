var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const FPS = 60;
const MS = Math.floor(1000 / FPS);
const START = Date.now();
canvas.focus();


class Ball {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "teal";
        this.verticalSpeed = 0;
        this.horizontalSpeed = 0;
        this.creationDate = Date.now();
        this.elapsedTime = 0;
        this.gravity = 1;
        this.drawBall();
        this.contactResistance = 0;
        this.lastDrawTime = Date.now();
    }

    addGravity(gravity) {
        this.gravity = gravity;
    }

    moveBall(x, y) {
        this.x = x;
        this.y = y;
    }

    gravityEffect() {
        this.verticalSpeed += this.gravity;
        this.verticalSpeed -= this.contactResistance;

    }

    moveBallTime() {
        this.gravityEffect();
        this.elapsedTime = (Date.now() - this.lastDrawTime) / 30;
        this.x += this.horizontalSpeed * this.elapsedTime;
        this.y += Math.floor(this.verticalSpeed * this.elapsedTime);
        this.drawBall();
    }

    drawBall() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        this.lastDrawTime = Date.now();
    }

}

class Arrow {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        // this.width;
        // this.height;
    }

    drawArrow() {
        ctx.save();
        ctx.beginPath();
        let p = new Path2D("m 0 -5 l 50 0 v 10 h -50 v -10 z m 50 0 v -5 l 10 10 l -10 10 l 0 -5 z");
        ctx.translate(this.x, this.y);
        ctx.scale(2, 2);
        ctx.fillStyle = "gray";
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fill(p);
        ctx.restore();
    }

    rotate(angle) {
        // if (angle > )
        this.angle = -angle;
    }

}

class Map {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.ball;
    }

    setBall(ball) {
        this.ball = ball;
    }

    drawMap() {
        this.drawBall();
    }

    drawBall() {
        this.ball.drawBall();
    }

    moveBall(x, y) {
        // console.log(this.width);
        // console.log(this.height);
        if (/*(x + this.ball.radius) <= this.width && */ (y + this.ball.radius) <= this.height) {
            console.log(x + " " + y);
            this.ball.moveBall(x, y);
        }
    }
}

class Gravity {

    constructor(g) {
        this.g = g;
        this.object;
    }

    applyGravity() { }

}

var map = new Map(WIDTH, HEIGHT);
var ball = new Ball(150, 150, 60);
map.setBall(ball);
map.drawBall();
let x = 150;
let y = 150;
ball.verticalSpeed = 0;
ball.horizontalSpeed = 0;
ball.gravity = 0;
let gen = 0;
let g = 1;
// animate();

// ctx.beginPath();
// let p = new Path2D('M10 10 h 80 v 80 h -80 Z');
// let p = new Path2D("M 0 0 L 10 5 L 0 10 z");
// let p = new Path2D("M -50,50 Q -50,-50 50,20");
// let p = new Path2D("M 50,-50 Q 80,0 40,80");
// let p = new Path2D("M 50,-50 Q 80,0 40,80");
// let p = new Path2D("m 0 -5 l 50 0 v 10 h -50 v -10 z m 50 0 v -5 l 10 10 l -10 10 l 0 -5 z");
// ctx.save();
// ctx.translate(300, 300);
// ctx.scale(5, 5);
// // ctx.rotate(180 * Math.PI / 180);
// ctx.fill(p);
// // ctx.stroke(p);
// ctx.restore();

let arrow = new Arrow(30, HEIGHT-30);
arrow.rotate(60);
arrow.drawArrow();

async function animate() {
    while (gen < 200) {
        ball.contact = false;
        await sleep(MS);
        clearCanvas();
        // y += verticalSpeed;
        // verticalSpeed += g;
        // x += 20;
        // if (x > WIDTH) {
        //     x = WIDTH;
        // }
        // console.log(ball);
        if (ball.y + ball.radius >= HEIGHT) {
            // ball.contact = true;
            ball.y = HEIGHT - ball.radius;
            // console.log("contact");
            console.log(ball.verticalSpeed);
            if (Math.abs(ball.verticalSpeed) <= 3) {
                ball.verticalSpeed = 0;
            } else {
                ball.verticalSpeed = (-ball.verticalSpeed) / 2;
            }
            ball.contactResistance = ball.gravity;
        } else {
            ball.contactResistance = 0;
        }
        map.ball.moveBallTime();
        // map.moveBall(x, y);
        // map.drawBall();
        gen++;
    }
}


function bounce() {

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: Math.floor((evt.clientX - rect.left) * scaleX),   // scale mouse coordinates after they have
        y: Math.floor((evt.clientY - rect.top) * scaleY)     // been adjusted to be relative to element
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.stroke();
}