
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


