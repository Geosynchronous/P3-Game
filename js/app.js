
"use strict";

// Function Defintions used in engine.js

// Most of the Code editing and creation for P3:Game happens here.

// TODO -- refactor functions to use less global varibles
// Tried hard to eliminate... missing something here
// How best to include these variables in function Engine?
// Will keep them for now, so I can finish the game by deadline
// Definately could use some coaching here...

var updateScore = false,
    collision = false,
    heartCapture = 0;



// Enemies our player must avoid
// PseudoClassical Class Definition Function used here
// Enemy is a constructor function(Capitalize first letter)
// velocity sets relative default speed of Enemy as global variable

var Enemy = function(velocity, jitter, rogue, row, random) {

    var ENEMY_Y_OFFSET = 83,
        ENEMY_X_END = 600,
        ENEMY_Y_START = 63,
        ENEMY_X_START = -95;


    this.ENEMY_X_END = ENEMY_X_END;
    this.ENEMY_X_START = ENEMY_X_START;

    // Sets the initial relative velocity of the Enemy Bug (0.0 - 10.0)
    // (Could also be negative values to move the bugs backwards)
    this.velocity = velocity;
    //Causes the Enemy Bug to have a jittery motion
    this.jitter = jitter;

    // Definately could use some coaching here...
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
    this.x = ENEMY_X_START;
    this.y = this.row * ENEMY_Y_OFFSET + ENEMY_Y_START;

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


    if (this.x >= this.ENEMY_X_END) {
        this.x = this.ENEMY_X_START;
    }

    var CONSTANT_SCALE = 100;
    var constantXincrement = (CONSTANT_SCALE * this.velocity * dt);
    var JITTER_SCALE = 10;
    var jitterXincrement = (JITTER_SCALE * Math.sin(this.x));

    if (!this.jitter) {
        jitterXincrement = 0;
    }

    // Randomly alters the enemy velocity when true
    if (this.random) {
        constantXincrement = constantXincrement * (1 - Math.random());
    }

    // Updates x position of enemy (along the lenght of the visible row)
    this.x = this.x + constantXincrement + jitterXincrement;


    // Checks if enemy is a rogue, if so it can move accross lanes
    if ((this.rogue === true && this.y < 250) && (this.rogue === true && this.y > 50)) {
        this.y = this.y - 0.2 * this.ySign;
    } else if (this.rogue === true && this.y <= 50) {
        this.ySign = this.ySign * (-1);
        this.y = 55;
    } else if (this.rogue === true && this.y >= 250) {
        this.ySign = this.ySign * (-1);
        this.y = 245;
    }
};

// Draw the Enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Needed fof checkCollision fn
Enemy.prototype.collide = function() {
    // Comparative PLAYER and Enemy dimensional range parameters declared
    // Approx visible rectangle of object image for crossection overlap used
    // Variables offset with numerical adjustment
    // 3D effect makes PLAYER visual base the crosssection, and it is about 35 x 35
    // ENEMY crossection is about 100 x 67
    // Total image size including transparent space is 101 x 171
    var pLeftX = player.x + 33,
        pRightX = pLeftX + 35,
        eLeftX = this.x,
        eRightX = eLeftX + 100,
        pTopY = player.y + 115,
        pBottomY = pTopY + 35,
        eTopY = this.y + 70,
        eBottomY = eTopY + 67;

    //Compare X and Y ranges for overlap using continuity principle
    if ((pLeftX >= eLeftX && pLeftX <= eRightX) && (pTopY >= eTopY && pTopY <= eBottomY)) {
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
    var PLAYER_Y_START = 380,
        PLAYER_X_START = 203;

    this.PLAYER_Y_START = PLAYER_Y_START;
    this.PLAYER_X_START = PLAYER_X_START;

    this.x = PLAYER_X_START;
    this.y = PLAYER_Y_START;

    // The image/sprite for our Player this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.reset = function() {
    this.x = this.PLAYER_X_START;
    this.y = this.PLAYER_Y_START;
};

// Update Player location
Player.prototype.update = function() {

    //player handle input keys here with logic to move player in proper direction.
    //Movement constrained within displayed game grid (1 - 400, 0 - 380)
    Player.prototype.handleInput = function(keyup) {
        // Captured Heart makes Player faster (bigger steps)
        var playerIncrement = 15 + heartCapture * 10,
            TOP_LIMIT = 0,
            LEFT_LIMIT = 1,
            BOTTOM_LIMIT = 380,
            RIGHT_LIMIT = 400;

        if (keyup === 'up' && this.y >= TOP_LIMIT) {
            this.y = this.y - playerIncrement;
        } else if (keyup === 'down' && this.y <= BOTTOM_LIMIT) {
            this.y = this.y + playerIncrement;
        } else if (keyup === 'right' && this.x <= RIGHT_LIMIT) {
            this.x = this.x + playerIncrement;
        } else if (keyup === 'left' && this.x >= LEFT_LIMIT) {
            this.x = this.x - playerIncrement;
        }

        // Check to see if PLAYER is in the WATER
        if (this.y <= 5) {
            updateScore = true;
        }
        // console.log(this.x, this.y, updateScore);
    };
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.heartCapture = function() {
    // Comparative PLAYER and Enemy dimensional range parameters declared
    // Approx visible rectangle of object image for crossection overlap used
    // Variables offset with numerical adjustment
    // 3D effect makes PLAYER visual base the crosssection, and it is about 35 x 35
    // ENEMY crossection is about 100 x 67
    // Total image size including transparent space is 101 x 171
    var pLeftX = player.x + 33,
        pRightX = pLeftX + 35,
        heartLeftX = 201,
        heartRightX = heartLeftX + 100,
        pTopY = player.y + 115,
        pBottomY = pTopY + 35,
        heartTopY = 165,
        heartBottomY = heartTopY + 100;

    //Compare X and Y ranges for overlap using continuity principle
    if ((heartCapture < 2) && (pLeftX >= heartLeftX && pLeftX <= heartRightX) && (pTopY >= heartTopY && pTopY <= heartBottomY)) {
        heartCapture = 1;
        this.reset();
    }
};

// Renders Heart in middle of stone rows
var HeartRender = function() {
    ctx.drawImage(Resources.get('images/heart.png'), 201, 165);
};


// Now instantiate your objects.
// Place all Enemy objects in an array called allEnemies
// Individual velocity parameters passed to various enemies.
// Row offset passed into y values for row centering
// allEnemies is global array, and allEnemy[] elements have Enemy prototype


var allEnemies = [];

// Create Enemies as needed in each LIFECYCLE
// Enemies created are available in all LIFECYCELS that follow
// Enemy behaviours can be updated to new attributes in succesive LIRECYCLES
var UpdateEnemyLevel = function(lifeCycle) {

    switch (lifeCycle) {
        // New allEnemies instances as needed as a function of LIFECYCLE (game level)
        //Give Enemies their behavioural attributes based on array index (enemy element)
        // Enemy(velocity, jitter, rogue, row, random)

        // First Three Enemies Instances
        // Each on Seperate Row, Different Speeds, & Middle Enemy Jitters
        case 1:
            allEnemies[allEnemies.length] = new Enemy(0.6, false, false, 0, false);
            allEnemies[allEnemies.length] = new Enemy(0.8, true, false, 1, false);
            allEnemies[allEnemies.length] = new Enemy(1.0, false, false, 2, false);
            break;

            // Same as above lifecycle, except 3rd Enemy also infected with Jitter Virus
            // No new allEnemies instances, just update jitter parameter value
        case 2:
            allEnemies[2].jitter = true;
            break;

            // Same as above lifecycle, now all three Enemy Bugs Jitter
            // No new allEnemies instances, just update jitter parameter value
        case 3:
            allEnemies[0].jitter = true;
            break;

            // Add Rogue Enemy Bug, that can drift between all rows
            // Also has a random range of speeds invoked for a game
            // Two new allEnemies instance put into the Game
        case 4:
            allEnemies[allEnemies.length] = new Enemy(2.0, true, true, 2, false);
            break;

            //  Add 2 more instantiated enemies with random velocities that change rows
        case 5:
            allEnemies[allEnemies.length] = new Enemy(1.0, true, true, 0, true);
            allEnemies[allEnemies.length] = new Enemy(2.0, true, true, 2, true);
            break;
    }
};

// Place the player object in a variable called player
var player = new Player();




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