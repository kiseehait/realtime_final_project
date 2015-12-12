var lastTimeUpdate = Date.now();
var _CAMERA_SPEED = 0.01;
var _INVALIDKEYS = {"9":"tab","18":"alt"};
var _UP    = "87"; // W
var _DOWN  = "83"; // S
var _LEFT  = "65"; // A
var _RIGHT = "68"; // D
var _FRONT = "69"; // E
var _BACK  = "81"; // Q

// A map to remember in
var keysdown = {};

// keydown handler
$(document).keydown(function(e){

  // Do we already know it's down?
  if (keysdown[e.keyCode]) {
      // Ignore it
      return;
  }

  // Remember it's down
	if(!(e.keyCode in _INVALIDKEYS))
		keysdown[e.keyCode] = true;
});

// keyup handler
$(document).keyup(function(e){
  delete keysdown[e.keyCode];
});

var delta = function() {
	return Date.now()-lastTimeUpdate;
}

function updateCamera() {
	for(var key in keysdown) {
		console.log(key);
		switch (key) {
			case _LEFT:
				camera.position.x -= delta()*_CAMERA_SPEED;
				break;
			case _RIGHT:
				camera.position.x += delta()*_CAMERA_SPEED;
				break;
			case _UP:
				camera.position.y += delta()*_CAMERA_SPEED;
				break;
			case _DOWN:
				camera.position.y -= delta()*_CAMERA_SPEED;
				break;
			case _FRONT:
				camera.position.z -= delta()*_CAMERA_SPEED;
				break;
			case _BACK:
				camera.position.z += delta()*_CAMERA_SPEED;
				break;
		}
	}
	lastTimeUpdate = Date.now();
}