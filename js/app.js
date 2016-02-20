// Most of the Code editing and creation for P3:Game happens here.

// TODO -- refactor functions to use less global varibles
// Tried hard to eliminate... missing something here
// Scope? Hoisting?
// Will keep them for now, so I can finish the game

var updateScore = false,
    collision = false;

// Enemies our player must avoid
// PseudoClassical Class Definition Function used here
// Enemy is a constructor function(Capitalize first letter)
// velocity sets relative default speed of Enemy as global variable

var Enemy = function(velocity, jitter, rogue, row, random) {
    var rowOffset = 83,
        enemyXend = 600;
        enemyYstart = 63,
        enemyXstart = -95;


    this.enemyXend = enemyXend;
    this.enemyXstart = enemyXstart;

    // Sets the initial relative velocity of the Enemy Bug (0.0 - 10.0)
    // (Could also be negative values to move the bugs backwards)
    this.velocity = velocity;
    //Causes the Enemy Bug to have a jittery motion
    this.jitter = jitter;

    // Rogue enemy, can move accross lanes when true
    this.rogue = rogue;

    // Row assignment for the Enemy is an integer 0,1,2 (three rows)
    // (More rows could be added, for instance moving down to grass 3,4)
    this.row = row;

    // Cause a random velocity to be invoked when true
    this.random = random;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Establish position starting point
    // Enemy-bug.png is 101 x 171, Enemy visual is actually smaller due to alpha background
    // x = 0, y = 63 perfectly centers Enemy on first ronw first square tile
    // x = -95 offsets most bug off canvas with only a little nose showing
    this.x = enemyXstart;
    this.y = this.row * rowOffset + enemyYstart;

    // ySign can be positive or negative to set enemy lane change direction
    this.ySign = 1;
};

// Update the Enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Sets Boundaries for start and end of Enemy travel.
    // Top left corner is origin for Enemy sprite.
    // Incremenmts movement of Enemy within boundaries.
    // Increment relative velocity set for each Enemy element as passed parameter.
    // dt sets relatively constant time increment value on all computers.
    // "Jitterbug" (variable velocity) effect added with weighted sine & cosine fn


    if (this.x > this.enemyXend) {
        this.x = this.enemyXstart;
    } else {
        var constantScale = 100;
        var constantIncrement = (constantScale * this.velocity * dt);
        var variableScale = 10;
        var variableIncrement = (variableScale * Math.sin(this.x));

        if (this.random) {
            this.velocity = Math.random() * this.velocity;
        }

        if (!this.jitter){
            variableIncrement = 0;
        }


        this.x = this.x + constantIncrement + variableIncrement;


        // Checks if enemy is a rogue, if so it can move accross lanes
        if ((this.rogue === true && this.y < 250) && (this.rogue === true && this.y > 50)){
            this.y = this.y - 0.2 * this.ySign;
        } else if (this.rogue === true && this.y <= 50) {
            this.ySign = this.ySign * (-1);
            this.y = 55;
        } else if (this.rogue === true && this.y >= 250) {
            this.ySign = this.ySign * (-1);
            this.y = 245;
        }
    }
};

// Draw the Enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Needed fof checkCollision fn
Enemy.prototype.collide = function() {
    player.loc();
// Comparative PLAYER and Enemy dimensional range parameters declared
// Approx visible rectangle of object image for crossection overlap used
// Variables offset with numerical adjustment
// 3D effect makes PLAYER visual base the crosssection, and it is about 35 x 35
// ENEMY crossection is about 100 x 67
// Total image size including transparent space is 101 x 171
    var pLeftX = playerX + 33,
        pRightX = pLeftX + 35,
        eLeftX = this.x,
        eRightX = eLeftX + 100,
        pTopY = playerY + 115,
        pBottomY = pTopY + 35,
        eTopY = this.y + 77,
        eBottomY = eTopY + 67;

    //Compare X and Y ranges for overlap using continuity principle
    if ((pLeftX  >= eLeftX && pLeftX <= eRightX)  &&  (pTopY  >= eTopY && pTopY <= eBottomY)) {
        collision = true;
        player.reset();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//
// Our Player must avoid enemy
// PseudoClassical Class Definition Function used here
// Player is a constructor function(Capitalize first letter)
var Player = function() {
    // Establish position starting point
    // char-cat-girl.png is 101 x 171, Player visual is actually smaller due to alpha background
    var Ystart = 380,
        Xstart = 203;
    this.Ystart = Ystart;
    this.Xstart = Xstart;
    this.x = Xstart;
    this.y = Ystart;

    // The image/sprite for our Player this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.reset = function() {
    this.x = this.Xstart;
    this.y = this.Ystart;
};

// Update Player location
Player.prototype.update = function() {

    //player handle input keys here with logic to move player in proper direction.
    //Movement constrained within displayed game grid (1 - 400)
    Player.prototype.handleInput = function(keyup) {
        var playerIncrement = 15,
            topLimit = 0,
            leftLimit = 1,
            bottomLimit = 380,
            rightLimit = 400;

        if (keyup === 'up' && this.y > topLimit) {
            this.y = this.y - playerIncrement;
        } else if (keyup === 'down' && this.y < bottomLimit) {
            this.y = this.y + playerIncrement;
        } else if (keyup === 'right' && this.x < rightLimit) {
            this.x = this.x + playerIncrement;
        } else if (keyup === 'left' && this.x > leftLimit) {
            this.x = this.x - playerIncrement;
        }

        // Check to see if PLAYER is in the WATER
        if (this.y <= 5 ) {
            updateScore = true;
        }
        console.log(this.x, this.y, updateScore);
    };
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.loc = function() {
    playerX = this.x;
    playerY = this.y;

    return playerX, playerY;
};








// Now instantiate your objects.
// Place all Enemy objects in an array called allEnemies
// Individual velocity parameters passed to various enemies.
// Row offset passed into y values for row centering
// allEnemies is global array, and allEnemy[] elements have Enemy prototype


var allEnemies = [];

// Instantiate Enemies as a function of LIFECYCLE (game level)
// Enemy(velocity, jitter, rogue, row, random)

var UpdateEnemyLevel = function(lifeCycle) {

    switch(lifeCycle) {
        // Default Set Up
        // Three Enemies Instantiated
        // Each on Seperate Row, Different Speeds, & Middle Enemy Jitters
        case 1:
            allEnemies[allEnemies.length] = new Enemy(0.6, false, false, 0, false);
            allEnemies[allEnemies.length] = new Enemy(0.8, true, false, 1, false);
            allEnemies[allEnemies.length] = new Enemy(1.0, false, false, 2, false);
            break;

        // Same as above lifecycle, except 3rd Enemy also infected with Jitter Virus
        // No instantiation, just update jitter parameter value
        case 2:
            allEnemies[2].jitter = true;
            break;

        // Same as above lifecycle, now all three Enemy Bugs Jitter
        // No instantiation, just update jitter parameter value
        case 3:
            allEnemies[0].jitter = true;
            break;
        // Rogue Enemy Bug, that can drift between all rows
        // Also has a random range of speeds invoked for a game
        // Instantiate another Enemy into the Game
        case 4:
            allEnemies[allEnemies.length] = new Enemy(2.0, true, true, 2, false);
            break;

    // Math.random()

        // TODO - Use on progressive level
        // allEnemies[4] = new Enemy(0.33);
        // allEnemies[4].y = 3 * offsetRow + enemyYstart;
        // allEnemies[5] = new Enemy(0.11);
        // allEnemies[5].y = 4 * offsetRow + enemyYstart;


    };
};

// Place the player object in a variable called player
var player = new Player;






// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});