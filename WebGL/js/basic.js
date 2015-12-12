var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var uniforms = {
	fogDensity: { type: "f", value: 0.45 },
	lightPos: { type: "v3", value: new THREE.Vector3( 0, 100, 200 ) },
	lightCol: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	Ka: { type: "v3", value: new THREE.Vector3( 0.1, 0.1, 0.1 ) },
	Kd: { type: "v3", value: new THREE.Vector3( 1, 0, 0 ) },
	Ks: { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
	s: { type: "f", value: 100 }
};

var geometry = readObjectFromFile('tree.obj');;
var material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
} );
var tree = new THREE.Mesh( geometry, material );

scene.add( tree );
tree.position.y = -8;
camera.position.z = 12;

var render = function () {
	requestAnimationFrame( render );
	tree.rotation.y += 0.01;
	renderer.render(scene, camera);
};

render();
