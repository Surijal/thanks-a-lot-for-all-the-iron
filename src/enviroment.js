'use strict';

// defining Ground propterty function
function Ground ( canvas ) {
    this.canvas = canvas; // defines canvas of Ground
    this.ctx = this.canvas.getContext('2d'); //defining Ground canvas 2d

    this.groundWidth = this.canvas.width;
    this.groundY = this.canvas.height - 76 / 2;
    this.groundHeight = 76;
    
    this.image = new Image();
} 


//defining Ground prototype function
Ground.prototype.drawGround = function() {
    this.ctx.strokeStyle = '#FF9C33'; // color porperty 

    this.ctx.lineWidth = this.groundHeight;
    this.ctx.beginPath();
    this.ctx.moveTo( 0, this.groundY );
    this.ctx.lineTo ( this.canvas.width, this.groundY );
    this.ctx.stroke();
}

function PlattformOne ( canvas ) {
    this.canvas = canvas;
    this.ctx.canvas.getContext('2d');

    this.width = this.canvas.width / 3;
    this.height = 20;
    this.y = this.canvas.height / 4;
}

PlattformOne.prototype.draw = function () {
    this.ctx.src = "/image/ground.png"
    this.ctx.createPattern(img, 'repeat');
    this.ctx.strokeStyle = pattern;
    this.ctx.fill();
    this.ctx.lineWidth = this.height;
    this.ctx.beginPath();
    this.ctx.moveTo( 0, this.y);
    this.ctx.lineTo ( this.width, this.y);
    this.ctx.stroke();

}