# thanks a lot for all the iron

thanks a lot for all the iron is a game were the Player like to reach highest possible score, jumping over enemys to get points, collecting goods to get points. A good got same color like the player, an enemy got a different color.

### Backlog

- different difficulty:		Enemy Changing color

  ​									Player Changes color

  ​									Both Player and enemy Change color

- Time played highers the score reached

- Pause Button

- End Game Button

- Speeding up enemys with time played



### Datastructure

./index.html

./src/main.js

./src/game.js

./src/player.js

./src/enemy.js

./css/style.css



##### index.html

Basic html

<style href="./css/styles.css"></style>
<script scr="./src/main.js"></script>
<script src="./src/game.js"></script>
<script src="./src/player.js"></script>
<script src="./src/enemy.js"></script>




##### main.js

function create Game Start Screen

```
buildSplashScreen(){
}
```

function create Game Play Screen

```
buildGameScreen(){
}
```

function create Game Over Screen

```
buildGameOverScreen(){
}
```

function append Screen to load to the document needed, start, game, game over



##### player.js

function define player canvas, default position, speed, life, size

​		this.canvas

​		this.ctx

​		this.lives

​		this.size

​		this.speed

​		this.x

​		this.y

​		this.direction

​		this.speed

​	

function.prototype define player direction 

backlog function.prototype player collide goods

function.prototype draw player

​		this.ctx.fillrect

​		this.ctx.fillstyle

Function.prototype remove life

​			this.lives -= 1

function.prototype upadet player position

fucntion.prototype player collide



##### enemy.js

Function define enemy canvas, speed, position x, size

​		this.canvas

​		this.ctx

​		this.size

​		this.x

​		this.y

​		this.speed

function.prototype move enemy

function.prototype draw enemie

​		this.ctx.fillstyle

​		this.ctx.fillRect



##### game.js

Function Game

​		this.canvas

​		this.ctx

​		this.enemies

​		this.player

​		this.gameOver

​		this.gameScreen

​		this.score

Function handle collision

function start game screen

function start game loop

​	draw player

​	draw random enemy

​	update enemey position

​	update player position

​	check colision	(player, enemy)

​	check inside screen (enemy)

​	game over => check players life

​	Backlog: score

​	

function start game over screen





##### BACKLOG score.js

​	function calculate enemys evaded

​	function goods collected

​	function calculate goods collected + enemy evade

​	function upadte score, manipulate dom

​	BACKLOG function timeplayed, multiply with goods + evade



##### style.css

​	button

​	paragraphs

​	headings

​	default styles

​	



TODO:

- Main.js build dom
- main.js buildSplashScreen
- Main.js addEventListener
- main.js buildGameScreen
- Main.js buildGameOverScreen
- Game.js buildCanvas
- Game.js start loop function
- Game.js clear canvas
- Game.js update canvas
- game.js draw canvas
- game.js draw player
- game.js draw random enemy
- game.js set game over
- Game.js calculate collision
- game.js addEventListener
- game.js move player
- Game.js move enemy
- game.js check enemy inside screen
- Game.js check game over => player life < 0
- game.js calculate score
- player.js create player canvas
- Player.js define player direction
- player.js define remove life
- player.js update player position
- Enemy.js define enemy canvas
- Enemy.js prototype move enemy
- Enemy.js prototyoe draw enemy







- Backlog: add goods
- Backlog: calculate enemy evade
- Backlog: Difficulty: enemy change color
- Backlog: Difficulty: Player change color
- Backlog: Difficulty: Both player and enemy change color
- Backlog: Pause Button
- Backlog: Speed game up over time
- Backlog: speed enemy up over time





##### Links

trello: https://trello.com/b/DHOpOlC2/thanks-a-lot-for-all-the-iron

github:	https://github.com/Surijal/thanks-a-lot-for-all-the-iron



































