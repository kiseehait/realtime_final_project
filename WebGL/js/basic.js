var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var mytexture = THREE.ImageUtils.loadTexture( "./textures/box.jpg" );
var mytexture2 = THREE.ImageUtils.loadTexture( "./textures/grass.jpg" );
/*
mytexture.wrapS = THREE.RepeatWrapping;
mytexture.wrapT = THREE.RepeatWrapping;
mytexture.repeat.set( 4, 4 );
*/
var uniforms = {
	fogDensity: { type: "f", value: 0.45 },
	lightPos: { type: "v3", value: new THREE.Vector3( 0, 100, 200 ) },
	lightCol: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	Ka: { type: "v3", value: new THREE.Vector3( 0.1, 0.1, 0.1 ) },
	Kd: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	Ks: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	s: { type: "f", value: 100 },
	texture: { type: "t", value: mytexture}
};

var uniforms2 = {
	fogDensity: { type: "f", value: 0.45 },
	lightPos: { type: "v3", value: new THREE.Vector3( 0, 100, 200 ) },
	lightCol: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	Ka: { type: "v3", value: new THREE.Vector3( 0.1, 0.1, 0.1 ) },
	Kd: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	Ks: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	s: { type: "f", value: 100 },
	texture: { type: "t", value: mytexture2}
};

// Cube
var geometry = readObjectFromFile('cube.obj');;
var material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
} );
var object = new THREE.Mesh( geometry, material );

scene.add( object );
object.position.y = 0;

// Ground
var geometry2 = readObjectFromFile('cube2.obj');;
var material2 = new THREE.ShaderMaterial( {
	uniforms: uniforms2,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
} );
var object2 = new THREE.Mesh( geometry2, material2 );

object2.castShadow = false;
object2.receiveShadow = true;

scene.add( object2 );
object2.position.y = -102;

// Camera Reposition
camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );
	updateCamera();
	object.rotation.y += 0.01;
	object.rotation.x += 0.01;
	renderer.render(scene, camera);
};

render();
