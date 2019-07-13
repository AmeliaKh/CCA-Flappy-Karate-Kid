
var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", stateActions);
var score = 0;
var labelScore;
var player;
var pipes=[];
var pipeInterval = 1.75;


function preload() {
game.load.audio("score", "assets/point.ogg");
game.load.image("pipe","assets/pipe.png");
//new............................................................................
game.load.spritesheet('playerImg', 'assets/sprite sheets/mummy.png', 37, 45, 18);
//new............................................................................
game.load.image("orb", "assets/orb-red.png");
}

function create() {
    game.stage.setBackgroundColor ("#ffe680");  
    
		
		
	var text = game.add.text(250, 20, 'Welcome to my game',{font: "30px Tahoma", fill:"#ff9933"});
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);	
		
		
		
	labelScore= game.add.text(20, 60, "0",
	{font: "30px Arial", fill: "#FFFFFF"});
	labelScore.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	
	
	
	player = game.add.sprite(80, 200, "playerImg");
//new..................................................
	var walk = player.animations.add('walk');
	player.animations.play('walk', 30, true);
//new..................................................
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable(player);
	player.body.gravity.y = 500;
//new......................................................
	player.body.collideWorldBounds = true;
	player.body.bounce.setTo(0.8, 0.8);
	
	
	orb = game.add.sprite(80, 150, 'orb');
	game.physics.enable(orb, Phaser.Physics.ARCADE);

	orb.body.velocity.setTo(150, 150);
	orb.body.collideWorldBounds = true;
	orb.body.bounce.setTo(0.8, 0.8, 0.8, 0.8);
	
	cursors = game.input.keyboard.createCursorKeys();
//new......................................................
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown
        .add(playerJump);
	game.time
		.events
		.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
	
}
    
 function update() {
	 
	game.physics.arcade.overlap(player, pipes, gameOver);
//new................................................................
	game.physics.arcade.overlap(player, orb, collisionHandler);
	
	player.body.velocity.x = 0;
	
	if (cursors.left.isDown)
	{
		player.body.velocity.x=-200;
	}
	else if (cursors.right.isDown)
	{
		player.body.velocity.x = 200;
	}
	
	else if (cursors.down.isDown)
	{
		player.body.velocity.y = 200;
	}

	
	}    
function collisionHandler(){
	game.stage.backgroundColor = '#992d2d';
	generateHardPipe();
	orb.kill();
	
}

//new..................................................................


function addPipeBlock(x, y) {
	
	var block = game.add.sprite(x,y,"pipe");
	
	pipes.push(block);
	
	game.physics.arcade.enable(block);
	
	block.body.velocity.x = -200;
}

function generatePipe(){
	
	var gapStart = game.rnd.integerInRange(1, 5);
	
	for (var count = 0; count < 8; count++) {
		if (count != gapStart && count != gapStart+1) {
			addPipeBlock(750, count * 50);
		}
	}
	changeScore();
	
}

//new...................................................
function addHardPipeBlock(x, y) {
	
	var block = game.add.sprite(x,y,"pipe");
	
	pipes.push(block);
	
	game.physics.arcade.enable(block);
	
	block.body.velocity.x = -500;
}
function generateHardPipe(){
	
	var gapStart = game.rnd.integerInRange(1, 5);
	
	for (var count = 0; count < 8; count++) {
		if (count != gapStart && count != gapStart+1) {
			addHardPipeBlock(750, count * 50);
		}
	}
	ultimateMode();


}

//new...................................................



	

function playerJump(){
	
	player.body.velocity.y = -200;
}

function changeScore(){
    score=score + 1;
    labelScore.setText(score.toString());

    
} 

//new...................................................................................................
function ultimateMode(){
    score=score + 100;
    labelScore.setText(score.toString());
	game.time
		.events
		.loop(pipeInterval * Phaser.Timer.SECOND, generateHardPipe);
	var text = game.add.text(220, 50, 'Good Luck HAHAHAHAHA!',{font: "30px Tahoma", fill:"#b30047"});
		text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);	
    
}
//new...................................................................................................

function gameOver() {
	game.destroy();
}
