var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

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
        if (this.bottom < rectangle.top || this.top > rectangle.bottom || this.left > rectangle.right || this.right < rectangle.left) {
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

class Racket extends Rectangle {

    constructor(x = WIDTH/2, y = HEIGHT - 100, w = 90, h = 10, c = "black") {
        super(x, y, w, h, c);
    }

    move(x) {
        this.x = x - (this.width / 2);
        this.edge();
    }

}

class Canvas {

    constructor() {
        this.brickList = [];
        this.racket = new Racket();
    }

    generateBricks(numberOfBricks) {
        for (let i = 0; i < numberOfBricks; i++) {
            this.brickList.push(new Brick(100 * (i % 10) + 250, 100 + 40 * (Math.floor(i / 10)), 90, 30));
        }
    }

    drawMap() {
        this.drawRacket();
        this.drawBricks();
    }

    drawRacket() {
        this.racket.draw();
    }

    drawBricks() {
        for (let i = 0; i < this.brickList.length; i++) {
            this.brickList[i].draw();
        }
    }

    checkCollision(ball) {
        for (let i = 0; i < this.brickList.length; i++) {
            if (ball.isColliding(this.brickList[i])) {
                this.destroyBrick(i);
                break;
            }
        }
        ball.isColliding(this.racket);
    }

    destroyBrick(index) {
        this.brickList.splice(index, 1);
    }

    clear() {
        ctx.fillStyle = 'rgba(255,255,255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

class Ball {
    constructor() {
        this.y = 100;
        this.x = 100;
        this.vx = 5;
        this.vy = 1;
        this.radius = 10;
        this.color = 'blue';
        this.edge();
    }

    edge() {
        this.top = this.y + this.vy - this.radius;
        this.bottom = this.y + this.vy + this.radius;
        this.left = this.x + this.vx - this.radius;
        this.right = this.x + this.vx + this.radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        this.edge();
    }

    isColliding(rectangle) {
        if (this.bottom < rectangle.top || this.top > rectangle.bottom || this.left > rectangle.right || this.right < rectangle.left) {
            return false;
        }
        if (this.bottom == rectangle.top || this.top == rectangle.bottom) {
            ball.vy = -ball.vy;
        }
        if (this.left == rectangle.right || this.right == rectangle.left) {
            ball.vx = -ball.vx;
        }
        return true;
    }
}


let map = new Canvas();
let ball = new Ball();
map.generateBricks(60);
let ind = 0;

function draw() {
    map.clear();
    map.checkCollision(ball);
    map.drawMap();
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
canvas.addEventListener('mousemove', function(e) {
    map.clear();
    map.racket.move(e.clientX);
    map.drawMap();
  });
ball.draw();