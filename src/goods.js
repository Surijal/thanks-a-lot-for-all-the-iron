'use strict';

// defining ironbar property function
function Ironbars ( canvas, x, speed, random ) {
    this.canvas = canvas; 
    this.ctx = canvas.getContext('2d');

    this.canvasHeight = this.canvas.height;
    this.groundHeight = 76;

    this.speed = speed;
    this.random = random;

    this.ironbarHeight = 25;
    this.ironbarWidth = 10;

    this.x = x;
    this.y = this.canvasHeight - this.groundHeight - (this.ironbarHeight * 4);
}

Ironbars.prototype.drawIronbars = function() {
    this.ctx.fillStyle = '#464543';

    this.ctx.fillRect(this.x, this.y, this.ironbarWidth, this.ironbarHeight);
}

Ironbars.prototype.updatePositionIronbar = function () {
    this.x -= this.speed;
}

Ironbars.prototype.insideScreenW = function () {
    return this.x + this.ironbarWidth / 2 > 0;
}