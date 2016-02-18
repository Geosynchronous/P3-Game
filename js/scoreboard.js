
    // Buttons and Scoreboard Image Functions
    // Good Exercise in using canvas to create images like buttons
    // All kinds of effects can created using JS for text, Jitter effect used here
    // Too much work, using HTML and CSS quicker, or a js library better

    // TODO - Need to highlight mouseover buttons... refactor everything probably


    // Displays current Game Level
    var ScoreBoardRender = function(lifeCycle) {
        var my_gradientBoard = ctx.createLinearGradient(0, 0, 0, 50);
        my_gradientBoard.addColorStop(0, "#666666");
        my_gradientBoard.addColorStop(1, "#000");
        ctx.fillStyle = my_gradientBoard;
        ctx.fillRect(0, 0, 505, 47);
        ctx.fillStyle = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('LIFECYCLE', 170, 10);
        ctx.fillText(lifeCycle, 320, 10);
    };




    // Needed Button Code
    // PseudoClassical Class Definition Function used here
    //
    // Generic cunstructor function to make buttons
    // Begin and End coordinates define needed rectangles
    // "text" is button lable
    // xt & yt define where text lable starts
    var MakeButton = function(xBegin,text, xt) {

        this.xBegin = xBegin;
        this.yBegin = 7;
        this.xEnd = 88;
        this.yEnd = 33;
        this.text = text;
        this.xt = xt;
        this.yt = 12;
    };

    // Generic prototype function to render button
    MakeButton.prototype.render = function() {

        var my_gradient = ctx.createLinearGradient(0, 0, 0, 70);

        my_gradient.addColorStop(0, "#cc0000");
        my_gradient.addColorStop(1, "#000");
        ctx.fillStyle  = '#936c6c';
        ctx.fillRect(this.xBegin + 2, this.yBegin + 1, this.xEnd - 1, this.yEnd);
        ctx.fillStyle = my_gradient;
        ctx.fillRect(this.xBegin, this.yBegin, this.xEnd, this.yEnd);
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(this.text, this.xt, this.yt);
    };

    // Specific Buttons created
    var playButton = new MakeButton(7, 'Play', 28);
    var infoButton = new MakeButton(410, 'Info', 437);
    var doneButton = new MakeButton(410, 'Done', 430);
    var resetButton = new MakeButton(410, 'Reset', 427);
    var nextButton = new MakeButton(410, 'Next', 430);








    // Displays Info Window
    // Canvas is not well equipe for paragraphs and line breaks!!!
    // Brute Force multiline fillText used here
    // TODO--- HTML & CSS or a JS Library are the way to go?
    var InfoWindow = function() {
        var my_gradientBoard = ctx.createLinearGradient(0, 0, 0, 300);
        my_gradientBoard.addColorStop(0, "transparent");
        my_gradientBoard.addColorStop(1, "rgba(0, 0, 0, 0.9");
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
        ctx.fillText('Winning a GAME starts the next LIFECYCLE. It is then', 20, 290);
        ctx.fillText('up to the PLAYER to figure things out.', 20, 310);

        ctx.fillText('There are five increasingly difficult LIFECYCLES to', 20, 350);
        ctx.fillText('WIN to become a JEDI JITTERBUGGING MASTER.', 20, 370);

        ctx.fillStyle = '#cc0000';
        ctx.fillText('WARNING: These bugs are experiencing an epidemic', 20, 410);
        ctx.fillText('of a once thought to be extinct JITTER VIRUS that is', 20, 430);
        ctx.fillText('rapidly evolving strange behavioural phenotypes.', 20, 450);
    };





    // Bottom Shadow Jitters with Trig fn
    var DisplayTitleShadow1 = function() {
        ctx.fillStyle  = '#000';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('J I T T E R   B U G S', 103 + 2 * Math.cos(Date.now()), 534 + 2 * Math.cos(Date.now()));
    };

    //  Middle Shadow Jitters with Trig fn
    var DisplayTitleShadow2 = function() {
        ctx.fillStyle  = '#fff';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('J I T T E R   B U G S', 101 + Math.sin(Date.now()), 529 + Math.cos(Date.now()));
    };

    // Title Jitters with Trig fn
    var DisplayTitle = function() {
        ctx.fillStyle  = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('J I T T E R   B U G S', 101 + Math.cos(Date.now()), 530);
    };

    // Displays Score and updates
    var DisplayScore = function(playerScore) {
        ctx.fillStyle = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Score: ', 10, 10);
        ctx.fillText(playerScore, 100, 10);
    };

    // Used after Collosion Event
    var GameOverMessage = function() {
        var my_gradientBoard = ctx.createLinearGradient(0, 0, 0, 300);
        my_gradientBoard.addColorStop(0, "transparent");
        my_gradientBoard.addColorStop(1, "rgba(0, 0, 0, 0.9");
        ctx.fillStyle = my_gradientBoard;
        ctx.fillRect(0, 50, 505, 460);
        ctx.fillStyle = '#fbcc09';
        ctx.textBaseline = 'top';
        ctx.font = 'bold 72px sans-serif';

        ctx.fillText('GAME', 140, 200 - 3 * Math.cos(Date.now()));
        ctx.fillText('OVER', 140, 280 + 3 * Math.cos(Date.now()));

    };



