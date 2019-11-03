'use strict';

function SpikedEnemy ( canvas, x, speed, random) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.groundHeight = 76;
    this.random = random;

    this.spikedEnemyHeight = 50;
    this.spikedEnemyWidth = 50;

    this.speed = speed;
    this.y = this.canvasHeight - this.groundHeight - this.spikedEnemyHeight;
    
    this.x = x;
}

SpikedEnemy.prototype.drawSpikedEnemy = function () {
    this.ctx.fillStyle ='#95887B';

    this.ctx.fillRect( this.x, this.y, this.spikedEnemyWidth, this.spikedEnemyHeight);
}

SpikedEnemy.prototype.updatePosition = function () {
    this.x -= this.speed;
}

SpikedEnemy.prototype.insideScreen = function () {
    return this.x + this.spikedEnemyWidth / 2 > 0;
}