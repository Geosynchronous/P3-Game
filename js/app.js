// Most of the Code editing and creation for P3:Game happens here.
// TODO -- refactor functions to use less global variables

var velocity = 1,
    jitter = 0,
    enemyYstart = 63,
    enemyXstart = -95,
    updateScore = false,
    collision = false;

// Enemies our player must avoid
// PseudoClassical Class Definition Function used here
// Enemy is a constructor function(Capitalize first letter)
// velocity sets relative default speed of Enemy as global variable

var Enemy = function(velocity, jitter) {
    this.velocity = velocity;
    this.jitter = jitter;
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
    this.y = enemyYstart;

    // Rogue enemy, can move accross lanes when true
    this.rogue = false;
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
    var enemyxEnd = 600;

    if (this.x > enemyxEnd) {
        this.x = enemyXstart;
    } else {
        var constantScale = 100;
        var constantIncrement = (constantScale * this.velocity * dt);
        var variableScale = 10;
        var variableIncrement = (this.jitter * variableScale * Math.sin(this.x));

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

var offsetRow = 83;
var allEnemies = [];

// Instantiate Enemies as a function of LIFECYCLE (game level)
// Enemy(velocity, jitter)

var UpdateEnemyLevel = function(lifeCycle) {

    // Default Set Up
    // Three Enemies, Each on Seperate Row, Different Speeds, & Middle Enemy Jitters
    if(lifeCycle === 1) {
        allEnemies[0] = new Enemy(0.6, 0);
        allEnemies[1] = new Enemy(0.8, 1);
        allEnemies[1].y = 1 * offsetRow + enemyYstart;
        allEnemies[2] = new Enemy(1.0, 0);
        allEnemies[2].y = 2 * offsetRow + enemyYstart;
    }

    // Same as above lifecycle, except 3rd Enemy now infected with Jitter Virus
    if (lifeCycle === 2) {
        allEnemies[2] = new Enemy(1.0, 1);
        allEnemies[2].y = 2 * offsetRow + enemyYstart;
    }
        // allEnemies[3] = new Enemy(2.0 * Math.random(), 1);
        // allEnemies[3].y = 2 * offsetRow + enemyYstart;
        // allEnemies[3].rogue = true;


    // TODO - Use on progressive level
    // allEnemies[4] = new Enemy(0.33);
    // allEnemies[4].y = 3 * offsetRow + enemyYstart;
    // allEnemies[5] = new Enemy(0.11);
    // allEnemies[5].y = 4 * offsetRow + enemyYstart;


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