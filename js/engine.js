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

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        buttonPlay = false,
        buttonInfo = false,
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

// Mouse Click reveals if button is selected
// Basic Function with Returnsd Variables Definition used
    function handleMouseClick(evt) {

        buttonPlay = false,
        buttonInfo = false;
        x = evt.clientX - canvas.offsetLeft;
        y = evt.clientY - canvas.offsetTop;

        // Determines if mouse clicked on a button
        if ((x >= 7  && x<= 88) && (y >= 7 && y <= 35)) {
            buttonPlay = true;
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35)) {
            buttonInfo = true;
        }

        return buttonPlay, buttonInfo;
    }

    // Mouse click enevnt invokes handleMouseClick function
    canvas.addEventListener('click', handleMouseClick, false);


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
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

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
        // checkCollisions();
    }

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

        // console.log(buttonPlay);
        // console.log(buttonInfo);
    }

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

        // Places info and score board at top of game grid
        renderInfo();

        renderEntities();
    }

    // This function renders the Info and Score board at top of game grid
    // Optimally for game efficiency and frame rate, this does not need to be here
    // Just a good exercise in using Canvas, that is an intent of this project
    function renderInfo() {
        ScoreBoard();
        PlayButton1();
        InfoButton1();
        DisplayTitleShadow1();
        DisplayTitleShadow2();
        DisplayTitle();
    }

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

        player.render();
    }

    // Buttons and Scoreboard Image Functions
    // Good Exercise in using canvas to create images like buttons
    // All kinds of effects can created using JS for text, Jitter effect used here
    // Too much work, using HTML and CSS quicker, or a js library better
    // TODO - Need to highlight mouseover buttons... refactor everything probably

    // Displays current Game Level
    var ScoreBoard = function() {
        var my_gradientBoard = ctx.createLinearGradient(0, 0, 0, 50);
        my_gradientBoard.addColorStop(0, "#666666");
        my_gradientBoard.addColorStop(1, "#000");
        ctx.fillStyle = my_gradientBoard;
        ctx.fillRect(0, 0, 505, 47);
        ctx.fillStyle = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Level 1', 210, 10);
    }


    // Play Button allows user to start playing game when selected
    var PlayButton1 = function() {
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 70);
        my_gradient.addColorStop(0, "#cc0000");
        my_gradient.addColorStop(1, "#000");
        ctx.fillStyle  = '#e60000';
        ctx.fillRect(9, 8, 88, 33);
        ctx.fillStyle = my_gradient;
        ctx.fillRect(7, 7, 88, 33);
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('Play', 28, 12);
    }

    // Info Button when selected opens window of instructions and other info
    var InfoButton1 = function() {
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 70);
        my_gradient.addColorStop(0, "#cc0000");
        my_gradient.addColorStop(1, "#000");
        ctx.fillStyle  = '#e60000';
        ctx.fillRect(412, 8, 88, 33);
        ctx.fillStyle = my_gradient;
        ctx.fillRect(410, 7, 88, 33);
        ctx.fillStyle  = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('Info', 440, 12);
    }

    // Bottom Shadow Jitters with Trig fn
    var DisplayTitleShadow1 = function() {
        ctx.fillStyle  = '#000';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('J I T T E R B U G G I N G', 72 + 2 * Math.cos(Date.now()), 534 + 2 * Math.cos(Date.now()));
    }

    //  Middle Shadow Jitters with Trig fn
    var DisplayTitleShadow2 = function() {
        ctx.fillStyle  = '#cc0000';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('J I T T E R B U G G I N G', 70 + Math.sin(Date.now()), 529 + Math.cos(Date.now()));
    }

    // Title Jitters with Trig fn
        var DisplayTitle = function() {
        ctx.fillStyle  = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('J I T T E R B U G G I N G', 70 + Math.cos(Date.now()), 530);
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-cat-girl.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

})(this);
