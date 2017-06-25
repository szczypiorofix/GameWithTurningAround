var gameStep = 0;
var gameLatecy = 0;
var currentBrick = null;
var tick = false;
var input = null;
var player = null;

var Canvas = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    init: function() {
        this.canvas = document.getElementById("gamecanvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
};

var GameField = {
    width: 0,
    height: 0,
    fieldSize: 40,
    field: null,
    wallCount: 5,
    rx: 0,
    ry: 0,
    init: function(cw, ch) {
        this.width = cw / this.fieldSize;
        this.height = ch / this.fieldSize;
        this.field = [];
    },
    generate: function() {
        for (i = 0; i < this.wallCount; i++) {
            this.rx = Math.floor(Math.random() * this.width);
            this.ry = Math.floor(Math.random() * this.height);
            this.field.push({x: this.rx, y: this.ry, v: Math.floor(Math.random() * 3)});
        }
        //console.log(this.field);
    },
    show: function(ctx) {
        var s = ctx.fillStyle;
        ctx.fillStyle = 'gray';
        for (y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {
                //console.log(this.field);
                if (this.field.v === 1) ctx.fillRect(x * this.fieldSize, y * this.fieldSize, this.fieldSize, this.fieldSize);
            }
        }
        ctx.fillStyle = s;
    }
};

var Player = function(image, x, y, angle) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 0;
    
    this.update = function() {
        this.x += (this.speed * Math.cos(this.angle * Math.PI / 180));
        this.y += (this.speed * Math.sin(this.angle * Math.PI / 180));
    };
    
    this.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle +90) * Math.PI/180);
        ctx.drawImage(this.image, -this.image.width/2 - 15, -this.image.height/2 - 15, 30, 30);
        ctx.restore();
    };
};

var Wall = function(x, y) {
    this.x = x;
    this.y = y;
    
    this.draw = function(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, 30, 30);
    };
};


function gameLoop() {
    //GameField.show(Canvas.ctx);
    Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    if (input.keyLeft.isDown) {
        player.angle -= 5;
    }
    
    if (input.keyRight.isDown) {
        player.angle += 5;
    }

    if (input.keyUp.isDown) {
        player.speed = 5;
    }
    
    if (input.keyDown.isDown) {
        player.speed = -5;
    }
    
    if (input.keyUp.isUp && input.keyDown.isUp) {
        player.speed = 0;
    }
    
    player.update();
    player.draw(Canvas.ctx);
}

function game() {
    tick = false;
    gameStep--;
    if (gameStep <= 0) {
        gameStep = gameLatecy;
    }
    if (gameStep === gameLatecy) {
        tick = true;
        gameLoop();
    }
    requestAnimationFrame(game);
}

var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

window.onload = function() {

    Canvas.init();
    //GameField.init(Canvas.width, Canvas.height);
    //GameField.generate();
    player = new Player(document.getElementById("canonimage"), Canvas.width / 2, Canvas.height / 2, -90);
    input = new Input();
    requestAnimationFrame(game);
};
