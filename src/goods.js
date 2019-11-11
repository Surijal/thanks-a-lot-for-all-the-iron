'use strict';

// defining ironbar property function
class Ironbars {
    constructor ( canvas, x, speed, random ) {
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

    drawIronbars () {
        console.log('hello');
        this.image.src = "./image/good.png";
        this.ctx.drawImage(this.image, this.x, this.y, this.ironbarWidth, this.ironbarHeight);
    }

    updatePositionIronbar () {
    this.x -= this.speed;
}

}


// Ironbars.prototype.updatePositionIronbar = function () {
//     this.x -= this.speed;
// }

Ironbars.prototype.insideScreenW = function () {
}