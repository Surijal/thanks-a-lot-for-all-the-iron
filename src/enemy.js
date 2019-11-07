'use strict';

function SpikedEnemy ( canvas,  speed, startX, direction) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.groundHeight = 76;

    // this.startLeft = startLeft;
    // this.startRight = startRight;

    this.spikedEnemyHeight = 25;
    this.spikedEnemyWidth = 32;
    this.direction=direction;
    this.speed = speed;
    this.y = this.canvasHeight - this.groundHeight - this.spikedEnemyHeight;
    this.x= startX
    // this. x = 0;

}

SpikedEnemy.prototype.drawSpikedEnemyLeft = function () {
    this.ctx.fillStyle ='#581845';

    this.ctx.fillRect( this.x, this.y, this.spikedEnemyWidth, this.spikedEnemyHeight);
}

SpikedEnemy.prototype.drawSpikedEnemyRight = function () {
    this.ctx.fillStyle ='#581845';
    debugger;
    this.ctx.fillRect( this.x, this.y, this.spikedEnemyWidth, this.spikedEnemyHeight);
}



SpikedEnemy.prototype.updatePositionLeft = function () {
        this.x += this.speed * this.direction;
        console.log(this,'left');
}

SpikedEnemy.prototype.updatePositionRight = function () {
    this.x -= this.speed * this.direction;
    console.log(this,'right');
}

SpikedEnemy.prototype.insideScreen = function () {
    return this.x + this.spikedEnemyWidth / 2 > 0;
}


