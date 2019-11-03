'use strict';

// defining Game properties 
function Game() {
    this.canvas = null; //add canvas property
    this.ctx = null;    //add ctx property
    
    // add enemy property
    // add player property
    this.player = null;
    this.enemies = [];
    this.goods = [];
    
    this.gameIsOver = false;
    this.gameScreen = null;
    
    this.ironbar = 0;
    this.score = 0;
}

// defining Game Start  prototype function
Game.prototype.start = function() {
    this.canvasContainer = document.querySelector('.canvas-container'); // get canvas-container
    this.canvas = document.querySelector('canvas'); // get canvas
    this.ctx = this.canvas.getContext('2d'); // defining Canvas Context 2d
    //saving lives, ironbar and score to the html
    this.livesElement =  this.gameScreen.querySelector('.lives .value');
    this.scoreElement = this.gameScreen.querySelector('.score .value');
    this.ironbarElement = this.gameScreen.querySelector('.ironbar .value');

    // defining the canvas viewport
    this.containerWidth = this.canvasContainer.offsetWidth; // defining canvas width
    this.containerHeight = this.canvasContainer.offsetHeight;   // defining canvas height
    this.canvas.setAttribute('width', this.containerWidth ); // adding width attribute to containerWidth
    this.canvas.setAttribute('height', this.containerHeight ); // adding height attribute to containerHeight
    this.groundHeight = 76;
    this.groundLevel = this.canvas.height - this.groundHeight;
    this.spawn = this.canvas.width;
    //create new Player in the prototype, canvas and 8 Lives
    this.player = new Player( this.canvas, 8, 0);

    
    

    // create new Ground
    this.ground = new Ground (this.canvas );

    //define function move player keydown
    this.handleKeyDown = function ( event ) {
        if (event.key === 'ArrowUp') {
            this.player.movement('up');
        }
        if ( event.key === 'ArrowRight' ) {
            this.player.movement('right');
        }
        if ( event.key === 'ArrowLeft' ) {
            this.player.movement('left');
        }
    };

    // define function move player  keyup
    this.handleKeyUp = function ( event ) {
        // this.player.movement(event) = true;
        
        /*
        if ( event.key === 'ArrowUp' ) {
        this.player.movement('noUp'); 

        }
        */
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
            var startX = this.spawn;

            this.enemies.push(new SpikedEnemy(this.canvas, startX, 1.5, random));  
        };
        //radom create goods
        if ( Math.random() > 0.99 ) {
            var randomGood = 2 * Math.random();
            var startXGood = this.spawn;

            this.goods.push(new Ironbars(this.canvas, startXGood, 0.25, randomGood ));
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

        this.goods = this.goods.filter(function (good) {
            good.updatePositionIronbar();
            return good.insideScreenW();
        })

        

         // draw enemy
        this.enemies.forEach(function( item ) { 
            item.drawSpikedEnemy();
            
        });

        // draw goods
        this.goods.forEach(function(goodDraw){
            goodDraw.drawIronbars();
        });
        
        // stop game if its over
        if (!this.gameIsOver) {
            window.requestAnimationFrame(loop);
        }  

        // Update Game Stats
        this.updateGameStats();
    
        console.log('in loop'); // control log to see if game is in loop

        //window.requestAnimationFrame(loop);
    }.bind(this);

    window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function () {
    this.enemies.forEach(function(SpikedEnemy){
        if (this.player.didCollideSpikedEnemy(SpikedEnemy)){
            this.player.removeLive();

            SpikedEnemy.y = this.groundLevel - (SpikedEnemy.spikedEnemyHeight);
            
            if (this.player.lives === 0) {
                this.gameOver();
            }   
        } else if ( SpikedEnemy.x < this.player.x ) {
            for ( var i = 0; i < 1; i++) {
                this.score += 100;
            }
        }
    }, this);

    this.goods.forEach(function(Ironbars) {
        if (this.player.collectIronbar(Ironbars)){
            this.player.addIronbar();

            Ironbars.y = 0;
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

//Update Game stats
Game.prototype.updateGameStats = function() {
    this.score;
    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
    this.ironbarElement.innerHTML = this.player.ironbar;
}