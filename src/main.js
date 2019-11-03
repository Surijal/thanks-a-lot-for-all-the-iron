'use strict';

// Building dom
function buildDom ( htmlString ) {
    var div = document.createElement('div');

    div.innerHTML = htmlString;

    return div.children[0];
}

//Building, Loading different Game Screens
function main () {
    var game;  // instance of the Game
    var splashScreen; // Game Start Screen
    var gameOverScreen; // Game Over Screen

    // Creating SplashScreen
    function createSplashScreen () {
        splashScreen = buildDom(    //creating hml strucure SplashScreen
            `<main>
                <h1>thanks a lot for all the iron</h1>
                <button>Start</button>
            </main>
            `
        );

        document.body.appendChild(splashScreen);    //attaching SplashScreen to index.html

        var startButton = splashScreen.querySelector( `button` ); //declaring variable selecting button

        startButton.addEventListener( `click`, function () {    // add Eventlistener click to startButton, call startGame function
            startGame();
        });
    }

    // remove splashScreen function
    function removeSplashScreen() {
        splashScreen.remove();
    }

    // creating gameScreen 
    function createGameScreen() {   // gameScreen html structure
        var gameScreen = buildDom(
            `<main class="game container">
            <header>
                <div class="lives">
                    <span class="label">Lives:</span>
                    <span class="value"></span>
                </div>
                <div class="score">
                    <span class="label">Score:</span>
                    <span class="value"></span>
                </div>
            </header>
            <div class="canvas-container">
                <canvas></canvas>
            </div>
        </main>
        `
        );

        document.body.appendChild( gameScreen ); // attaching gameScreen to index.html
        
        return gameScreen;
    }

    function removeGameScreen() {       // remove the gameScreen
        game.removeGameScreen();
    }

    // Funvtion GameOverScreen
    function createGameOverScreen(score) {
        gameOverScreen = buildDom(
            `
            <main>
                <h1>Game over</h1>
                <p>Your score:
                    <span>
                    </span>
                </p>
                <button>Restart</button>
            </main>
            `
        );
        var button = gameOverScreen.querySelector('button');
        button.addEventListener('click', startGame );

        var span = gameOverScreen.querySelector('span');
        span.innerHTML = score;

        document.body.appendChild(gameOverScreen);
    }

    //function remove Gameoverscreen
    function removeGameOverScreen () {
        if (gameOverScreen) {
            gameOverScreen.remove();
        }
    }

    // Starting the Game
    function startGame() {
        removeSplashScreen(); // removing SplashScreen to load gameScreen after

        //removeGameOverScreen in case game is restartet from GameOverScreen
        removeGameOverScreen();

        game = new Game(); // creating new instance of the game

        game.gameScreen = createGameScreen(); // call the createGameScreen function to attach gameScreen to index.html

        game.start();

        //End the game
        game.passGameOverCallback(function() {
            gameOver(game.score);
        });
    }

    function gameOver (score) {
        removeGameScreen();
        createGameOverScreen(score);
    }

    


    // initializing SplashScreen for first GameStart
    createSplashScreen();
}

window.addEventListener( 'load', main);     // load main function