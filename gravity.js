var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const FPS = 60;
const MS = Math.floor(1000 / FPS);
canvas.focus();


class Ball {
    
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "teal";
        this.drawBall();
    }

    moveBall(x, y) {
        this.x = x;
        this.y = y;
    }
    
    drawBall() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
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

    applyGravity() {}

}

var map = new Map(WIDTH, HEIGHT);
var ball = new Ball(150, 150, 60);
map.setBall(ball);
map.drawBall();
let x = 150;
let y = 150;
let verticalSpeed = 10;
let gen = 0;
let g = 1;
animate();

async function animate() {
    while (gen < 100) {
        await sleep(MS);
        clearCanvas();
        y += verticalSpeed;
        verticalSpeed += g;
        // x += 20;
        if (x > WIDTH) {
            x = WIDTH;
        }
        console.log(y);
        if (y + ball.radius > HEIGHT) {
            y = HEIGHT - ball.radius;
            console.log("contact");
            verticalSpeed = (-verticalSpeed) / 2;
            console.log(verticalSpeed);
        }
        map.moveBall(x, y);
        map.drawBall();
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