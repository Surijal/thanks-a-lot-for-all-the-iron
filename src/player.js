'use strict';

// defining Player function, canvas and lives
function Player( canvas, lives) {
    this.canvas = canvas; //define canvas Player property
    this.ctx = this.canvas.getContext('2d'); // defining player canvas Context as 2d
    //enviroment calculation
    this.canvasHeight = this.canvas.height;
    this.groundHeight = 76;
    // Gamestats
    this.lives = lives;     
    // player size
    this.sizeWidth = 32;    
    this.sizeHeight = 32;  
    // Movement default values
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.maxVelocity = 8;
    this.speed = 35;
    this.jumpSpeed = 10;
    this.jumpHeight = 550;
    // enviroment default movement value
    this.inertia = 0.92;
    this.gravity = 0.35;
    // default position
    
    this.jumping = false;
    
    this.onTheGround = true;
    this.direction = 0;
    this.currentX = 0;
    this.westY = 500;
    this.groundLevel = this.canvas.height - this.groundHeight;
    // player default position
    this.x = 50;    
    this.y = this.groundLevel - this.sizeHeight;;
}

// defining Player prototype movement
// called on keydown event only
Player.prototype.movement = function ( direction ) {
    if ( direction === 'left' ) { // direction left move
        this.x -= this.speed;        

    }
    
    if ( direction === 'right' ) {  // direction right move
        this.x += this.speed;    
    }
}

// called in the loop each frame
Player.prototype.jumpMovement = function() {
    var playerWasGoingUp = this.direction === -1;

    console.log("DIRECTION", this.direction);

    if(this.isTouchingBottom() ) { // if player had touched bottom, set direction to zero
        this.direction = 0;
        this.y = this.groundLevel - this.sizeHeight;
    }

    if(playerWasGoingUp && this.passedJumpLine()) {
        this.direction = 1;

    }


    if (this.direction === -1) { // if currently moving up
        this.y -= 4;
    }

    if (this.direction === 1) { // if currently moving down
        this.y += 4;
    }
}

Player.prototype.passedJumpLine = function () {
    var playerTop = this.y;
    var jumpLine = this.groundLevel - 150;

    return ( playerTop <= jumpLine );
}

Player.prototype.isTouchingBottom = function () {
    var playerBottom = this.y + this.sizeHeight;

    return ( playerBottom > this.groundLevel );
}

//top collision
Player.prototype.topCollision = function () {

    // if ( this.y < this.jumpHeight ) {
    //      this.yVelocity *= -this.inertia;
    //     this.y += this.yVelocity;
    //     this.jumping = false;   
        
    // }
}

// bottomCollision prototype
Player.prototype.bottomCollision = function () {
    var bottom = this.groundLevel - this.sizeHeight;
    var screenLeft = 0;
    var screnRight = this.canvas.width - this.sizeWidth;
    
    // if ( this.y > bottom) {
    //     this.yVelocity =  + this.yVelocity + this.direction;
    //     this.y = bottom;
    // }
    if ( this.x < screenLeft ) {
        this.xVelocity = 0;
        this.y = bottom;
    } 
    if ( this.x >screnRight) {
        this.xVelocity = 0;
        this.y = bottom;   
    } 
    if (this.y < ( 0  + this.sizeHeight)){
        this.yVelocity += this.yVelocity;
        this.y += this.yVelocity;
    }
}    
    

Player.prototype.playerScreenCollision = function () {
    var screenLeft = this.x + this.sizeWidth;
    var screnRight = this.canvas.width - this.sizeWidth;
    var bottom = this.groundLevel - this.sizeHeight;
    var screenTop = 0 +this.sizeHeight;
    
    if ( this.x < screenLeft ) {
        this.x += this.xVelocity;
        this.y = bottom;
    } 
    if ( this.x > screnRight ) {
        this.x -= this.xVelocity;
        this.y =bottom;
    }

    if (this.y < ( 0  + this.sizeHeight)){
        this.yVelocity += this.yVelocity;
        this.y += this.yVelocity;
    }
}

Player.prototype.didCollideSpikedEnemy = function ( SpikedEnemy ) {
    var playerLeft = this.x;
    var playerRight = this.x + this.sizeWidth;
    var playerTop = this.y;
    var playerBottom = this.y + this.sizeHeight;

    var SpikedEnemyLeft = SpikedEnemy.x;
    var SpikedEnemyRight = SpikedEnemy.x + SpikedEnemy.spikedEnemyWidth;
    var SpikedEnemyTop = SpikedEnemy.y +10;
    var SpikedEnemyBottom = SpikedEnemy.y + SpikedEnemy.spikedEnemyHeight;

    var crossRight = SpikedEnemyLeft <= playerRight && SpikedEnemyLeft >= playerLeft;
    var crossLeft = SpikedEnemyRight >= playerLeft && SpikedEnemyRight <= playerRight;
    var crossTop = SpikedEnemyBottom >= playerTop && SpikedEnemyBottom <= playerBottom;
    var crossBottom = SpikedEnemyTop  < playerBottom ;

    if ( (crossRight || crossLeft) && crossBottom ) {  //&& (crossBottom || crossTop)
        return true;
    }
    return false;
};

Player.prototype.enemyKilled = function (SpikedEnemy) {
    var playerBottom = this.y + this.sizeHeight;
    var playerLeft = this.x;
    var playerRight = this.x + this.sizeWidth;

    var SpikedEnemyTop = SpikedEnemy.y;
    var SpikedEnemyLeft = SpikedEnemy.x + 5;
    var SpikedEnemyRight = SpikedEnemy.x + SpikedEnemy.spikedEnemyWidth - 5;
    
    var hitEnemy = playerBottom >= SpikedEnemyTop;
    var crossLeft = SpikedEnemyRight >= playerLeft && SpikedEnemyLeft <= playerLeft;
    var crossRight = SpikedEnemyRight >= playerRight && SpikedEnemyLeft <= playerRight;
   

    if ( hitEnemy && (crossLeft || crossRight)  ){
        console.log('enemy killed');
        return true;
    }

    return false;
}

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




// remove live prototype
Player.prototype.removeLive = function() {
    this.lives -= 1;
}

Player.prototype.updatePlayer = function () {
    // this.yVelocity += this.yVelocity;
    // this.xVelocity += this.xVelocity;
    // this.y += this.y;
    // this.x += this.x;
}

// defining Player prototype draw function
Player.prototype.draw = function() {
    this.ctx.fillStyle = '#33FFF0'; // color property
    // defining player x position, player y position, player width, player height
    this.ctx.fillRect(this.x, this.y, this.sizeWidth, this.sizeHeight);

}

