'use strict';

// defining Player function, canvas and lives
function Player( canvas, lives ) {
    this.canvas = canvas; //define canvas Player property
    this.ctx = this.canvas.getContext('2d'); // defining player canvas Context as 2d
    this.canvasHeight = this.canvas.height;
    this.groundHeight = 76;
    this.lives = lives; // defining lives property

    this.sizeWidth = 32;    // defining playerWidth
    this.sizeHeight = 32;  // defining playerHeight
    this.x = 50;    // defining player X default position
    // defining player Y default position
    
    
    //this.y = 600;  
    this.y = this.canvasHeight - this.groundHeight - this.sizeHeight;


    this.jumping = true;
    this.xVelocity = 0;
    this.yVelocity = 0;

    this.direction = 0;
    this.speed = 8;

}

// defining Player prototype movement
Player.prototype.setDirection = function ( direction ) {

    

    if ( direction === 'up' && this.jumping == false ) {  
         // direction up,jump
        this.yVelocity -= 20;
        this.jumping = true;
        
    } 
    
    if ( direction === 'left') { // direction left move
        this.xVelocity -= 0.5;
        this.x -= this.speed;
        this.jumping = false;
    }
    
    if ( direction === 'right' ) {  // direction right move
        this.xVelocity += 0.5;
        this.x += this.speed;
    }
    
    this.yVelocity += 1.5; // gravity
    this.x += this.xVelocity;
    this.y -=  this.canvasHeight - this.yVelocity - this.sizeHeight - this.groundHeight ;
    this.xVelocity *= 0.9; //friction
    this.yVelocity *= 0.9; // friction

    if ( this.y > this.canvasHeight - this.groundHeight - this.sizeHeight ) {      
         // prevent player falling through ground
        this.jumping = false;
        this.y = this.canvasHeight - this.sizeHeight - this.groundHeight ;
        this.yVelocity = 0;
        
    }

    
    
}

// bottomCollision prototype
Player.prototype.bottomCollision = function () {
        this.y = this.y + this.yVelocity + this.direction;
        var bottom = this.canvasHeight - this.groundHeight - this.sizeHeight;
        
        if ( this.y > bottom) this.y = bottom;
        
}

Player.prototype.didCollideSpikedEnemy = function ( SpikedEnemy ) {
    var playerLeft = this.x;
    var playerRight = this.x + this.sizeWidth;
    var playerTop = this.y;
    var playerBottom = this.y + this.sizeHeight;

    var SpikedEnemyLeft = SpikedEnemy.x;
    var SpikedEnemyRight = SpikedEnemy.x + SpikedEnemy.spikedEnemyWidth;
    var SpikedEnemyTop = SpikedEnemy.y;
    var SpikedEnemyBottom = SpikedEnemy.y + SpikedEnemy.spikedEnemyHeight;

    var crossRight = SpikedEnemyLeft <= playerRight && SpikedEnemyLeft >= playerLeft;
    var crossLeft = SpikedEnemyRight >= playerLeft && SpikedEnemyRight <= playerRight;
    var crossTop = SpikedEnemyBottom >= playerTop && SpikedEnemyBottom <= playerBottom;
    var crossBottom = SpikedEnemyTop <= playerBottom && SpikedEnemyTop >= playerTop;

    if ( (crossRight || crossLeft) && (crossBottom || crossTop) ) {
        return true;
    }
    return false;
};

// remove live prototype
Player.prototype.removeLive = function() {
    this.lives -= 1;
}

// defining Player prototype draw function
Player.prototype.draw = function() {
    this.ctx.fillStyle = '#33FFF0'; // color property
    // defining player x position, player y position, player width, player height
    this.ctx.fillRect(this.x += this.xVelocity, this.y += this.yVelocity, this.sizeWidth, this.sizeHeight); 
}

