var name_id = 101;

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
};

function addObjForm(type, mat, x, y, z, dx, dy, dz) {
	dx = parseFloat(dx);
	dy = parseFloat(dy);
	dz = parseFloat(dz);
    addObject("" + name_id++, type, mat, x, y, z, dx, dy, dz);
}