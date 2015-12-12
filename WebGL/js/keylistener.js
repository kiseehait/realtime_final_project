var lastTimeUpdate = Date.now();
var _CAMERA_SPEED = 0.01;
var _PAN_SPEED = 0.01;
var _INVALIDKEYS = {"9":"tab","18":"alt"};
var _UP    = "82"; // R
var _DOWN  = "70"; // F
var _LEFT  = "65"; // A
var _RIGHT = "68"; // D
var _FRONT = "87"; // W
var _BACK  = "83"; // S

var verticalAngle = 0,horizontalAngle = Math.PI;

var cursorX,cursorY,newCursorX,newCursorY;
var cursorDrag = false;
var position = new THREE.Vector3();
var direction = new THREE.Vector3( Math.cos(verticalAngle) * Math.sin(horizontalAngle), Math.sin(verticalAngle), Math.cos(verticalAngle) * Math.cos(horizontalAngle) );
var right = new THREE.Vector3( Math.sin(horizontalAngle - Math.PI/2), 0, Math.cos(horizontalAngle - Math.PI/2) );
var up = new THREE.Vector3();
up.crossVectors(right, direction);

var keysdown = {};
var delta = function() {
	return Date.now()-lastTimeUpdate;
}
var crop = function(n, min, max) {
	if(n < min) return min;
	if(n > max) return max;
	return n;
}

// Cursor Handler
document.onmousedown = function(e) {
	cursorDrag = true;
}
document.onmouseup = function(e) {
	cursorDrag = false;
}
document.onmousemove = function(e){
	cursorX = newCursorX;
	cursorY = newCursorY;
	newCursorX = e.pageX;
	newCursorY = e.pageY;
}

// Keyboard Handler
$(document).keydown(function(e){
  if (keysdown[e.keyCode])
      return;
	if(!(e.keyCode in _INVALIDKEYS))
		keysdown[e.keyCode] = true;
});
$(document).keyup(function(e){
  delete keysdown[e.keyCode];
});


function updateCamera() {
	direction.set( Math.cos(verticalAngle) * Math.sin(horizontalAngle), Math.sin(verticalAngle), Math.cos(verticalAngle) * Math.cos(horizontalAngle) );
	right.set( Math.sin(horizontalAngle - Math.PI/2), 0, Math.cos(horizontalAngle - Math.PI/2) );
	up.crossVectors(right, direction);
	if(cursorDrag) {
		horizontalAngle += _PAN_SPEED * (newCursorX - cursorX);
		verticalAngle   = crop(verticalAngle + _PAN_SPEED * (newCursorY - cursorY), -Math.PI/2+0.1, Math.PI/2-0.1);
		console.log(horizontalAngle + " , " + verticalAngle);
		camera.lookAt(new THREE.Vector3(
			position.x + Math.cos(verticalAngle) * Math.sin(horizontalAngle),
			position.y + Math.sin(verticalAngle),
			position.z + Math.cos(verticalAngle) * Math.cos(horizontalAngle)
		));
	}
	cursorX = newCursorX;
	cursorY = newCursorY;
	for(var key in keysdown) {
		switch (key) {
			case _FRONT:
				position.add((new THREE.Vector3()).addScaledVector(direction,delta()*_CAMERA_SPEED));
				break;
			case _BACK:
				position.sub((new THREE.Vector3()).addScaledVector(direction,delta()*_CAMERA_SPEED));	
				break;
			case _LEFT:
				position.sub((new THREE.Vector3()).addScaledVector(right,delta()*_CAMERA_SPEED));
				break;
			case _RIGHT:
				position.add((new THREE.Vector3()).addScaledVector(right,delta()*_CAMERA_SPEED));
				break;
			case _UP:
				position.add((new THREE.Vector3()).addScaledVector(up,delta()*_CAMERA_SPEED));
				break;
			case _DOWN:
				position.sub((new THREE.Vector3()).addScaledVector(up,delta()*_CAMERA_SPEED));
				break;
		}
	}
	camera.position.x = position.x;
	camera.position.y = position.y;
	camera.position.z = position.z;
	lastTimeUpdate = Date.now();
}