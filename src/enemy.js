'use strict';
class SpikedEnemy {
    constructor ( canvas,  speed, startX, direction) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
        
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;
            this.groundHeight = 76;
        
            this.spikedEnemyHeight = 25;
            this.spikedEnemyWidth = 32;
            this.direction=direction;
            this.speed = speed;
            this.y = this.canvasHeight - this.groundHeight - this.spikedEnemyHeight;
            this.x= startX
            this.image = new Image();
        }
        
        drawSpikedEnemyLeft  () {
        
            if ( this.direction === -1 ) {
                this.image.src = "./image/enemy-right.png"
                this.ctx.drawImage(this.image, this.x, this.y, this.spikedEnemyWidth, this.spikedEnemyHeight)
            } else {
                this.image.src = "./image/enemy-left.png"
                this.ctx.drawImage(this.image, this.x, this.y, this.spikedEnemyWidth, this.spikedEnemyHeight)
        
            }

        }
}


SpikedEnemy.prototype.drawSpikedEnemyRight = function () {
    this.ctx.fillStyle ='#581845';
    debugger;
    this.ctx.fillRect( this.x, this.y, this.spikedEnemyWidth, this.spikedEnemyHeight);
}



SpikedEnemy.prototype.updatePositionLeft = function () {
        this.x += this.speed * this.direction;
       
}

SpikedEnemy.prototype.updatePositionRight = function () {
    this.x -= this.speed * this.direction;
  
}

SpikedEnemy.prototype.insideScreen = function () {
    return this.x + this.spikedEnemyWidth / 2 > 0;
}


