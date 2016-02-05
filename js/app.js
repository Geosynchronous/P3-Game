// Enemies our player must avoid
// PseudoClassical Class Definition Function used here
// velocity sets relative default speed of enemy as global variable
var velocity = 1;
var enemy = function(velocity) {
    this.velocity = velocity;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Establish position starting point
    // enemy-bug.png is 101 x 171, enemy visual is actually smaller due to alpha background
    // x = 0, y = 63 perfectly centers enemy on first ronw first square tile
    // x = -95 offsets most bug off canvas with only a little nose showing
    // this is a good place to start for the first enemy on first brick row
    // TODO - refactor for multiple rows and multiple bugs
    this.x = -95;
    this.y = 63;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Sets Boundaries for start and end of Enemy travel.
    // Incremenmts movement of enemy within boundaries.
    // Increment relative velocity set for each enemy as passed parameter.
    // dt sets relatively stable time increment value on all computers.
    //
    if (this.x > 600) {
        this.x = -95;
    } else {
        this.x = this.x + (300 * this.velocity * dt);
    }
};

// Draw the enemy on the screen, required method for game
enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Individual velocity parameters passed to various enemies.
// Row offset passed into y values for row centering
// allEnemies is global array, and allEnemy[] elements have enemy prototype
var allEnemies = [];
allEnemies[0] = new enemy(0.5);
allEnemies[1] = new enemy(1.3);
allEnemies[1].y = 147;
allEnemies[2] = new enemy(1.7);
allEnemies[2].y = 233;
allEnemies[3] = new enemy(Math.random() * 2);


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
