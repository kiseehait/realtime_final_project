var _VERTEX_SHADER = document.getElementById( 'vertexShader' ).textContent;
var _TEXTURE_FRAGMENT_SHADER = document.getElementById( 'fragmentShader' ).textContent;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var light = {
		fogDensity: { type: "f", value: 0.45 },
		lightPos: { type: "v3", value: new THREE.Vector3( 0, 100, 200 ) },
		lightCol: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
		Ka: { type: "v3", value: new THREE.Vector3( 0.1, 0.1, 0.1 ) },
		Kd: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
		Ks: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
		s: { type: "f", value: 100 }
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cube = new MeshObject("cube");
cube.loadTexture("box.jpg");
cube.loadObject(
	"cube.obj",
	light, _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
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
