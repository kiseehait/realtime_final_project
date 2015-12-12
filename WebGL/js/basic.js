var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var vec3 = function (x,y,z) {
	return new THREE.Vector3(x,y,z);
}
var uv = function (x,y) {
	return new THREE.Vector2(x,y);
}

var vertices = [
	vec3(1,-1,-1),
	vec3(1,-1,1),
	vec3(-1,-1,1),
	vec3(-1,-1,-1),
	vec3(1,1,-1),
	vec3(1,1,1),
	vec3(-1,1,1),
	vec3(-1,1,-1)
];
var normals = [
	vec3( 0, 0,-1),
	vec3(-1,-0,-0),
	vec3(-0,-0, 1),
	vec3(-0, 0, 1),
	vec3( 1,-0, 0),
	vec3( 1, 0, 0),
	vec3( 0, 1,-0),
	vec3(-0,-1, 0)
];
var uvs = [
	uv(0.748573,0.750412),
	uv(0.749279,0.501284),
	uv(0.999110,0.501077),
	uv(0.999455,0.750380),
	uv(0.250471,0.500702),
	uv(0.249682,0.749677),
	uv(0.001085,0.750380),
	uv(0.001517,0.499994),
	uv(0.499422,0.500239),
	uv(0.500149,0.750166),
	uv(0.748355,0.998230),
	uv(0.500193,0.998728),
	uv(0.498993,0.250415),
	uv(0.748953,0.250920)
];

var face3 = function (a,i,x,b,j,y,c,k,z) {
	a--;b--;c--;i--;j--;k--;x--;y--;z--;
	var face = new THREE.Face3(a,b,c);
	console.log("Face " + a + " " + b + " " + c);
	face.normal.set(normals[x].x,normals[x].y,normals[x].z);
	//return face;
	return new THREE.Vector2(face,[uvs[i],uvs[j],uvs[k]]);
}
var faces = [
	face3(5,1,1,1,2,1,4,3,1),
	face3(5,1,1,4,3,1,8,4,1),
	face3(3,5,2,7,6,2,8,7,2),
	face3(3,5,2,8,7,2,4,8,2),
	face3(2,9,3,6,10,3,3,5,3),
	face3(6,10,4,7,6,4,3,5,4),
	face3(1,2,5,5,1,5,2,9,5),
	face3(5,1,6,6,10,6,2,9,6),
	face3(5,1,7,8,11,7,6,10,7),
	face3(8,11,7,7,12,7,6,10,7),
	face3(1,2,8,2,9,8,3,13,8),
	face3(1,2,8,3,13,8,4,14,8)
]

function readObjectFromFile(file) {
	var geometry = new THREE.Geometry();

	var oFile = new XMLHttpRequest();
	oFile.open("GET", file, false);

	var allText = "";

	oFile.onreadystatechange = function ()
	{
		if(oFile.readyState === 4)
		{
			if(oFile.status === 200 || oFile.status == 0)
			{
				allText = oFile.responseText;
				// alert(allText);
			}
		}
	}
	oFile.send(null);

	var lines = allText.split('\n');
	for(var line = 0; line < lines.length; line++) {
		// console.log(lines[line]);
		switch (lines[line].substring(0, 2)) {
			case "v ":
				var vstring = lines[line].split(' ');
				vertices.push(
					new THREE.Vector3( parseFloat(vstring[1]), parseFloat(vstring[2]), parseFloat(vstring[3]) )
				);

				// for debugging
				console.log("v " + parseFloat(vstring[1]) + " " + parseFloat(vstring[2]) + " " + parseFloat(vstring[3]));

				break;
			case "vt":
				var uvstring = lines[line].split(' ');
				uvs.push(
					new THREE.Vector3( parseFloat(uvstring[1]), parseFloat(uvstring[2]) )
				);

				// for debugging
				console.log("vt " + parseFloat(uvstring[1]) + " " + parseFloat(uvstring[2]));

				break;
			case "vn":
				var nstring = lines[line].split(' ');
				normals.push(
					new THREE.Vector3( parseFloat(nstring[1]), parseFloat(nstring[2]), parseFloat(nstring[3]) )
				);

				// for debugging
				console.log("n " + parseFloat(nstring[1]) + " " + parseFloat(nstring[2]) + " " + parseFloat(nstring[3]));

				break;
			case "f ":
				var fstring = lines[line].split(' ');
				var fs0 = fstring[1].split('/');
				var fs1 = fstring[2].split('/');
				var fs2 = fstring[3].split('/');

				faces.push(
					face3(parseInt(fs0[0]), parseInt(fs0[1]), parseInt(fs0[2]), 
						parseInt(fs1[0]), parseInt(fs1[1]), parseInt(fs1[2]), 
						parseInt(fs2[0]), parseInt(fs2[1]), parseInt(fs2[2]))
				);

				// for debugging
				console.log("f " + parseInt(fs0[0]) + "/" + parseInt(fs0[1]) + "/" + parseInt(fs0[2]) + " " + 
					parseInt(fs1[0]) + "/" + parseInt(fs1[1]) + "/" + parseInt(fs1[2]) + " " + 
					parseInt(fs2[0]) + "/" + parseInt(fs2[1]) + "/" + parseInt(fs2[2]));

				break;
			case "us":
				var mstring = lines[line].split(' ');

				// for debugging
				console.log("material " + mstring[1]);
		}
	}
}

readObjectFromFile('./js/tree.obj');

var geometry2 = new THREE.Geometry();

for(var i=0;i<vertices.length;i++) {
	geometry2.vertices.push(vertices[i]);
}

for(var i=0;i<faces.length;i++) {
	geometry2.faces.push(faces[i].x);
	geometry2.faceVertexUvs[0].push(faces[i].y);
}


var material = new THREE.MeshBasicMaterial( { color: 0xaaffaa } );
var cube = new THREE.Mesh( geometry2, material );

scene.add( cube );

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

render();
