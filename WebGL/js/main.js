var _VERTEX_SHADER = document.getElementById( 'vertexShader' ).textContent;
var _FRAGMENT_SHADER = document.getElementById( 'fragmentShader' ).textContent;
var _TEXTURE_FRAGMENT_SHADER = document.getElementById( 'textureFragmentShader' ).textContent;
var _PURE_TEXTURE_FRAGMENT_SHADER = document.getElementById( 'pureTextureFragmentShader' ).textContent;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

var light = new Light();
light.setColor(1.0,1.0,1.0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Array Of MeshObject
var meshObject = [];

// Set Shadow Map
renderer.shadowMap.enabled	= true;
renderer.shadowMap.type 		= THREE.PCFSoftShadowMap;

var shadowRenderFunction= [];

var light2 = new THREE.DirectionalLight( 0xffffff, 2 );
	light2.position.set( 1, -1, 1 ).normalize();
	scene.add( light2 );

	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.target.position.set( 0, 2, 0 );
	spotLight.shadowCameraNear = 0.01;		
	spotLight.castShadow = true;
	spotLight.shadowDarkness = 0.5;
	scene.add( spotLight );	

	shadowRenderFunction.push(function(){
		spotLight.position.x	= light.lightPos.x;
		spotLight.position.y	= light.lightPos.y;
		spotLight.position.z	= light.lightPos.z;		
	});

// Cube
var cube1 = new MeshObject("cube1");
cube1.loadTexture("box.jpg");
cube1.loadObject(
	"cube.obj",
	light, _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
cube1.mesh.position.y = 5;
cube1.mesh.position.x = 5;
cube1.mesh.position.z = -5;
cube1.mesh.castShadow = true;
cube1.mesh.receiveShadow = true;
scene.add(cube1.mesh);
meshObject.push({
	o: cube1,
	rotFac: new THREE.Vector3( 0.1, 0.1, 0.1 )
});

var cube2 = new MeshObject("cube2");
cube2.loadTexture("box.jpg");
cube2.loadObject(
	"cube.obj",
	light, _VERTEX_SHADER, _FRAGMENT_SHADER
);
cube2.mesh.position.y = 5;
cube2.mesh.position.x = -5;
cube2.mesh.position.z = -5;
cube2.mesh.castShadow = true;
cube2.mesh.receiveShadow = true;
scene.add(cube2.mesh);
meshObject.push({
	o: cube2,
	rotFac: new THREE.Vector3( 0.01, 0.01, 0.0 )
});

// Tree Test
var tree1 = new MeshObject("tree1");
tree1.loadTexture("box.jpg");
tree1.loadObject(
	"tree.obj",
	light, _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
tree1.mesh.position.y = 0;
tree1.mesh.position.x = 5;
tree1.mesh.position.z = -10;
tree1.mesh.castShadow = true;
tree1.mesh.receiveShadow = true;
tree1.mesh.geometry.computeVertexNormals();
scene.add(tree1.mesh);
meshObject.push({
	o: tree1,
	rotFac: new THREE.Vector3( 0.0, 0.05, 0.0 )
});



/*
var ground = new MeshObject("ground");
ground.loadTexture("grass.jpg");
ground.loadObject(
	"cube2.obj",
	light, _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
ground.mesh.position.y = -102;
ground.setSpecular(0,0,0);
scene.add(ground.mesh);
*/

// Sky
var sky = new MeshObject("sky");
sky.loadTexture("sky.jpg");
sky.loadObject(
	"sky2.obj",
	light, _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
sky.setSpecular(1,1,1);
sky.mesh.position.x = 382;
sky.mesh.position.y = 300;
sky.mesh.position.z = 182;
sky.mesh.geometry.computeVertexNormals();
scene.add(sky.mesh);

// New Ground
var geometry = new THREE.CubeGeometry( 100, 1, 100);
var texture	= THREE.ImageUtils.loadTexture('textures/grass.jpg');
texture.repeat.set( 10, 10 );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
var material = new THREE.MeshPhongMaterial({
	ambient	: 0xffffff,
	color : 0x00ff00,
	shininess : 0, 
	specular : 0x000000,
	shading	: THREE.SmoothShading,
	map	: texture
});
var ground = new THREE.Mesh( geometry, material );
ground.scale.multiplyScalar(3);
ground.position.y = -1;
scene.add( ground );

ground.castShadow = false;
ground.receiveShadow = true;

// Push to render function
shadowRenderFunction.push(function(){
	renderer.render( scene, camera );		
});

var Plane = new MeshObject("cloud");
var planeTexture = new RawTexture("cloud");
planeTexture.newSize(64);
for(var i=0;i<64;i++) {
	for(var j=0;j<64;j++) {
		if(i < 32 && j < 32) { // Must be Top-Left
			planeTexture.setRGB(i,j,1,0,0);
		}
		else if(i < 32) { // Must be Top-Right
			planeTexture.setRGB(i,j,0,1,0);
		}
		else if(j < 32) { // Must be Bottom-Left
			planeTexture.setRGB(i,j,0,0,1);
		}
		else { // Must be Bottom-Right
			if(i + j < 96)
				planeTexture.setRGB(i,j,0,0,0);
			else
				planeTexture.setRGB(i,j,1,1,1);
		}
	}
}
Plane.setTexture(planeTexture.getTexture());
Plane.loadTHREEObject(
	new THREE.PlaneGeometry(50,50,10,10),
	light, _VERTEX_SHADER, _PURE_TEXTURE_FRAGMENT_SHADER
);
Plane.mesh.position.y = 50;
Plane.mesh.rotation.x = Math.PI/2;
scene.add(Plane.mesh);

/*
removeObject("cube1");
removeObject("tree1");
*/

var render = function () {
	requestAnimationFrame( render );
	updateCamera();

	sunAngle += sunSpeed*sunDAngle;
	if (sunAngle > 2*Math.PI) sunAngle = 0;
	else if (sunAngle < 0) sunAngle = 2*Math.PI;

	// Sun Position
	// document.getElementById("footer-text").innerHTML = "Sun Position: (" + light.lightPos.x.toFixed(2) + "," + light.lightPos.y.toFixed(2) + "," + light.lightPos.z.toFixed(2) + ")";

	renderer.render(scene, camera);

	shadowRenderFunction.forEach(function(func) {
		func(1, 1);
	});

	meshObject.forEach(function(obj) {
		obj.o.mesh.rotation.x += obj.rotFac.x;
		obj.o.mesh.rotation.y += obj.rotFac.y;
		obj.o.mesh.rotation.z += obj.rotFac.z;
	});
};

render();
