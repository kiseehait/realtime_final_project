function initAdder() {
	var list = document.getElementById("name-list");
	for (var i = 0; i < meshObject.length; i++) {
		var element = document.createElement("option");
		element.text = meshObject[i].o.objectName;
		element.value = meshObject[i].o.objectName;
		list.appendChild(element);
	}
}

$( document ).ready(function() {
	initAdder();
});

var addObject = function(name, type, mat, x, y, z, dx, dy, dz) {
	var object = new MeshObject(name);
	object.loadTexture(mat);
	object.loadObject(
		type,
		light, _VERTEX_SHADER, _TEXTURE_FRAGMENT_SHADER
	);
	object.mesh.position.y = x;
	object.mesh.position.x = y;
	object.mesh.position.z = z;
	object.mesh.castShadow = true;
	object.mesh.receiveShadow = true;
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
    addObject(name, type, mat, x, y, z, dx, dy, dz);
}