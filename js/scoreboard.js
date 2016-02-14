
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
        ctx.fillText('Level 1', 212, 10);
    }

    // Displays Info Window
    // Canvas is not well equipe for paragraphs and line breaks!!!
    // Brute Force multiline fillText used here
    // TODO--- HTML & CSS or a JS Library are the way to go?
    var InfoWindow = function() {
        var my_gradientBoard = ctx.createLinearGradient(0, 0, 0, 300);
        my_gradientBoard.addColorStop(0, "transparent");
        my_gradientBoard.addColorStop(1, "rgba(0, 0, 0, 0.7");
        ctx.fillStyle = my_gradientBoard;
        ctx.fillRect(0, 50, 505, 460);


        ctx.fillStyle = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('INFO', 20, 70);
        ctx.font = 'bold 18px sans-serif';

        ctx.fillText('When the PLAY button is clicked, a PLAYER appears', 20, 110);
        ctx.fillText('on the grass.  Pressing the arrow keys on keyboard', 20, 130);
        ctx.fillText('moves the PLAYER a step in the direction of the key.', 20, 150);

        ctx.fillText('A point is scored if the PLAYER can get to the water.', 20, 190);
        ctx.fillText('If a PLAYER hits a BUG, the GAME IS OVER and all', 20, 210);
        ctx.fillText('the points won will be lost.', 20, 230);

        ctx.fillText('When PLAYER scores 10 points they win the GAME!', 20, 270);
        ctx.fillText('Winning a GAME starts the next LEVEL. It is then', 20, 290);
        ctx.fillText('up to the PLAYER to figure things out.', 20, 310);

        ctx.fillText('There are five increasingly difficult LEVELS to win', 20, 350);
        ctx.fillText('to become a JEDI JITTERBUGGING MASTER.', 20, 370);

        ctx.fillStyle = '#cc0000';
        ctx.fillText('WARNING: These bugs are experiencing an epidemic', 20, 410);
        ctx.fillText('of a once thought to be extinct JITTER VIRUS that is', 20, 430);
        ctx.fillText('rapidly evolving mysterious strange behaviours.', 20, 450);
    }

    // Play Button allows user to start playing game when selected
    var PlayButton1 = function() {
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 70);
        my_gradient.addColorStop(0, "#cc0000");
        my_gradient.addColorStop(1, "#000");
        ctx.fillStyle  = '#936c6c';
        ctx.fillRect(9, 8, 87, 33);
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
        ctx.fillStyle  = '#936c6c';
        ctx.fillRect(412, 8, 87, 33);
        ctx.fillStyle = my_gradient;
        ctx.fillRect(410, 7, 88, 33);
        ctx.fillStyle  = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('Info', 440, 12);
    }

    // Reset Button when selected restarts game engine at Level 1
    var ResetButton = function() {
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 70);
        my_gradient.addColorStop(0, "#cc0000");
        my_gradient.addColorStop(1, "#000");
        ctx.fillStyle  = '#936c6c';
        ctx.fillRect(412, 8, 87, 33);
        ctx.fillStyle = my_gradient;
        ctx.fillRect(410, 7, 88, 33);
        ctx.fillStyle  = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('Reset', 430, 12);
    }

    // // Done Button, displayed in Infowindow, click returns to previous state
    // var DoneButton = function() {
    //     var my_gradient = ctx.createLinearGradient(0, 0, 0, 70);
    //     my_gradient.addColorStop(0, "#cc0000");
    //     my_gradient.addColorStop(1, "#000");
    //     ctx.fillStyle  = '#936c6c';
    //     ctx.fillRect(412, 400, 87, 33);
    //     ctx.fillStyle = my_gradient;
    //     ctx.fillRect(410, 400, 88, 33);
    //     ctx.fillStyle  = '#fff';
    //     ctx.textBaseline = 'top';
    //     ctx.font = 'bold 20px sans-serif';
    //     ctx.fillText('Done', 440, 412);
    // }

        // Info Button when selected opens window of instructions and other info
    var DoneButton = function() {
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 70);
        my_gradient.addColorStop(0, "#cc0000");
        my_gradient.addColorStop(1, "#000");
        ctx.fillStyle  = '#936c6c';
        ctx.fillRect(412, 8, 87, 33);
        ctx.fillStyle = my_gradient;
        ctx.fillRect(410, 7, 88, 33);
        ctx.fillStyle  = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('Done', 430, 12);
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
        ctx.fillStyle  = '#fff';
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

    // Displays Score

        var DisplayScore = function() {
        ctx.fillStyle = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Score: 0', 10, 10);
    }


