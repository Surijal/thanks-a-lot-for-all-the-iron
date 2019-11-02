'use strict';

// defining Ground propterty function
function Ground ( canvas ) {
    this.canvas = canvas; // defines canvas of Ground
    this.ctx = this.canvas.getContext('2d'); //defining Ground canvas 2d

    this.sizeWidth = 768;
    this.sizeHeight = 15;
    this.y = 675;

} 


//defining Ground prototype function
Ground.prototype.drawGround = function() {
    this.ctx.strokeStyle = '#FF9C33'; // color porperty 
    this.ctx.lineWidth = this.sizeHeight;
    this.ctx.beginPath();
    this.ctx.moveTo( 0, this.y );
    this.ctx.lineTo ( 768, this.y );
    this.ctx.stroke();
}