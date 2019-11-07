'use strict';

// defining ironbar property function
function Ironbars ( canvas, x, speed, random ) {
    this.canvas = canvas; 
    this.ctx = canvas.getContext('2d');

    this.canvasHeight = this.canvas.height;
    this.groundHeight = 76;

    this.speed = speed;
    this.random = random;

    this.ironbarHeight = 24;
    this.ironbarWidth = 24;

    this.x = x;
    this.y = this.canvasHeight - this.groundHeight - (this.ironbarHeight * 4);

    this.image = new Image();
}

Ironbars.prototype.drawIronbars = function() {
    console.log('hello');
    this.image.src = "./image/good.png";
    this.ctx.drawImage(this.image, this.x, this.y, this.ironbarWidth, this.ironbarHeight);

    // this.ctx.fillStyle = '#464543';

    // this.ctx.fillRect(this.x, this.y, this.ironbarWidth, this.ironbarHeight);
}

Ironbars.prototype.updatePositionIronbar = function () {
    this.x -= this.speed;
}

Ironbars.prototype.insideScreenW = function () {
}