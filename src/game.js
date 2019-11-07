'use strict';

// defining Game properties 
function Game() {
    this.canvas = null; //add canvas property
    this.ctx = false;    //add ctx property
    
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
    this.spawnRight = this.canvas.width -5;
    this.spawnLeft = (this.canvas.width - this.canvas.width) +5;
    //create new Player in the prototype, canvas and 8 Lives
    this.player = new Player( this.canvas, 3, 0, 0);

    // create new Ground
    this.ground = new Ground (this.canvas );
    
    // call startLoop - starting the game Loop
    this.startLoop();
}

// defining Game prototype startLoop function
Game.prototype.startLoop = function() {

    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));

    var loop = function() { 

        // random enemy create 
        if ( Math.random() > 0.5 ) {
            var random =  Math.random() * 1000;
            var startLeft = this.spawnLeft;
            var startRight = this.spawnRight;
            console.log(random);
            // this.enemies.push(new SpikedEnemy(this.canvas, +1.5, random, this.startLeft ));
            // this.enemies.push(new SpikedEnemy(this.canvas, -1.5, random,this.startRight ));  
            // if ( random < 0.5) {
        
            //     this.enemies.push(new SpikedEnemy(this.canvas, +1.5, random, startLeft ));     
            // };
            if (random > 950) {
                this.enemies.push(new SpikedEnemy(this.canvas, -1.5, random, startRight ));  
            };

        };
        //radom create goods
        if ( Math.random() > 0.99 ) {
            var randomGood = 2 * Math.random();
            var startXGood = this.spawn;

            this.goods.push(new Ironbars(this.canvas, startXGood, 0.25, randomGood ));
        };

        // bottomCollision call
        this.player.bottomCollision();
        // enemies update
        //this.player.playerScreenCollision();
        
        
        this.checkCollisions();
        this.checkRewardCollisions();

        if (this.enemies.startLeft = true) {
            this.enemies = this.enemies.filter(function (one) {
                one.updatePositionLeft();
                return one.insideScreen();
            });
        }

            if (this.enemies.startRight = true) {
                this.enemies = this.enemies.filter(function (one) {
                    one.updatePositionRight();
                    return one.insideScreen();
                });
            }

        this.goods = this.goods.filter(function (good) {
            good.updatePositionIronbar();
            return good.insideScreenW();
        })
        
        
        
        // Clear the canvas
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        
        //  Update the canvas
        this.player.jumpMovement();

        //draw player
        this.player.draw();
        
        
        // draw the Ground
        this.ground.drawGround();

        
        // draw enemy
        // if ( this.enemies.startRight = true ) {
        //     this.enemies.forEach(function( item ) { 
        //         item.drawSpikedEnemyRight();
                
        //     });
        // }


        this.enemies.forEach(function( item ) { 
            item.drawSpikedEnemyLeft();
        })
    
    
        //this.spikedEnemy.updatePosition();
        
        // draw goods
        this.goods.forEach(function(goodDraw){
            goodDraw.drawIronbars();
        });

        
        // Update Game Stats
        this.updateGameStats();
        
        // stop game if its over
        if (!this.gameIsOver) {
            window.requestAnimationFrame(loop);
        }  


    }.bind(this);

    window.requestAnimationFrame(loop);
};


            //define function move player keydown
            Game.prototype.handleKeyDown = function( event ) {
                if (event.key === 'ArrowUp' ) {    
                    this.player.direction = -1;
                }

                if ( event.key === 'ArrowRight' ) {
                    this.player.movement('right');
                }

                if ( event.key === 'ArrowLeft' ) {
                    this.player.movement('left');
                }
            };

Game.prototype.checkCollisions = function () {
    
    this.enemies.forEach(function (spikedEnemy) {
        if (this.player.enemyKilled(spikedEnemy)) {
            console.log('score');
            spikedEnemy.x = this.canvas.width + spikedEnemy.spikedEnemyWidth;
            this.addScore();

            
        } 
        else if (this.player.didCollideSpikedEnemy(spikedEnemy)) {
                console.log('any' );
                
                this.player.removeLive();
                spikedEnemy.x = this.canvas.width + spikedEnemy.spikedEnemyWidth;

                
                if (this.player.lives === 0) {
                    this.gameOver();
                } 

            } 
        } ,this);

    }
    
    Game.prototype.checkRewardCollisions = function () {
        this.goods.forEach(function(Ironbars) {
            
            if (this.player.collectIronbar(Ironbars)){
                this.addIronbar();
    
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
    //this.score ++  ;
    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
    this.ironbarElement.innerHTML = this.player.ironbar;
}

//add Ironbars prototype
Game.prototype.addIronbar = function () {
    this.ironbar += 1;
}

Game.prototype.addScore = function (){
    this.score += 250;
}
