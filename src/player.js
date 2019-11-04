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
    this.sizeWidth = 30;    
    this.sizeHeight = 30;  
    // Movement default values
    var xVelocity = 1;
    var yVelocity = 1;
    this.maxVelocity = 6;
    this.speed = 4;
    this.jumpSpeed = 3;
    this.jumpHeight = 175;
    // enviroment default movement value
    var inertia = 1.000008;
    var gravity = 0.998;
    // default positions
    this.jumping = false;
    this.onTheGround = true;
    this.direction = 0;
    this.directionX = 0;
    this.groundLevel = this.canvas.height - this.groundHeight;
    // player default position
    this.x = 50;    
    this.y = this.groundLevel - this.sizeHeight;
}


Player.prototype.movement = function () {

    var inertia = 0.98;
    var gravity = 0.35;


    if (this.direction === -1 ) {
        console.log("UP");
        this.y -= 3;
        //this.y += gravity;
    }
    else if (this.direction === 1) {
       // debugger;
        console.log("DOWN");
        this.y += 3;
        //this.y *= inertia;
    }

}

// defining Player prototype movement
// Player.prototype.movement = function ( direction ) {

//     if ( direction === 'left') { // direction left move
//         if ( this.xVelocity > -this.speed ){
//             this.xVelocity--;
//             this.x--;
//         }
//     }
//     if ( direction === 'right' ) {  // direction right move
//         if ( this.xVelocity < +this.speed ) {
//             this.xVelocity++;
//             this.x++;
//         }
//     }

//     if ( this.y + this.sizeHeight > this.groundLevel){
//         this.jumping = false;
//         return;
//     }
//     else if (this.direction ===  -1 ){
//         console.log("UP");
//         this.y -= 1;
//     }
//     else if (this.direction === 1) {
//         console.log("DOWN");
//         this.y += 1;
//     }
    



    // console.log('before press up:' + this.yVelocity)
    // if ( direction === 'up'  ) {
    //     this.yVelocity = this.yVelocity - this.maxVelocity;
    //     this.jumping = true;
    //     this.onTheGround = false;
    //     var currentHeight = this.y
    //     var jumpMax = currentHeight + this.jumpHeight;
        
    //     console.log('after pressed up' + this.yVelocity);
    
    //     /*
    //     if ( this.y > jumpMax ) {
    //     this.y = this.y - this.yVelocity - this.direction;
    //     }
    //     */
    // } else { this.y += (this.yVelocity * - 1 )+ this.gravity * this.inertia - this.direction;

    // }

    // if ( this.jumping === true ) {
    //     this.yVelocity  += this.gravity;
    //     this.yVelocity *= this.inertia;
    //     this.y += this.yVelocity;
    //     console.log(this.yVelocity);

    //     for ( var i = 0; i < this.groundLevel; i++ ) {
    //         if ( this.y >= this.groundLevel && this.y <= (this.groundLevel - 100)) {
    //             this.jumping = false;
    //             this.onTheGround = true;
    //         }
    //     }
    // }    
// }

// bottomCollision prototype
Player.prototype.bottomCollision = function () {
        //this.y = this.y + this.yVelocity + this.direction;
        var bottom = this.groundLevel - this.sizeHeight;
        
        if ( this.y > bottom ) {
            this.y = bottom;
            this.y -= yVelocity;
            }
    }

//jump collision prototype
Player.prototype.updatePlayerDirection = function () {
    var jumpLine = this.groundLevel - this.jumpHeight;
    
    var playerCrossesJumpLine = this.y <= jumpLine;


    if (this.jumping === false) {
        return;
    }
    
    if ( playerCrossesJumpLine || this.direction === 1) {
        this.setDirection("down");
        this.movement();
        
    }
    else if (!playerCrossesJumpLine && this.direction === -1){
        this.setDirection("up");
        this.movement();
        
    }
}

Player.prototype.setDirection = function (direction) {
    if ( direction === "down" ) {
        this.direction = 1;
    }
    else if (direction === "up"){
        this.direction = -1;
    }
    if ( direction === 'left') {
        this.direction = -1;
    }

}

Player.prototype.updatePlayerPosition = function ( ) {
    this.y = this.y + this.yVelocity - this.direction;
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
    this.ctx.fillRect(this.x , this.y, this.sizeWidth, this.sizeHeight); 
}

