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

    //define function move player keyUp
    this.handleKeyDown = function ( event ) {
        if (event.key === 'ArrowUp') {
            this.player.setDirection('up');
        
        }
        if ( event.key === 'ArrowRight' ) {
            this.player.setDirection('right');
        }
        if ( event.key === 'ArrowLeft' ) {
            this.player.setDirection('left');
        }
        
    };

    // define function move player  keyDown
    this.handleKeyUp = function ( event ) {
        

    };

    

    //add eventlistener to keyDown
    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
    //add eventlistener to keyUp
    document.body.addEventListener('keyup', this.handleKeyUp.bind(this) );
    
    // call startLoop - starting the game Loop
    this.startLoop();
}

// defining Game prototype startLoop function
Game.prototype.startLoop = function() {
    var loop = function() {

        
        // bottomCollision call
       this.player.bottomCollision();

        // Clear the canvas
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

        //  Update the canvas
        //  draw the player call the prototype function
       
        this.player.draw();
        // draw the Ground
        this.ground.drawGround();

        
        console.log(this.player);

        console.log('in loop'); // control log to see if game is in loop

        window.requestAnimationFrame(loop);
    }.bind(this);

    window.requestAnimationFrame(loop);
}