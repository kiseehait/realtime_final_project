// Constructor
var MeshObject = function(objectName) {
	this.objectName = objectName;
	this.Ka = new THREE.Vector3( 0.1, 0.1, 0.1 );
	this.Kd = new THREE.Vector3( 1, 1, 1 );
	this.Ks = new THREE.Vector3( 1, 1, 1 );
	this.s = 100;
	this.light = new Light();
	this.uniforms = {};
};

// Object Loader
MeshObject.prototype.loadObject = function(fileObjName) {
	this.meshGeometry = readObjectFromFile(fileObjName);
};
MeshObject.prototype.loadObject = function(fileObjName,material) {
	this.meshGeometry = readObjectFromFile(fileObjName);
	this.material = new THREE.ShaderMaterial(material);
};
MeshObject.prototype.loadObject = function(fileObjName,light,vertexShader,fragmentShader) {
	this.meshGeometry = readObjectFromFile(fileObjName);
	this.setLight(light);
	this.setVertexShader(vertexShader);
	this.setfragmentShader(fragmentShader);
	this.make();
};

// Texture Loader
MeshObject.prototype.loadTexture = function(fileTextureName) {
	this.texture = THREE.ImageUtils.loadTexture( "./textures/" + fileTextureName );	
};

// Uniforms
MeshObject.prototype.setUniforms = function(uniforms) {
	this.uniforms = uniforms;
};
MeshObject.prototype.addToUniforms = function(moreUniforms) {
	this.uniforms = $.extend({}, this.uniforms, moreUniforms);
};

// Setter
MeshObject.prototype.setAmbient = function(r, g, b ) {
	this.Ks.set(r, g, b );
};
MeshObject.prototype.setDiffuse = function(r, g, b ) {
	this.Ks.set(r, g, b );
};
MeshObject.prototype.setSpecular = function(r, g, b ) {
	this.Ks.set(r, g, b );
};
MeshObject.prototype.setSpecularPower = function(s ) {
	this.s = s;
};
MeshObject.prototype.setLight = function(light ) {
	this.light = light;
};
MeshObject.prototype.setVertexShader = function(vertexShader) {
	this.vertexShader = vertexShader;
};
MeshObject.prototype.setfragmentShader = function(fragmentShader) {
	this.fragmentShader = fragmentShader;
};



// Make
MeshObject.prototype.makeUniforms = function() {
	this.setUniforms(
	{
		texture: { type: "t", value: this.texture },
		Ka: { type: "v3", value: this.Ka },
		Kd: { type: "v3", value: this.Kd },
		Ks: { type: "v3", value: this.Ks },
		s: { type: "f", value: this.s },
		fogDensity: { type: "f", value: this.fogDensity },
		lightPos: { type: "v3", value: this.light.lightPos },
		lightCol: { type: "v3", value: this.light.lightCol }
	}
	);
};
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
	this.makeUniforms();
	this.makeMaterial();
	this.makeMesh();
};