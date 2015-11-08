var	elementList = ["./images/sprites/sprite_dirt.png", "./images/sprites/sprite_ground.png", "./images/sprites/sprite_lava.gif", "./images/sprites/sprite_water.gif", "./images/sprites/sprite_spike_strip.png", "./images/sprites/sprite_bricks.png", "./images/sprites/sprite_die.png"],
	elementsOnScreen = [],
	numElements = 0,
	block = [],
	blocks = [],
	blockAttributes = [],
	levelExport = "",
	timesUpdated = 0,
	gameSpeed = 1.0,
	player,
	gravity = 3.0,
	airbourne = true,
	playerYvelocity = 0.0,
	grounded = false;

	player = "<img height=95 id='mainChar' src='./images/characters/main.png' >";


$(document).ready(function(){
	
	$("#loadPopup").hide();



	$("#load").click(function() {	
		$("#loadPopup").fadeIn(250);
	});
	$("#loadButton").click(function (){
		var loadedCode = $("textarea").val();

		$("#level").empty();
		loadLevel(loadedCode);
		$("#loadPopup").fadeOut(250);
	});
});

function loadLevel(levelCode) {

	blocks = levelCode.split(";");


	for(var i = 0; i < blocks.length; i++) {

		blockAttributes = blocks[i].split(":");

		block[i] = new Object();

		block[i].id = 	blockAttributes[0];
		block[i].type = blockAttributes[1];
		block[i].x = 	blockAttributes[2];
		block[i].y = 	blockAttributes[3];


		$("#level").append("<img class='draggable gameElement' blockType='" + block[i].type + "' value=" + block[i].id +" height=50 src='" + elementList[block[i].type] + "'/>");
		
		$("img[value='" + i + "']").css("left", block[i].x).css("top", block[i].y);

		console.log("ID: " + block[i].id + "\nType: " + block[i].type + "\nPosition: (" + block[i].x + ", " + block[i].y + ")\n\n");
		
		
	}
	startGame();
}



function startGame() {

		$("#level").append(player);
		$("#mainChar").css("top", 100);

		$(document).keydown(function(event) {
  			if ( event.which == 37 ) {
  				$("img#mainChar").css("left", $("img#mainChar").position().left -= 5);
   				console.log("left");
   			} else if ( event.which == 38 ) {
   				console.log("top");
   				if(airbourne == false) {
   					jump();
   				} else {
   					console.log("Nope");
   				}
   			} else if ( event.which == 39 ) {
   				$("img#mainChar").css("left", $("img#mainChar").position().left += 5);
   				console.log("right");
   			} else if ( event.which == 40 ) {
   				console.log("down");
   			}
  		});

  	startLoop();
}

function startLoop() {
	setTimeout(update, 1000 / 60);
}

function update() {

	checkCollisions($("img#mainChar").position().left, $("img#mainChar").position().top);
	if(grounded == false) {
		$("#mainChar").css("top", $("img#mainChar").position().top += gravity);
	}else {
		console.log("grounded");
	}

	startLoop();
}




function checkCollisions(x, y) {
	var hitGround = false;
	for(var i = 0; i < block.length && !hitGround; i++) {
		if(block[i].x > x - 50 && block[i].x < x + 50) {
			//$("img[value='" + block[i].id + "']").css("border", "1px solid red");
			if(y + 95 < block[i].y || y > block[i].y + 50) {
				grounded = false;
			} else {
				grounded = true;
				hitGround = true;
			}
			console.log(block[i].y + "\n" + (y + 95));
		} else {
			$("img[value='" + block[i].id + "']").css("border", "0");
		}
	}

}

