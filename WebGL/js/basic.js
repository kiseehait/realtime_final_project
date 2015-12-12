var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var mytexture = THREE.ImageUtils.loadTexture( "./textures/box.jpg" );
var mytexture2 = THREE.ImageUtils.loadTexture( "./textures/grass.jpg" );
var mytexture3 = THREE.ImageUtils.loadTexture( "./textures/sky.jpg" );
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

var uniforms3 = {
	fogDensity: { type: "f", value: 0.45 },
	lightPos: { type: "v3", value: new THREE.Vector3( 0, 100, 200 ) },
	lightCol: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	Ka: { type: "v3", value: new THREE.Vector3( 0.1, 0.1, 0.1 ) },
	Kd: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	Ks: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	s: { type: "f", value: 100 },
	texture: { type: "t", value: mytexture3}
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

// Sky
var geometry3 = readObjectFromFile('sky.obj');;
var material3 = new THREE.ShaderMaterial( {
	uniforms: uniforms3,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
} );
var object3 = new THREE.Mesh( geometry3, material3 );

object3.castShadow = false;
object3.receiveShadow = true;

scene.add( object3 );


/*

// Shadow Map Test (Still not have shadow)

// LIGHTS

var ambient = new THREE.AmbientLight( 0x444444 );
scene.add( ambient );

light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2, 1 );
light.position.set( 0, 1500, 1000 );
light.target.position.set( 0, 0, 0 );

light.castShadow = true;

light.shadowCameraNear = 1200;
light.shadowCameraFar = 2500;
light.shadowCameraFov = 50;

//light.shadowCameraVisible = true;

light.shadowBias = 0.0001;

light.shadowMapWidth = 2048;
light.shadowMapHeight = 2048;

scene.add( light );


// GROUND

var geometry4 = new THREE.PlaneBufferGeometry( 100, 100 );
var planeMaterial4 = new THREE.MeshPhongMaterial( { color: 0xffdd99 } );

var ground = new THREE.Mesh( geometry4, planeMaterial4 );

ground.position.set( 0, -2, 0 );
ground.rotation.x = - Math.PI / 2;
ground.scale.set( 100, 100, 100 );

ground.castShadow = false;
ground.receiveShadow = true;

scene.add( ground );

*/

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
