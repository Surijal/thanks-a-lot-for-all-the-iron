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

./src/score.js

./css/style.css



##### index.html

Basic html

<style href="./css/styles.css"></style>

<script scr="./src/main.js"></script>

<script src="./src/game.js"></script>

<script src="./src/player.js"></script>

<script src="./src/enemy.js"></script>

BACKLOG: <script src="./src/score.js"></script>



##### main.js

function create Game Start Screen

function create Game Play Screen

function create Game Over Screen

function append Screen to load to the document



##### player.js

function define player canvas, default position, speed, life, size

function define player lifes

function.prototype define player Movement

function.prototype player collide enemy

function.prototype player collide goods

function.prototype draw player

Function.prototype remove life

function.prototype upadet player position



##### enemy.js

Function define enemy canvas, speed, position x, size

function.prototype move enemy

function.prototype enemy collide player

function.prototype enemy moves out of screen

function.prototype draw enemie

function.prototype create random enemy

function.prototype update enemy position



##### game.js

Function handle collision

function start game screen

function start game loop

​	draw player

​	draw random enemy

​	update enemey

​	update player

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





##### Links

trello

github:

https://github.com/Surijal/thanks-a-lot-for-all-the-iron



































