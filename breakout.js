var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;
var running = false;

class Rectangle {

    constructor(x, y, width, height, color = this.randomColor()) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.edge();
    }

    randomColor() {
        let colorList = ["blue", "red", "yellow", "green", "orange", "purple", "pink", "silver"];
        let randomColor = colorList[Math.floor(Math.random() * colorList.length)];
        return randomColor;
    }

    edge() {
        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
    }

    isColliding(rectangle) {
        if (this.bottom > rectangle.top || this.top < rectangle.bottom || this.left > rectangle.right || this.right < rectangle.left) {
            return false;
        }
        return true;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}

class Brick extends Rectangle {
}

class Racket {
}

class Canvas {

    constructor() {
        this.brickList = [];
    }

    generateBricks(numberOfBricks) {
        for (let i = 0; i < numberOfBricks; i++) {
            this.brickList.push(new Brick(100 * (i % 10) + 250, 100 + 40 * (Math.floor(i / 10)), 90, 30));
        }
    }

    drawBricks() {
        for (let i = 0; i < this.brickList.length; i++) {
            this.brickList[i].draw();
        }
    }

    destroyBrick(index) {
        this.brickList.splice(index, 1);
    }

    clear() {
        ctx.fillStyle = 'rgba(255,255,255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 1,
    radius: 10,
    color: 'blue',
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

let map = new Canvas();
map.generateBricks(60);
let ind = 0;
let d = 0;

function draw() {
    map.clear();
    map.drawBricks();
    map.destroyBrick(ind);
    if (++d > 30) {
        map.generateBricks(90);
    }
    console.log(ind);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
}
canvas.addEventListener("mouseover", function (e) {
    raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", function (e) {
    window.cancelAnimationFrame(raf);
});

ball.draw();