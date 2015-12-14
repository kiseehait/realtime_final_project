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
var _SUN_FORWARD = "88"; // X
var _SUN_BACKWARD = "90"; // Z
var _SUN_SPEED_UP = "86"; // V
var _SUN_SPEED_DOWN = "67"; // C
var _ADD_CUBE = "66"; // B

var verticalAngle = 0,horizontalAngle = Math.PI;

var cursorX,cursorY,newCursorX,newCursorY;
var cursorDrag = false;
var position = new THREE.Vector3(0, 5, 5);
var direction = new THREE.Vector3( Math.cos(verticalAngle) * Math.sin(horizontalAngle), Math.sin(verticalAngle), Math.cos(verticalAngle) * Math.cos(horizontalAngle) );
var right = new THREE.Vector3( Math.sin(horizontalAngle - Math.PI/2), 0, Math.cos(horizontalAngle - Math.PI/2) );
var up = new THREE.Vector3();
up.crossVectors(right, direction);

var sunAngle = Math.PI/2;
var sunStep = 360;
var sunDAngle = 2*Math.PI/sunStep;
var sunDayLimitL = 2*Math.PI;
var sunDayLimitR = Math.PI;
var sunSpeed = 0.25;
var lightGap;
var dawnLimit = 500*Math.cos(Math.PI/6);
var twilightLimit = 500*Math.cos(5*Math.PI/6);
var maxLightGap = 500 - 500*Math.cos(Math.PI/6);;
var lightCol;

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
		// console.log(horizontalAngle + " , " + verticalAngle);
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
			case _SUN_FORWARD:
				sunAngle += sunDAngle;
				break;
			case _SUN_BACKWARD:
				sunAngle -= sunDAngle;
				break;
			case _SUN_SPEED_UP:
				sunSpeed += 0.1;;
				if (sunSpeed > 2.25) sunSpeed = 2.25;
				break;
			case _SUN_SPEED_DOWN:
				sunSpeed -= 0.1;
				if (sunSpeed < 0.05) sunSpeed = 0.05;
				break;
		}
	}
	camera.position.x = position.x;
	camera.position.y = position.y;
	camera.position.z = position.z;

	light.setPosition(0, 500*Math.sin(sunAngle), 500*Math.cos(sunAngle));
	
		if (light.lightPos.z > dawnLimit) {
			lightGap = light.lightPos.z - dawnLimit;
			if (light.lightPos.y >= 0) {
				lightCol = 1 - lightGap/maxLightGap*0.5;
				light.setColor(1,lightCol,lightCol);
			} else {
				lightCol = 0.1 + lightGap/maxLightGap*0.4;
				light.setColor(2*lightCol,lightCol,lightCol);
			}
			sky.setSpecular(1,1,1);
		} else if (light.lightPos.z < twilightLimit) {
			lightGap = twilightLimit - light.lightPos.z;
			if (light.lightPos.y >= 0) {
				lightCol = 1 - lightGap/maxLightGap*0.5;
				light.setColor(1,lightCol,lightCol);
			} else {
				lightCol = 0.1 + lightGap/maxLightGap*0.4;
				light.setColor(2*lightCol,lightCol,lightCol);
			}
			sky.setSpecular(1,1,1);
		} else {
			if (light.lightPos.y >= 0) {
				light.setColor(1,1,1);
				sky.setSpecular(1,1,1);
			} else {
				light.setColor(0.1,0.1,0.1);
				sky.setSpecular(0,0,0);
			}
		}
	

	lastTimeUpdate = Date.now();
}