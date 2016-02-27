frontend-nanodegree-arcade-game
===============================
by George Fischer

UDACITY Project Reviews
-----------------------
Exceeds Expectations
	https://review.udacity.com/#!/reviews/110193
	https://review.udacity.com/#!/reviews/108833


HOW TO RUN GAME
---------------

1. The game is located at https://github.com/Geosynchronous/P3-Game.  You may download all these files into a local directory on your computer.

2. Once the files are in a local directory, all you need to do is click on index.html to open the program in a web browser.  Soon as you do that you should see the game with some bugs with animated motion on a gaming background.

3. Look below at the "How the Game Works" section if you need help play the game.  Also there is an INFO button on the game that gives a brief discription about how to play the game.


GAME THEME
----------

The PLAYER (user) needs to drink water to survive a lifecycle. The player needs to move from the grass to the water (to get a point).  Ten points and the player wins that lifecycle.  Problem is the ENEMY BUGS are toxic. If player collides with bug, the game is over (player loses all points earned for that game and starts a new game).  These bugs have a virus that makes them jitter in strange ways.  The virus is contagious to the bugs. Succesive lifecycles causes more bugs to be infected, and maybe breed to produce even more bugs.  When and if a player wins all five lifecycles NINJA status is granted.

	Lifecycle 1 - Three Bugs
					- Only one infected with jitter virus
	Lifecycle 2 - Still three Bugs
					- two infected
				- Heart now appears in all subsequent games
					- captured heart let player move faster
					- only one heart captured per game
	Lifecycle 3 - Still three Bugs
					- All three infected
	Lifecycle 4 - Four Bugs
					- New Bug is a ROGUE (can drift accoss rows)
					- All four bugs infected
	Lifecycle 5 - Six Bugs
					- All six bugs infected
					- Same as lifecycle 4 except 2 new bugs
					- 2 new bugs are also ROGUE
					- This level is extremely challenging
						- if won, NINJA STATUS granted

	HINT: Player footprint (crosssection) is small compared to bugs.  Thus some overlap with bugs allowed, which gives a 3D EFFECT of the player standing over the bug.  This can be an advantage to the user.





HOW THE GAME WORKS
------------------

1. There are 5 LIFECYCLES (levels) to the arcade game called JITTER BUG.
	- Winning a lifecycle happens when a PLAYER SCORES 10 points.
	- Winning a lifecycle shows a message window "YOU WIN."
		- NEXT BUTTON clicked removes message and returns player to a new lifecycle.
	- Winning all 5 lifecycles displays a message window "NINJA!!!"
		- BACK BUTTON clicked returns player to lifecycle 1 to start over from beginning.
	- In LIFECYCLES 4 & 5, a HEART appears
		- When player captures HEART an explanation message appears
			- BACK BUTTON clicked
				- message removed
				- player returned to starting position
				- score stays the same
				- player can now move faster with ARROW KEYS
		- HEART is no longer displayed after first capture
			- if player loses the current game, then heart reappears in next game

2.  PLAY BUTTON clicked takes player to game playing mode
		- PLAY & INFO buttons disappear, RESET button appears
		- Player appears in starting position on grass
		- ARROW KEYS on user keyboard allow player to get to water
			- when the player gets to the water
				- a point is earned
				- player is returned to starting position on grass
		- If ENEMY BUG collides with PLAYER, the player loses game
			- a message window displays "GAME OVER"
			- BACK BUTTON clicked removes message
				- returns player to starting position
				- SCORE is a reset to 0
		- RESET BUTTON clicked
			- returns game to a start overmode
				- score 0
				- player on grass

3.	INFO BUTTON clicked renders a message about how to play the basic game.
		- INFO button only appears when PLAY button is also shown
		- DONE button clicked
			- removes INFO message window
			- returns to previous state
				- PLAY and INFO buttons reappear





CODING ADDITIONS: a.k.a BEYOND EXPECTATIONS
-------------------------------------------

1. Mathematical expressions used to give ENEMY bugs and text animated features. The bugs appear to behave in a somewhat random fashion that challenges the user's senses of observation.

2. Dynamic Scoreboard Created.
	- Score Label
	- Lifecycle Label
	- Buttons

4. Title Created (animated).

3. Buttons created.

5. Message Windows created.

6. Game reset modes.

7. Heart Bonus created.

8. All coding kept done in Javascript and displayed in one Canvas window
	- one caveat added simple background image to CSS and HTML files for BODY
		- that could have been down in JS as well

9. Attempts made to reduce global variable usage, some work still needed.

10. Comprehensive README file

11. Check Code
	- JSHINT
	- all js files

12. Minified js files into combined.min.js

13. Check Animation Frame Rate
		-Most animation frames code execution between 1 - 2 ms.
		-plenty of room left for 60 fps limit (16 ms per animation frame)

14. Detailed Commenting for all JS files.





MY THOUGHTS ABOUT THIS PROJECT
------------------------------

This project was a great way for me how learn how to use JS FUNCTIONS and OBJECT ORIENTED PROGRAMMING with them.  As a result my understanding of EXECUTION CONTEXT,SCOPE and HOISTING has improved.  I have learned a lot... but oh my... so much more to learn about these subject.

Also learned essentials of Canvas in JS, and that Text handling like word wrapping needs additional support, like from libraries.  Still though, pretty effective for making basic messages and labels in this game project.

Given enough time, I can envision doing all kinds of crazy things with this simple game platform to make it all the more interesting and challenging.  Like adding more conditional collision states, bonus features, obstacles and random events.

NOTE: I am NOT SATISFIED with still having three global variables declared, instead having them declared inside functions.  I could definately use some help with this.


NOTES FROM STUDENT
==================
This game has been reviewed once, and some required and suggested changes were given by the UDACITY REVIEWER.  I addressed all of these changes, and then re-submited the game.


NOTES TO STUDENT (from initital repository file):
================
Students should use this [rubric](https://www.udacity.com/course/viewer/#!/c-nd001/l-2696458597/m-2687128535) for self-checking their submission.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
