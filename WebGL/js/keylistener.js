$(function() {
	$(window).keypress(function(e) {
		var key = e.which;
		console.log("You pressing: " + key);
		switch (key) {
			case 3615 :
			case 97 :
				camera.position.x++;
				break;
			case 3612 :
			case 122 :
				camera.position.x--;
				break;
			case 3627 :
			case 115 :
				camera.position.y++;
				break;
			case 3611 :
			case 120 :
				camera.position.y--;
				break;
			case 3585 :
			case 100 :
				camera.position.z++;
				break;
			case 3649 :
			case 99 :
				camera.position.z--;
				break;
		}
	});
});