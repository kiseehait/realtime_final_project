var MeshObject = function(objectName) {
	this.objectName = objectName;
	this.uniforms = {};
};

// Loader
MeshObject.prototype.loadObject = function(fileObjName) {
	this.meshGeometry = readObjectFromFile(fileObjName);
};
MeshObject.prototype.loadObject = function(fileObjName,material) {
	this.meshGeometry = readObjectFromFile(fileObjName);
	this.material = new THREE.ShaderMaterial(material);
};
MeshObject.prototype.loadObject = function(fileObjName,uniforms,vertexShader,fragmentShader) {
	this.meshGeometry = readObjectFromFile(fileObjName);
	this.addToUniforms(uniforms);
	this.setVertexShader(vertexShader);
	this.setfragmentShader(fragmentShader);
	this.make();
};

// Uniforms
MeshObject.prototype.setUniforms = function(uniforms) {
	this.uniforms = uniforms;
};
MeshObject.prototype.addToUniforms = function(moreUniforms) {
	this.uniforms = $.extend({}, this.uniforms, moreUniforms);
};

// Vertex Shader
MeshObject.prototype.setVertexShader = function(vertexShader) {
	this.vertexShader = vertexShader;
};

// Fragment Shader
MeshObject.prototype.setfragmentShader = function(fragmentShader) {
	this.fragmentShader = fragmentShader;
};

// Texture
MeshObject.prototype.loadTexture = function(fileTextureName) {
	this.texture = THREE.ImageUtils.loadTexture( "./textures/" + fileTextureName );
	this.uniforms["texture"] = { type: "t", value: this.texture };	
};

// Make
MeshObject.prototype.makeMaterial = function() {
	this.material = new THREE.ShaderMaterial( {
		uniforms : this.uniforms,
		vertexShader : this.vertexShader,
		fragmentShader : this.fragmentShader
	});
};
MeshObject.prototype.makeMesh = function() {
	this.mesh = new THREE.Mesh(this.meshGeometry,this.material);
};
MeshObject.prototype.make = function() {
	this.makeMaterial();
	this.makeMesh();
};