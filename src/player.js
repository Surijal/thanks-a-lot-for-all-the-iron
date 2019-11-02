'use strict';

// defining Player function, canvas and lives
function Player( canvas, lives ) {
    this.canvas = canvas; //define canvas Player property
    this.ctx = this.canvas.getContext('2d'); // defining player canvas Context as 2d

    this.lives = lives; // defining lives property

    this.sizeWidth = 50;    // defining playerWidth
    this.sizeHeigth = 100;  // defining playerHeigth
    this.x = 50;    // defining player X default position
    this.y = 50;    // defining player Y default position

}

// defining Player prototype draw function
Player.prototype.draw = function() {
    this.ctx.fillStyle = '#33FFF0'; // color property
    // defining player x position, player y position, player width, player height
    this.ctx.fillRect(this.x, this.y, this.sizeWidth, this.sizeHeigth); 
}