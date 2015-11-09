var elementList = ["../images/sprites/sprite_dirt.png", "../images/sprites/sprite_ground.png", "../images/sprites/sprite_lava.gif", "../images/sprites/sprite_water.gif", "../images/sprites/sprite_spike_strip.png", "../images/sprites/sprite_bricks.png", "../images/sprites/sprite_die.png"],
	elementsOnScreen = []
	numElements = 0,
	blocks = [],
	levelExport = "";



$(document).ready(function() {

	$(".dockElement").click(function() {
		var elementValue = $(this).val();
		createElement(elementValue);
	});

	$("#save").click(function(){
		save();
	});

	$("textarea").hide();
});


function createElement(lvlElement) {

	elementsOnScreen[numElements] = "<img class='draggable gameElement' blockType='" + lvlElement + "' value=" + numElements +" height=50 src='" + elementList[lvlElement] + "'/>";


	$("#level").append(elementsOnScreen[numElements]);

	$(".draggable").draggable({
        stop:function(e){
            
    			if ((event.clientX / screen.width) * 100 > 79) {
        			console.log("true");
        			var value = $(this).val()
        			index = elementsOnScreen.indexOf(value);
    				elementsOnScreen.splice(index, 1);
					
        			$(this).remove();
    			}else {
    				console.log("false");
    			}

    			console.log((event.clientX / screen.width) * 100 + "%");
		

            $(this).css("left", $(this).position().left = Math.round($(this).position().left / 25) * 25);
            $(this).css("top", $(this).position().top = Math.round($(this).position().top / 25) * 25);
            console.log($(this).position().left);
        }
	});

	numElements++;
}


function save() {
	for(var i = 0; i < numElements; i++) {
		if($("img[value=" + i + "]").length){
			var blockElement = $("img[value=" + i + "]"),
				position = blockElement.position();
	
			blocks[i] = new Object();
	
			blocks[i].id = i;
			blocks[i].type = blockElement.attr("blockType");
			blocks[i].x = position.left;
			blocks[i].y = position.top;
	
			levelExport += blocks[i].id + ":" + blocks[i].type + ":" + blocks[i].x + ":" + blocks[i].y + ";";
		}



	}

	console.log(levelExport);
	levelExport = levelExport.substring(0, levelExport.length - 1);

	$("textarea").html(levelExport);

	$("textarea").fadeIn(250);
}
