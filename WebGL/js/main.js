var _VERTEX_SHADER = document.getElementById( 'vertexShader' ).textContent;
var _TEXTURE_FRAGMENT_SHADER = document.getElementById( 'fragmentShader' ).textContent;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
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

var render = function () {
	requestAnimationFrame( render );
	updateCamera();
	cube.mesh.rotation.y += 0.01;
	cube.mesh.rotation.x += 0.01;
	renderer.render(scene, camera);
};

render();
