'use strict';

// defining Player function, canvas and lives
function Player( canvas, lives, ironbar ) {
    this.canvas = canvas; //define canvas Player property
    this.ctx = this.canvas.getContext('2d'); // defining player canvas Context as 2d
    //enviroment calculation
    this.canvasHeight = this.canvas.height;
    this.groundHeight = 76;
    // Gamestats
    this.lives = lives; 
    this.ironbar = ironbar;
    // player size
    this.sizeWidth = 32;    
    this.sizeHeight = 32;  
    // Movement default values
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.maxVelocity = 6;
    this.speed = 4;
    this.jumpSpeed = 3;
    // enviroment default movement value
    this.inertia = 0.89;
    this.gravity = 0.35;
    // default positions
    this.jumping = false;
    this.onTheGround = true;
    this.direction = 0;
    this.groundLevel = this.canvas.height - this.groundHeight - this.sizeHeight;
    // player default position
    this.x = 50;    
    this.y = this.groundLevel;
}

// defining Player prototype movement
Player.prototype.movement = function ( direction ) {

    if ( direction === 'left') { // direction left move
        if ( this.xVelocity > -this.speed ){
            this.xVelocity--;
            this.x--;
        }
    }
    
    if ( direction === 'right' ) {  // direction right move
        if ( this.xVelocity < +this.speed ) {
            this.xVelocity++;
            this.x++;
        }
    }
    
    if ( direction === 'up'  ) {
        this.yVelocity = -this.maxVelocity;
        this.jumping = true;
        this.onTheGround = false;
    }

    if ( this.jumping === true ) {
        this.yVelocity += this.gravity;
        this.yVelocity *= this.inertia;
        this.y += this.yVelocity;

        for ( var i = 0; i < this.groundLevel; i++ ) {
            if ( this.y >= this.groundLevel && this.y <= (this.groundLevel - 100)) {
                this.jumping = false;
                this.onTheGround = true;
            }
        }
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

Player.prototype.collectIronbar = function ( Ironbars ) {
    var playerLeft = this.x;
    var playerRight = this.x + this.sizeWidth;
    var playerTop = this.y;
    var playerBottom = this.y + this.sizeHeight;

    var IronbarsLeft = Ironbars.x;
    var IronbarsRight = Ironbars.x + Ironbars.IronbarsWidth;
    var IronbarsTop = Ironbars.y;
    var IronbarsBottom = Ironbars.y + Ironbars.IronbarsHeight;

    var crossRight = IronbarsLeft <= playerRight && IronbarsLeft >= playerLeft;
    var crossLeft = IronbarsRight >= playerLeft && IronbarsRight <= playerRight;
    var crossTop = IronbarsBottom >= playerTop && IronbarsBottom <= playerBottom;
    var crossBottom = IronbarsTop <= playerBottom && IronbarsTop >= playerTop;

    if ( (crossRight || crossLeft) && (crossBottom || crossTop) ) {
        return true;
    }
    return false;
};


//add Ironbars prototype
Player.prototype.addIronbar = function () {
    this.ironbar += 1;
}

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

