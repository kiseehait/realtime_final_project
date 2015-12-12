$(function() {
	$(window).keypress(function(e) {
		var key = e.which;
		console.log("You pressing: " + key);
		switch (key) {
			case 97 :
				camera.position.x++;
				break;
			case 122 :
				camera.position.x--;
				break;
			case 115 :
				camera.position.y++;
				break;
			case 120 :
				camera.position.y--;
				break;
			case 100 :
				camera.position.z++;
				break;
			case 99 :
				camera.position.z--;
				break;
		}
	});
});