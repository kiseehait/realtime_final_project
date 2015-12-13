var _VERTEX_SHADER = document.getElementById( 'vertexShader' ).textContent;
var _TEXTURE_FRAGMENT_SHADER = document.getElementById( 'fragmentShader' ).textContent;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
camera.position.z = 5;

var light = new Light();
light.setColor(1.0,1.0,1.0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cube = new MeshObject("cube");
cube.loadTexture("box.jpg");
cube.loadObject(
	"cube.obj",
	light.getUniforms(), _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
scene.add(cube.mesh);

var cube2 = new MeshObject("cube2");
cube2.loadTexture("grass.jpg");
cube2.loadObject(
	"cube2.obj",
	light.getUniforms(), _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
cube2.mesh.position.y = -102;
scene.add(cube2.mesh);


var sky2 = new MeshObject("sky2");
sky2.loadTexture("sky.jpg");
sky2.loadObject(
	"sky2.obj",
	light.getUniforms(), _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
scene.add(sky2.mesh);

var render = function () {
	requestAnimationFrame( render );
	updateCamera();
	cube.mesh.rotation.y += 0.01;
	cube.mesh.rotation.x += 0.01;
	renderer.render(scene, camera);
};

render();
