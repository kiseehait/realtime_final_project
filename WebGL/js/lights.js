// Constructor
var Light = function() {
	this.fogDensity = 0.45;
	this.lightPos = new THREE.Vector3( 0, 100, 200 );
	this.lightCol = new THREE.Vector3( 1, 0.5, 1 );
};

// Uniforms
Light.prototype.getUniforms = function() {
	return (
	{
		fogDensity: { type: "f", value: this.fogDensity },
		lightPos: { type: "v3", value: this.lightPos },
		lightCol: { type: "v3", value: this.lightCol }
	}
	);
};

// Setter
Light.prototype.setColor = function(r, g, b ) {
	this.lightCol.set(r, g, b );
};
Light.prototype.setPosition = function(x, y, z ) {
	this.lightPos.set(x, y, z );
};