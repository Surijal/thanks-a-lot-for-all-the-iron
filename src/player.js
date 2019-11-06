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
    this.speed = 1.4;
    this.jumpSpeed = 10;
    this.jumpHeight = 550;
    // enviroment default movement value
    this.inertia = 0.92;
    this.gravity = 0.18;
    // default positions
    this.jumping = false;
    this.onTheGround = true;
    this.direction = 0;
    this.currentX = 0;
    this.westY = 500;
    this.groundLevel = this.canvas.height - this.groundHeight;
    // player default position
    this.x = 50;    
    this.y = this.groundLevel;
}

// defining Player prototype movement
Player.prototype.movement = function ( direction ) {
    
    
    if ( direction === 'left'  && this.jumping != true) { // direction left move
        if ( this.xVelocity > -this.speed ){
            // this.xVelocity--;
            // this.currentX++;
            this.xVelocity -= this.speed;
            this.xVelocity *= this.inertia;
            this.x -= this.xVelocity;
        }
    }
    
    if ( direction === 'right'  && this.jumping != true) {  // direction right move
        if ( this.xVelocity < this.speed ) {
            this.xVelocity += this.speed;
            this.xVelocity *= this.inertia;
            this.x += this.xVelocity;
        }
    }

    if ( direction === 'left' && this.jumping != false ) {
        this.xVelocity *= this.gravity;
        this.x -= this.xVelocity;
    }

    if ( direction === 'right' && this.jumping != false ) {
        this.xVelocity *= this.gravity;
        this.x -= this.xVelocity;
    }

     if ( direction === 'up'  && this.jumping != true ) {
        console.log(this.yVelocity);
   this.yVelocity = -this.maxVelocity   / 5;
   this.jumping = true;
   this.onTheGround = false;
 }
   else  if ( direction === 'up' && this.jumping != false ) {
       
        this.yVelocity *= this.gravity;
        this.yVelocity += this.yVelocity;
        this.xVelocity *= this.gravity;
        this.x += this.xVelocity;
        console.log(this.yVelocity);
        this.jumping =false;
        }
        
   else if ( this.jumping  != false ) {
       
         this.yVelocity += this.gravity;
         this.yVelocity *= this.inertia;
         this.y += this.yVelocity;
         this.jumping = false;
        }
    

        // for ( var i = 0; i < 400; i++ ) {
        //     if ( this.y <= 400) {
        //         this.jumping = false;
        //         this.onTheGround = true;
        //     }
        // }
        
}

//top collision
Player.prototype.topCollision = function () {

    if ( this.y < this.jumpHeight ) {
         this.yVelocity *= -this.inertia;
        this.y += this.yVelocity;
        this.jumping = false;   
        
    }
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
        this.direction -1;
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
    this.yVelocity += this.yVelocity;
    this.xVelocity += this.xVelocity;
    this.y += this.y;
    this.x += this.x;
}

// defining Player prototype draw function
Player.prototype.draw = function() {
    this.ctx.fillStyle = '#33FFF0'; // color property
    // defining player x position, player y position, player width, player height
    this.ctx.fillRect(this.x += this.xVelocity, this.y += this.yVelocity , this.sizeWidth, this.sizeHeight);

}

