'use strict';

// defining Game properties 
function Game() {
    this.canvas = null; //add canvas property
    this.ctx = null;    //add ctx property
    // add enemy property
    // add player property
    this.gameScreen = null;
}

// defining Game prototype function
Game.prototype.start = function() {
    this.canvasContainer = document.querySelector('.canvas-container'); // get canvas-container
    this.canvas = document.querySelector('canvas'); // get canvas
    this.ctx = this.canvas.getContext('2d'); // defining Canvas Context 2d

    // defining the canvas viewport
    this.containerWidth = this.canvasContainer.offsetWidth; // defining canvas width
    this.containerHeigth = this.canvasContainer.offsetHeigth;   // defining canvas heigth
    this.canvas.setAttribute('width', this.containerWidth ); // adding width attribute to containerWidth
    this.canvas.setAttribute('heigth', this.containerHeigth ); // adding height attribute to containerHeigth
    
    // call startLoop - starting the game Loop
    this.startLoop();
}

// defining Game prototype startLoop function
Game.prototype.startLoop = function() {
    var loop = function() {

        console.log('in loop'); // control log to see if game is in loop

        window.requestAnimationFrame(loop);
    }.bind(this);

    window.requestAnimationFrame(loop);
}