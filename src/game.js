'use strict';

// defining Game properties 
function Game() {
    this.canvas = null; //add canvas property
    this.ctx = null;    //add ctx property

    // add enemy property
    // add player property
    this.player = 0;

    this.gameScreen = null;
}

// defining Game prototype function
Game.prototype.start = function() {
    this.canvasContainer = document.querySelector('.canvas-container'); // get canvas-container
    this.canvas = document.querySelector('canvas'); // get canvas
    this.ctx = this.canvas.getContext('2d'); // defining Canvas Context 2d

    // defining the canvas viewport
    this.containerWidth = this.canvasContainer.offsetWidth; // defining canvas width
    this.containerHeight = this.canvasContainer.offsetHeight;   // defining canvas height
    this.canvas.setAttribute('width', this.containerWidth ); // adding width attribute to containerWidth
    this.canvas.setAttribute('height', this.containerHeight ); // adding height attribute to containerHeight

    //create new Player in the prototype, canvas and 3 Lives
    this.player = new Player( this.canvas, 3);

    // create new Ground
    this.ground = new Ground (this.canvas );

    //add event listener to move player with keys
    this.handleKeyUp = function ( event ) {
        if (event.key === 'ArrowUp') {
            this.player.setDirection('jump');
        }
    };

    //add eventlistener to key up
    document.body.addEventListener('keydown', this.handleKeyUp.bind(this));
    
    // call startLoop - starting the game Loop
    this.startLoop();
}

// defining Game prototype startLoop function
Game.prototype.startLoop = function() {
    var loop = function() {



        // 2. Clear the canvas

        // 3. Update the canvas
        // 3.1 draw the player call the prototype function
        this.player.draw();

        // 3.2 draw the Ground
        this.ground.drawGround();

        console.log('in loop'); // control log to see if game is in loop

        window.requestAnimationFrame(loop);
    }.bind(this);

    window.requestAnimationFrame(loop);
}