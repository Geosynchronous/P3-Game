
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

    // Bottom Shadow Jitters with Trig fn
    var DisplayTitleShadow1 = function() {
        ctx.fillStyle  = '#000';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('J I T T E R B U G G I N G', 72 + 2 * Math.cos(Date.now()), 534 + 2 * Math.cos(Date.now()));
    }

    //  Middle Shadow Jitters with Trig fn
    var DisplayTitleShadow2 = function() {
        ctx.fillStyle  = '#cc0000';
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


// Mouse Click reveals if button is selected
// Basic Function with Returnsd Variables Definition used
    function handleMouseClick(evt) {

        buttonPlay = false,
        buttonInfo = false;
        x = evt.clientX - canvas.offsetLeft;
        y = evt.clientY - canvas.offsetTop;

        // Determines if mouse clicked on a button
        if ((x >= 7  && x<= 88) && (y >= 7 && y <= 35)) {
            buttonPlay = true;
        } else if (( x >= 412  && x<= 500) && (y >= 7 && y <= 35)) {
            buttonInfo = true;
        }

        return buttonPlay, buttonInfo;
    }
