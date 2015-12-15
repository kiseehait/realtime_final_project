var RawTexture = function(textureName) {
	this.textureName = textureName;
};
var cropTo1 = function(n) {
	if(n < 0) return 0;
	if(n > 1) return 1;
	return n;
};
var to255 = function(n) {
	return cropTo1(n)*255;
};
RawTexture.prototype.newSize = function(length) {
	this.width  = this.height = this.length = length;
	this.arrRGBA = new Uint8Array(length * length * 4);
};
RawTexture.prototype.setRGBA = function(x,y,R,G,B,A) {
	this.arrRGBA[4*this.length*x + 4*y    ] = to255(R);
	this.arrRGBA[4*this.length*x + 4*y + 1] = to255(G);
	this.arrRGBA[4*this.length*x + 4*y + 2] = to255(B);
	this.arrRGBA[4*this.length*x + 4*y + 3] = to255(A);
};
RawTexture.prototype.setRGB = function(x,y,R,G,B) {
	this.arrRGBA[4*this.length*x + 4*y    ] = to255(R);
	this.arrRGBA[4*this.length*x + 4*y + 1] = to255(G);
	this.arrRGBA[4*this.length*x + 4*y + 2] = to255(B);
	this.arrRGBA[4*this.length*x + 4*y + 3] = to255(0.5);
};
RawTexture.prototype.setR = function(x,y,R) {
	this.arrRGBA[4*this.length*x + 4*y    ] = to255(R);
};
RawTexture.prototype.setG = function(x,y,R) {
	this.arrRGBA[4*this.length*x + 4*y + 1] = to255(G);
};
RawTexture.prototype.setB = function(x,y,R) {
	this.arrRGBA[4*this.length*x + 4*y + 2] = to255(B);
};
RawTexture.prototype.setA = function(x,y,A) {
	this.arrRGBA[4*this.length*x + 4*y + 3] = to255(A);
};
RawTexture.prototype.getRGBA = function(x,y) {
	return new THREE.Vector4(
		this.arrRGBA[4*this.length*x + 4*y    ],
		this.arrRGBA[4*this.length*x + 4*y + 1],
		this.arrRGBA[4*this.length*x + 4*y + 2],
		this.arrRGBA[4*this.length*x + 4*y + 3]
	);
};
RawTexture.prototype.getRGB = function(x,y) {
	return new THREE.Vector3(
		this.arrRGBA[4*this.length*x + 4*y    ],
		this.arrRGBA[4*this.length*x + 4*y + 1],
		this.arrRGBA[4*this.length*x + 4*y + 2]
	);
};
RawTexture.prototype.getTexture = function() {
	this.dataTexture = new THREE.DataTexture(
		this.arrRGBA, this.length, this.length, THREE.RGBAFormat
	);
	this.dataTexture.needsUpdate = true;
	return this.dataTexture;
};