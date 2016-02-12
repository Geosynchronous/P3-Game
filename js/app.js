// Most of the Code editing and creation for P3:Game happens here.
// Enemies our player must avoid
// PseudoClassical Class Definition Function used here
// Enemy is a constructor function(Capitalize first letter)
// velocity sets relative default speed of Enemy as global variable
var velocity = 1,
    enemyYstart = 63,
    enemyXstart = -95;

var Enemy = function(velocity) {
    this.velocity = velocity;
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
        // rogueUpdown = -1;


    if (this.x > enemyxEnd) {
        this.x = enemyXstart;
    } else {
        var constantScale = 100;
        var constantIncrement = (constantScale * this.velocity * dt);
        var variableScale = 10;
        var variableIncrement = variableScale * Math.sin(this.x);

        this.x = this.x + constantIncrement + variableIncrement;


        // Checks if enemy is a rogue, if so it can move accross lanes
        if ((this.rogue === true && this.y < 250) && (this.rogue === true && this.y > 50)){
            this.y = this.y - 0.2 * this.ySign;
            // console.log(this.y);
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Our Player must avoid enemy
// PseudoClassical Class Definition Function used here
// Player is a constructor function(Capitalize first letter)

var Player = function() {
    // Establish position starting point
    // char-cat-girl.png is 101 x 171, Player visual is actually smaller due to alpha background
    var playerYstart = 380,
        playerXstart = 203;

    this.x = playerXstart;
    this.y = playerYstart;

    // The image/sprite for our Player this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';


};

// Update Player location
Player.prototype.update = function(dt) {
//player handle input keys here with logic to move player in proper direction.
//Movement constrained within displayed game grid (1 - 400)
    Player.prototype.handleInput = function(keyup) {
        var playerIncrement = 15,
            topLimit = 1,
            leftLimit = 1,
            bottomLimit = 400,
            rightLimit = 400;

        if(keyup === 'up' && this.y > topLimit) {
            this.y = this.y - playerIncrement;
        } else if (keyup === 'down' && this.y < bottomLimit) {
            this.y = this.y + playerIncrement;
        } else if (keyup === 'right' && this.x < rightLimit) {
            this.x = this.x + playerIncrement;
        } else if (keyup === 'left' && this.x > leftLimit) {
            this.x = this.x - playerIncrement;
        }
        console.log(this.x, this.y);
    };
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.x,this.y);
};

// Now instantiate your objects.
// Place all Enemy objects in an array called allEnemies
// Individual velocity parameters passed to various enemies.
// Row offset passed into y values for row centering
// allEnemies is global array, and allEnemy[] elements have Enemy prototype
var offsetRow = 83;

var allEnemies = [];
allEnemies[0] = new Enemy(0.6);
allEnemies[1] = new Enemy(1.0);
allEnemies[1].y = 1 * offsetRow + enemyYstart;
allEnemies[2] = new Enemy(1.4);
allEnemies[2].y = 2 * offsetRow + enemyYstart;
allEnemies[3] = new Enemy(2.0 * Math.random());
allEnemies[3].y = 2 * offsetRow + enemyYstart;
allEnemies[3].rogue = true;
// TODO - Use on progressive level
// allEnemies[4] = new Enemy(0.33);
// allEnemies[4].y = 3 * offsetRow + enemyYstart;
// allEnemies[5] = new Enemy(0.11);
// allEnemies[5].y = 4 * offsetRow + enemyYstart;


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





