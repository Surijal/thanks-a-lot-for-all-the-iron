'use strict';

// defining Ground propterty function
function Ground ( canvas ) {
    this.canvas = canvas; // defines canvas of Ground
    this.ctx = this.canvas.getContext('2d'); //defining Ground canvas 2d

    this.sizeWidth = this.canvas.width;
    this.sizeHeight = 85;
    this.y = this.canvas.height;

} 


//defining Ground prototype function
Ground.prototype.drawGround = function() {
    this.ctx.strokeStyle = '#FF9C33'; // color porperty 
    this.ctx.lineWidth = this.sizeHeight;
    this.ctx.beginPath();
    this.ctx.moveTo( 0, this.y );
    this.ctx.lineTo ( this.canvas.width, this.y );
    this.ctx.stroke();
}