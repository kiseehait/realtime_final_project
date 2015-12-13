var _VERTEX_SHADER = document.getElementById( 'vertexShader' ).textContent;
var _TEXTURE_FRAGMENT_SHADER = document.getElementById( 'fragmentShader' ).textContent;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

var light = new Light();
light.setColor(1.0,1.0,1.0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cube1 = new MeshObject("cube1");
cube1.loadTexture("box.jpg");
cube1.loadObject(
	"cube.obj",
	light.getUniforms(), _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
cube1.mesh.position.z = -5;
scene.add(cube1.mesh);

var cube2 = new MeshObject("cube2");
cube2.loadTexture("box.jpg");
cube2.loadObject(
	"cube.obj",
	light.getUniforms(), _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
cube2.mesh.position.y = 3;
cube2.mesh.position.z = -5;
scene.add(cube2.mesh);

var ground = new MeshObject("ground");
ground.loadTexture("grass.jpg");
ground.loadObject(
	"cube2.obj",
	light.getUniforms(), _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
ground.mesh.position.y = -102;
ground.setSpecular(0,0,0);
scene.add(ground.mesh);


var sky = new MeshObject("sky");
sky.loadTexture("sky.jpg");
sky.loadObject(
	"sky2.obj",
	light.getUniforms(), _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
);
sky.setSpecular(1,1,1);
scene.add(sky.mesh);

var render = function () {
	requestAnimationFrame( render );
	updateCamera();
	cube1.mesh.rotation.y += 0.01;
	cube1.mesh.rotation.x += 0.01;
	cube2.mesh.rotation.y += 0.01;
	cube2.mesh.rotation.x -= 0.01;
	renderer.render(scene, camera);
};

render();
