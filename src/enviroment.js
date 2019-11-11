'use strict';

// defining Ground propterty function
class Ground {
    constructor ( canvas ) {
        this.canvas = canvas; // defines canvas of Ground
        this.ctx = this.canvas.getContext('2d'); //defining Ground canvas 2d

        this.groundWidth = this.canvas.width;
        this.groundY = this.canvas.height - 76;
        this.groundHeight = 76;
        
        this.image = new Image();
        this.image.src = './image/ground.png';
    }

    drawGround () {

        this.ctx.fillRect(0, this.groundY, this.canvas.width, this.groundY);
        this.ctx.stroke();
        var pattern = this.ctx.createPattern(this.image, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, this.groundY, this.canvas.width, this.groundY);
    }
}

class Sky {
    constructor  ( canvas ) {
            this.canvas = canvas; // defines canvas of Ground
            this.ctx = this.canvas.getContext('2d'); //defining Ground canvas 2d
        
            this.groundWidth = this.canvas.width;
            this.groundY = this.canvas.height - 76;
            
            this.image = new Image();
            this.image.src = './image/sky.jpg';
        }
}

// function Sky  (canvas) {
//     this.canvas = canvas; // defines canvas of Ground
//     this.ctx = this.canvas.getContext('2d'); //defining Ground canvas 2d

//     this.groundWidth = this.canvas.width;
//     this.groundY = this.canvas.height - 76;
    
//     this.image = new Image();
//     this.image.src = './image/sky.jpg';
// }

Sky.prototype.draw = function () {
    this.ctx.fillRect(0, 0, this.canvas.width, this.groundY);
    this.ctx.stroke();
    var pattern = this.ctx.createPattern(this.image, 'repeat');
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0,  0, this.canvas.width, this.groundY);
}
