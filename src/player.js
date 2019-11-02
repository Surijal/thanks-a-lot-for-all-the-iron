'use strict';

// defining Player function, canvas and lives
function Player( canvas, lives ) {
    this.canvas = canvas; //define canvas Player property
    this.ctx = this.canvas.getContext('2d'); // defining player canvas Context as 2d

    this.lives = lives; // defining lives property

    this.sizeWidth = 32;    // defining playerWidth
    this.sizeHeight = 32;  // defining playerHeight
    this.x = 50;    // defining player X default position
    // defining player Y default position
    this.y = 100;   
    this.groundHeight = 75;

    this.jumping = true;
    this.xVelocity = 0;
    this.yVelocity = 0;

    this.direction = 0;
    this.speed = 8;

}

// defining Player prototype movement
Player.prototype.setDirection = function ( direction ) {

   




    if ( direction === 'up' && this.jumping === false ) {  
         // direction up,jump
        this.yVelocity -= 20;
        this.jumping = true;
        this.y -=  (this.speed * 2);
    } 
    
    
    
    if ( direction === 'left') { // direction left move
        this.xVelocity -= 0.5;
        this.x -= this.speed;
    }
    
    if ( direction === 'right' ) {  // direction right move
        this.xVelocity += 0.5;
        this.x += this.speed;
    }
    
    var gravity =  this.yVelocity += 15; // gravity
    this.x += this.xVelocity;
    this.y += ( this.canvas.height - this.yVelocity - this.sizeHeight - (this.groundHeight / 2 )) ;

    
    if ( this.y > this.canvas.height - this.groundHeight  ) {      
         // prevent player falling through ground
        this.jumping = false;
        this.y = ( this.canvas.height - this.sizeHeight - ( this.groundHeight ));
        this.yVelocity = 0;
    }
    
}

// bottomCollision prototype
Player.prototype.bottomCollision = function () {
        this.y = this.y + this.yVelocity + this.direction;
        var bottom = this.canvas.height - this.groundHeight - this.sizeHeight;
        
        if ( this.y > bottom) this.y = this.bottom;
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

