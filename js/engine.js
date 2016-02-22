/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and Enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

 // This is way cool, an Immediately Invoked Function Expression (IIFE)
 // With it I am able to provide all gamefunctionality on the Canvas
 // All the methods in the other JS files feed into this
 // It is like an attactor site to coordinate all coding with
 // Once I got the hang of this, I started to luv the fluidity of designing in JS!!!

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        gamePlay = false,
        infoRender = false,
        lastTime,
        lifeCycle = 1,
        gameWon = false,
        ninja = false,
        playerScore = 0,
        playerX,
        playerY;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);



    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };






    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        UpdateEnemyLevel(lifeCycle);
        lastTime = Date.now();
        main();
    };






    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkHeartCapture();
        updateGameStats();
    };

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(Enemy) {
            Enemy.update(dt);
        });
        player.update();
    };

    // Updates Game Stats and States
    function updateGameStats() {

        // Update score when player reaches water
        if (updateScore) {
            playerScore = ++playerScore;
            player.reset();
            updateScore = false;
        }

        // Check if all 5 LIFECYCLES won
        if((playerScore === 10) && (lifeCycle === 5)) {
            ninja = true;

        // Check for Game Won and set to start a new game LIFECYCLE
        } else if (playerScore === 10) {
            gameWon = true;
            playerScore =0;
            lifeCycle = ++lifeCycle;
            UpdateEnemyLevel(lifeCycle);
        }
    };






    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {

        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        // Renders Everything else needed for game
        renderScoreboard();
        renderBonusItems();
        renderEntities();
        renderInfo();
        renderGameOver();
        renderHeartCapture();
        renderWonGame();
        renderNinja();
        TitleRender();
    };






    // This function renders Scoreboard at top of game grid
    // Optimally for game efficiency and frame rate, this does not need to be here
    // Just a good exercise in using Canvas, that is an intent of this project
    function renderScoreboard() {
        ScoreBoardRender();
        LifeCycleRender(lifeCycle);
        CheckScore();
    };

    // renders Bonus Items (Can enable more powees for the player)
    function renderBonusItems() {
        if ((lifeCycle >= 4) && (heartCapture) <= 1) {
            HeartRender();
        }
    };

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your Enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(Enemy) {
            Enemy.render();
        });

        // Renders player only if in Gaming Mode and no messages displayed
        if (gamePlay && !collision && !gameWon && heartCapture !== 1) {
            player.render();
        }
    };

    //This function renders info about the game if the info button was clicked on
    //TODO as if statement for specific level windows
    function renderInfo() {
        if (infoRender) {
            InfoWindowRender();
            doneButton.render();
        }
    };

    //This function renders info about the game if the info button was clicked on
    //TODO as if statement for specific level windows
    function renderGameOver() {
        if (collision) {
            GameOverWindowRender();
            nextButton.render();
        }
    };

    function renderHeartCapture() {
        if (heartCapture === 1) {
            HeartCaptureWindowRender();
            backButton.render();
        }
    };

    function renderWonGame() {
        if (gameWon) {
            WonGameWindowRender();
            backButton.render();
        }
    };

    function renderNinja() {
        if (ninja) {
            NinjaWindowRender();
            resetButton.render();
        }
    };






    // Check to see if Score needs to be rendeered on Socreboard
    var CheckScore = function() {
        if (gamePlay) {
            ScoreRender(playerScore);
            resetButton.render();
        } else if (!infoRender) {
            CheckInfo();
        }
    };

    // Check to see if Info needs to be rendeered on Socreboard
    var CheckInfo = function() {
        if (!infoRender) {
                playButton.render();
                infoButton.render();

        }
    };


    // Check for Enemy and Player collision
    // Check coordinate ranges for overlap
    function checkCollisions() {
        if (gamePlay) {
            allEnemies.forEach(function(Enemy) {
                Enemy.collide();
            });
        }
    };

    // Check to see if heart is captured
    function checkHeartCapture() {
        if (lifeCycle >= 4) {
            playerHeartCapture();
        }
    };






    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */

     // Reset fn now will set game engine to start in initial state
    function reset() {
        gamePlay = false;
        infoRender = false;
        playerScore = 0;
        collision = false;
        heartCapture = 0;
        gameWon = false;
        ninja = false;
    };






    // Mouse Click reveals if a button is selected
    // Basic Function with Returnsd Variables Definition used
    // TODO --- UGLY CODE - Refactor this logic to simplify
    function handleMouseClick(evt) {

        x = evt.clientX - canvas.offsetLeft;
        y = evt.clientY - canvas.offsetTop;

        // Determines if mouse clicked on a button

        // Play Button Clicked
        // Resets player to start position
        // gamePlay = true enables player to start playing
        if ((x >= 7  && x<= 88) && (y >= 7 && y <= 35) && (!infoRender)) {
            gamePlay = true;
            player.reset();

        // Back Button Clicked
        // Handles exit from Ninja Window Message
        // Ready to start again with LIFECYCLE 1 and an an empty Enemies Array
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35) && (ninja)) {
            allEnemies = [];
            lifeCycle = 1;
            init();

        // Back Button Clicked
        // Handles exit from Game Won Message
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35) && (gameWon)) {
            reset();

        // Back Button Clicked
        // Handles exit from Heart Captured Message
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35) && (heartCapture === 1)) {
            heartCapture = 2;
            console.log(heartCapture);

        // Info Button Clicked
        // Handles allows render of InfoWindow
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35) && (!gamePlay) && (!infoRender)) {
            infoRender = true;

        // Reset Button Clicked
        // Starts game engine from the initial start state
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35) && (gamePlay)) {
            reset();

        // Done Button Clicked
        // Handles exit from Info Message Window about HOW TO PLAY GAME
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35) && (infoRender)) {
            infoRender = false;
        }

        return gamePlay, infoRender;
    };

    // Mouse click enevnt invokes handleMouseClick function
    // Used to determine if Buttons (Play etc) are clicked on
    canvas.addEventListener('click', handleMouseClick, false);






    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-cat-girl.png',
        'images/heart.png',
        'images/star.png'
    ]);

    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

})(this);



