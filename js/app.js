// Most of the Code editing and creation for P3:Game happens here.
// Enemies our player must avoid
// PseudoClassical Class Definition Function used here
// Enemy is a constructor function(Capitalize first letter)
// velocity sets relative default speed of Enemy as global variable
var velocity = 1;
var enemyYstart = 63;
var enemyXstart = -95;

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
    // this is a good place to start for the first Enemy on first brick row
    // TODO - refactor for multiple rows and multiple bugs
    this.x = enemyXstart;
    this.y = enemyYstart;
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
    // "Jitterbug" (variable velocity) effect added with weighted sine fn
    var xEnd = 600;

    if (this.x > xEnd) {
        this.x = enemyXstart;
    } else {
        var constantScale = 300;
        var constantIncrement = (constantScale * this.velocity * dt);
        var variableScale = 10;
        var variableIncrement = variableScale * Math.sin(this.x);

        this.x = this.x + constantIncrement + variableIncrement;
    }
};

// Draw the Enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all Enemy objects in an array called allEnemies
// Individual velocity parameters passed to various enemies.
// Row offset passed into y values for row centering
// allEnemies is global array, and allEnemy[] elements have Enemy prototype
var offsetRow = 85;

var allEnemies = [];
allEnemies[0] = new Enemy(0.5);
allEnemies[1] = new Enemy(1);
allEnemies[1].y = 1 * offsetRow + enemyYstart;
allEnemies[2] = new Enemy(1.4);
allEnemies[2].y = 2 * offsetRow + enemyYstart;
allEnemies[3] = new Enemy(Math.random() * 2);
allEnemies[4] = new Enemy(0.33);
allEnemies[4].y = 3 * offsetRow + enemyYstart;
allEnemies[5] = new Enemy(0.11);
allEnemies[5].y = 4 * offsetRow + enemyYstart;


// Place the player object in a variable called player



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
