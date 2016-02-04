// Enemies our player must avoid
var enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //TODO - Added by Geo to establish starting location
    // Dependencies to consider.  Row starts on, grid start reference point.
    // enemy-bug.png is 101 x 171, note the enemy bug is actually smaller due to alpha background
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

    // TODO - finish this
    // The enemy will need to be centered between the rows and is a constant dy over dt
    // The enemy will need to move dy as a function of dt accross the columns
    if (this.x > 600) {
        this.x = -95;
    } else {
        this.x = this.x + (300 * dt);
    }


    console.log(dt);
    console.log(this.x);
    //this.y = this.y * (1 + dt);

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
//TODO - Temporary, to avoid errors.  Need to finish...
var enemyArray = [];
enemyArray[0] = new enemy;
// enemyArray[1] = new enemy;
// enemyArray[2] = new enemy;
var allEnemies = enemyArray;

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
