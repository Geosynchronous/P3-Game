
"use strict";

// by George Fischer
// JITTER BUG GAME - app.js file
// Deciphers Keyboard Input (Arrow Keys) for player movement
// Function Defintions used in engine.js
// These functions handle the behaviour of Game Elements:
//      Enemy (bugs), a Player, and a Heart (Bonus Capture Item)

var updateScore = false,
    collision = false,
    heartCapture = 0;

// TODO - Add Pseudoclassical Inheritiance
//          Prototype inheritance already used
//          Constructore inheritance needs to be applied
    //          Create supertype class GamingObjects
    //          Make Enemy, Player, Heart class subthpes

// Enemies our player must avoid
// Function Input parameters modify Enemy bug behaviour
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
    //Causes the Enemy Bug to have a jittery motion (true, false)
    this.jitter = jitter;

    // Rogue enemy, can move accross lanes (true,false)
    this.rogue = rogue;

    // Row assignment for three rows the Enemy is an integer (0,1,2)
    // These are the stone imaged rows
    // (More rows could be added, for instance moving down to grass 3,4)
    this.row = row;

    // Cause a random velocity to be invoked (true,false)
    this.random = random;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Establish position starting point
    // Enemy-bug.png is 101 x 171
    // Enemy visual is actually smaller due to alpha background
    this.x = ENEMY_X_START;
    this.y = this.row * ENEMY_Y_OFFSET + ENEMY_Y_START;

    // ySign set enemy lane change direction (+1,-1)
    this.ySign = 1;
};

// Update the Enemy's position method
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply by dt parameter to normalize speed to clock time
    // Avoids issues with different CPU speeds
    //
    // Sets Boundaries for start and end of Enemy travel.
    // Top left corner is origin for all sprites (i.e. Enemy image)
    // Incremenmts movement of Enemy within boundaries.
    // Increment relative velocity set for each Enemy element as passed parameters.
    // "Jitterbug" (variable velocity) effect added with weighted sine & cosine fn

    // Restart Enemy beginning location if beyond end of stone paths (left edge)
    if (this.x >= this.ENEMY_X_END) {
        this.x = this.ENEMY_X_START;
    }

    var CONSTANT_SCALE = 100;
    var constantXincrement = (CONSTANT_SCALE * this.velocity * dt);
    var JITTER_SCALE = 10;
    var jitterXincrement = (JITTER_SCALE * Math.sin(this.x));

    // Allows no JITTER BUG effect on specified Enemy element (jitter = false)
    if (!this.jitter) {
        jitterXincrement = 0;
    }

    // Randomly alters the enemy velocity when true
    if (this.random) {
        constantXincrement = constantXincrement * (1 - Math.random());
    }

    // Updates x position of enemy (along the length of the visible stone row)
    this.x = this.x + constantXincrement + jitterXincrement;


    // Checks if enemy is a rogue, if so it can move accross lane
    // Stays within Upper and Lower Boundaries
    // Changes directions when Upper/Lower Boundary encountered
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

// Draw the Enemy on the screen method
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks to see if an Enemy element collides with the single player
// Needed for checkCollision fn in Engine.js
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

    // Compare X and Y ranges for overlap using continuity principle
    //      (Collision true will bring up a Message about event)
    //      (Player position is reset, for start game over after collision)
    if ((pLeftX >= eLeftX && pLeftX <= eRightX) && (pTopY >= eTopY && pTopY <= eBottomY)) {
        collision = true;
        player.reset();
    }
};





// Our Player must avoid enemy
var Player = function() {
    // Establish position starting point
    // char-cat-girl.png is 101 x 171
    // Player visual is actually smaller due to alpha background
    var PLAYER_Y_START = 380,
        PLAYER_X_START = 203;

    this.PLAYER_Y_START = PLAYER_Y_START;
    this.PLAYER_X_START = PLAYER_X_START;

    this.x = PLAYER_X_START;
    this.y = PLAYER_Y_START;

    // The image/sprite for our Player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
};


// Resets the player to the starting position on the grass
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
    };
};

// Draw the Player on the screen method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Checks to see if the player captures the heart
// This will allow the play to move with bigger steps (move faster)
Player.prototype.heartCapture = function() {
    // Comparative PLAYER and Enemy dimensional range parameters declared
    // Approx visible rectangle of object image for crossection overlap used
    // Variables offset with numerical adjustment
    // 3D effect makes PLAYER visual base the crosssection, and it is about 35 x 35
    // ENEMY crossection is about 100 x 67
    // Total image size including transparent space is 101 x 171
    var pLeftX = this.x + 33,
        pRightX = pLeftX + 35,
        heartLeftX = 201,
        heartRightX = heartLeftX + 100,
        pTopY = this.y + 115,
        pBottomY = pTopY + 35,
        heartTopY = 165,
        heartBottomY = heartTopY + 100;

    // Compare X and Y ranges for overlap using continuity principle
    // Heart can only be captured once per enabled game
    // heartCapture states:
    //      0 - Default, allows heart to be displayed
    //      1 - Heart Captured, allows player to move faster
    //      2 - Heart Already Capured, heart not displayed for capture
    if ((heartCapture < 2) && (pLeftX >= heartLeftX && pLeftX <= heartRightX) && (pTopY >= heartTopY && pTopY <= heartBottomY)) {
        heartCapture = 1;
        this.reset();
    }
};

// Renders Heart in middle of stone rows
var HeartRender = function() {
    ctx.drawImage(Resources.get('images/heart.png'), 201, 165);
};



// Place all Enemy objects in an array called allEnemies
// Individual behaviour parameters passed to various enemies.
// allEnemies is global array, and allEnemy[] elements have Enemy prototype


var allEnemies = [];

// Create Enemies as needed in each LIFECYCLE
// Enemies created are available in all LIFECYCLES that follow
// Enemy behaviours can be updated to new attributes in succesive LIFECYCLES
var UpdateEnemyLevel = function(lifeCycle) {

    // New allEnemies instances as needed as a function of LIFECYCLE (game level)
    // Give Enemies their behavioural attributes based on array index (enemy element)
    // Enemy(velocity, jitter, rogue, row, random)
    switch (lifeCycle) {

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

// Place the Player object in a variable called player
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