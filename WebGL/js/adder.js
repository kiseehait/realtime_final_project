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
		o: object.mesh,
		rotFac: new THREE.Vector3( dx, dy, dz )
	});
};