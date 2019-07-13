## Build your own game ##

There are some extensions that can be made to this game simply by adding more functions but also experimenting a bit more with the assets.

### Animating your Sprite ###

At the moment we have used physics to animate our sprite when we press the space bar. However, the sprite is still a static image.
This can be changed by simply changing the asset for playerImg and updating your create function.

First of all lets look at the asset:

	function preload() {
		//this is where your previous code goes
		game.load.spritesheet('playerImg', 'assets/sprite sheets/mummy.png', 37, 45, 18);
	}
As you can see we have changed game.load.image to game.load.spritesheet and the asset for playerImg is now 'mummy.png'- this asset is a sprite sheet, which is basically one singular image that contains many sprites showing different movements which when looped give the illusion of the sprite walking. Take not of the numbers we have added to the end, these indicate the positions of the different images on the sprite sheet. 

![](http://examples.phaser.io/assets/sprites/metalslug_mummy37x45.png)


Next we need to look at our create function:

	function create() {
		//this is where your previous code goes
		var walk = player.animations.add('walk');
		player.animations.play('walk', 30, true);
	}

Using the phaser framework we create a new variable called walk which runs the function player.animations.add('walk')- this simply loads the instruction to animate the character. We then simply add the function player.animations.play which instructs the animation to play.



### Adding another sprite to interact with ###

Next we see how we can add another sprite to our game which when interacted with can change the dynamic of the game.

To start you need to return to your preload function and add the following code:

	function preload() {
		//this is where your previous code goes
		game.load.image("orb", "assets/orb-red.png");
	}

This loads a new sprite that we can work with.

In the create function we need to create a new variable, lets call it orb:

	function create() {
	//this is where your previous code goes
	 	orb = game.add.sprite(80, 150, 'orb');
	}

This adds our sprite on to the stage in the coordinates 80, 150 and uses the asset labelled 'orb'.

Next we need to apply physics to our sprite using the phaser frame work and we can set our sprite velocity, the ability to collide and the new feature which allows a sprite to bounce on the edges:

	function create() {
	//this is where your previous code goes
	 	orb = game.add.sprite(80, 150, 'orb');
		game.physics.enable(orb, Phaser.Physics.ARCADE);
		orb.body.collideWorldBounds = true;
		orb.body.bounce.setTo(0.8, 0.8, 0.8, 0.8);
	}

Next, we need to create some new functions. 
These will be called collisonHandler, addHardPipeBlock, generateHardPipe and ultimateMode.

Lets discuss these function by function.

###collisionHandler###

	function collisionHandler(){
		game.stage.backgroundColor = '#992d2d';
		generateHardPipe();
		orb.kill();
	}
This functions is designed to generate changes to the game environment once the player collides with the orb sprite.

As you can see, we have set the stage background colour to change to red, and we set the orb sprite to disappear by using the kill function and we also call the generateHardPipe function, which we will go through now...

###generateHardPipe###

	function generateHardPipe(){
	
		var gapStart = game.rnd.integerInRange(1, 5);
	
		for (var count = 0; count < 8; count++) {
			if (count != gapStart && count != gapStart+1) {
			addHardPipeBlock(750, count * 50);
			}
		}
		ultimateMode();
	}

As you can see this code is identical to the generatePipe function however instead of calling addPipeBlock we call addHardPipeBlock and instead of calling changeScore we call ultimateMode...

###addHardPipeBlock###

	function addHardPipeBlock(x, y) {
		
		var block = game.add.sprite(x,y,"pipe");
	
		pipes.push(block);
	
		game.physics.arcade.enable(block);
	
		block.body.velocity.x = -500;
	}

Again this code is very similar to our original function addPipeBlock but instead of a velocity of -200 we have increased it to -500, meaning pipes that travel at a much faster speed will be generated as well as the initial pipes making the game harder.

Now it is important to remember the player is rewarded for being able to dodge the harder pipes which is why we have the function ultimateMode...

###ultimateMode###


	function ultimateMode(){
    	score=score + 100;
    	labelScore.setText(score.toString());
		game.time
			.events
			.loop(pipeInterval * Phaser.Timer.SECOND, generateHardPipe);
		var text = game.add.text(220, 50, 'Ultimate Mode!',{font: "30px Tahoma", fill:"#b30047"});
							text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);	
	}

Here you can see we have changed the program so instead of incrementing the score by 1 we increment by 100 and that we have set the pipes to loop along with adding the text "Ultimate Mode!"


And there you have it! Your very own sprite interaction that generates the Ultimate hard mode!






