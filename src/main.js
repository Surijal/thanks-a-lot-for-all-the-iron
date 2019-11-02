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
                    <span class="label"></span>
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

    // Funvtion GameOverScreen - placeholder to load, modifie comment after

    // Starting the Game
    function startGame() {
        removeSplashScreen(); // removing SplashScreen to load gameScreen after

        removeGameOverScreen(); // remove te GameOverScreen in case game is restartet from GameOverScreen

        game = new Game(); // creating new instance of the game

        game.gameScreen =createGameScreen(); // call the createGameScreen function to attach gameScreen to index.html

        
    }


    // initializing SplashScreen for first GameStart
    createSplashScreen();
}

window.addEventListener( 'load', main);     // load main function

