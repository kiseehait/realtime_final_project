function initAdder() {
	var list = document.getElementById("name-list");
	for (var i = 0; i < meshObject.length; i++) {
		var element = document.createElement("option");
		element.text = meshObject[i].o.objectName;
		element.value = meshObject[i].o.objectName;
		list.appendChild(element);
	}
}

var addNewObject = function(name, type, mat, x, y, z, dx, dy, dz) {
	var object = new MeshObject(name);
	object.loadTexture(mat);
	object.loadObject(
		type,
		light1, _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
	);
	object.mesh.position.x = x;
	object.mesh.position.y = y;
	object.mesh.position.z = z;
	object.mesh.castShadow = true;
	object.mesh.receiveShadow = true;

	if (type == "batman.obj" || type == "suzanne.obj" || type == "Trex.obj") object.mesh.geometry.computeVertexNormals();

	scene.add(object.mesh);
	meshObject.push({
		o: object,
		rotFac: new THREE.Vector3( dx, dy, dz )
	});

	var list = document.getElementById("name-list");
	var element = document.createElement("option");
	element.text = name;
	element.value = name;
	list.appendChild(element);
};

var removeObject = function(name) {
	meshObject.forEach(function(obj) {
		if (obj.o.name == name) id = obj.o.id;
	});
	for(var i = meshObject.length - 1; i >= 0; i--) {
		if(meshObject[i].o.objectName == name) {
			scene.remove(meshObject[i].o.mesh);
			meshObject.splice(i, 1);
		}
	}

	var index = $("#name-list").get(0).selectedIndex;
	var list = document.getElementById("name-list");
	list.remove(index);
};

function addObjForm(name, type, mat, x, y, z, dx, dy, dz) {
	dx = parseFloat(dx);
	dy = parseFloat(dy);
	dz = parseFloat(dz);
    addNewObject(name, type, mat, x, y, z, dx, dy, dz);
}



$( document ).ready(function() {
	initAdder();

	// Cube
	addNewObject("box01", "cube.obj", "box.jpg", 5, 5, -5, 0.1, 0.1, 0.0);
});