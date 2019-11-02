'use strict';

// defining Ground propterty function
function Ground ( canvas ) {
    this.canvas = canvas; // defines canvas of Ground
    this.ctx = this.canvas.getContext('2d'); //defining Ground canvas 2d

    this.groundWidth = this.canvas.width;
    this.groundY = this.canvas.height - 76 / 2;
    this.groundHeight = 76;
    

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