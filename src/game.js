'use strict';

// defining Game properties 
function Game() {
    this.canvas = null; //add canvas property
    this.ctx = null;    //add ctx property
    
    // add enemy property
    // add player property
    this.player = null;
    this.enemies = [];
    
    this.gameIsOver = false;
    this.gameScreen = null;
    
    this.score = 0;
}

// defining Game Start  prototype function
Game.prototype.start = function() {
    this.canvasContainer = document.querySelector('.canvas-container'); // get canvas-container
    this.canvas = document.querySelector('canvas'); // get canvas
    this.ctx = this.canvas.getContext('2d'); // defining Canvas Context 2d

    // defining the canvas viewport
    this.containerWidth = this.canvasContainer.offsetWidth; // defining canvas width
    this.containerHeight = this.canvasContainer.offsetHeight;   // defining canvas height
    this.canvas.setAttribute('width', this.containerWidth ); // adding width attribute to containerWidth
    this.canvas.setAttribute('height', this.containerHeight ); // adding height attribute to containerHeight
    this.groundHeight = 76;
    this.groundLevel = this.canvas.height - this.groundHeight;
    this.enemySpawn = this.canvas.width;
    //create new Player in the prototype, canvas and 8 Lives
    this.player = new Player( this.canvas, 8);

    
    

    // create new Ground
    this.ground = new Ground (this.canvas );

    //define function move player keydown
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
        if ( event.key === 'ArrowUp' ) {

        }

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
        
        
        // random enemy create
        
        if ( Math.random() > 0.98 ) {
            var random =  768 * Math.random();
            
            var startX = this.enemySpawn;

            this.enemies.push(new SpikedEnemy(this.canvas, startX, 1.5, random));
                
        };
        
        
        // call collision check
        this.checkCollisions();

        // bottomCollision call
        this.player.bottomCollision();

        // enemies update
        
        
        
        
        // Clear the canvas
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        
        //  Update the canvas
        //  draw the player call the prototype function
        
        //draw player
        this.player.draw();
        
        
        // draw the Ground
        this.ground.drawGround();
        
        this.enemies = this.enemies.filter(function (one) {
            one.updatePosition();
            return one.insideScreen();
        });

        

         // draw enemy
        this.enemies.forEach(function( item ) { 
            item.drawSpikedEnemy();
            
        });
        

        if (!this.gameIsOver) {
            window.requestAnimationFrame(loop);
        }

        
        

        
    
        console.log('in loop'); // control log to see if game is in loop

        

        window.requestAnimationFrame(loop);
    }.bind(this);

    window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function () {
    this.enemies.forEach(function(SpikedEnemy){
        if (this.player.didCollideSpikedEnemy(SpikedEnemy)){
            this.player.removeLive();

            SpikedEnemy.y = this.groundLevel - (SpikedEnemy.spikedEnemyHeight / 2);

            if (this.player.lives === 0) {
                this.gameOver();
            }   
        }
    }, this);
}

//GameOver Callback 
Game.prototype.passGameOverCallback = function (callback) {
    this.onGameOverCallback = callback;
}

Game.prototype.gameOver = function() {
    this.gameIsOver = true;

    this.onGameOverCallback();
}

//Prototype remove GameScreen

Game.prototype.removeGameScreen = function() {
    this.gameScreen.remove();
}
