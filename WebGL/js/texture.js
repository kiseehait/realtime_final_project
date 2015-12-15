var RawTexture = function(textureName) {
	this.textureName = textureName;
	this.blendTimes
};
var cropTo1 = function(n) {
	if(n < 0) return 0;
	if(n > 1) return 1;
	return n;
};
var to255 = function(n) {
	return cropTo1(n)*255;
};
var to1 = function(n) {
	return crop(n,0,255)/255;
}
RawTexture.prototype.newSize = function(length) {
	this.width  = this.height = this.length = length;
	this.dataTexture = new THREE.DataTexture(
		new Uint8Array(length * length * 4), this.length, this.length, THREE.RGBAFormat
	);
	this.dataTexture.needsUpdate = true;
};
RawTexture.prototype.setRGBAV4 = function(x,y,vec4) {
	this.dataTexture.image.data[4*this.length*x + 4*y    ] = to255(vec4.x);
	this.dataTexture.image.data[4*this.length*x + 4*y + 1] = to255(vec4.y);
	this.dataTexture.image.data[4*this.length*x + 4*y + 2] = to255(vec4.z);
	this.dataTexture.image.data[4*this.length*x + 4*y + 3] = to255(vec4.w);
};
RawTexture.prototype.setRGBA = function(x,y,R,G,B,A) {
	this.dataTexture.image.data[4*this.length*x + 4*y    ] = to255(R);
	this.dataTexture.image.data[4*this.length*x + 4*y + 1] = to255(G);
	this.dataTexture.image.data[4*this.length*x + 4*y + 2] = to255(B);
	this.dataTexture.image.data[4*this.length*x + 4*y + 3] = to255(A);
};
RawTexture.prototype.setRGBV3 = function(x,y,vec3) {
	this.dataTexture.image.data[4*this.length*x + 4*y    ] = to255(vec3.x);
	this.dataTexture.image.data[4*this.length*x + 4*y + 1] = to255(vec3.y);
	this.dataTexture.image.data[4*this.length*x + 4*y + 2] = to255(vec3.z);
	this.dataTexture.image.data[4*this.length*x + 4*y + 3] = to255(1);
};
RawTexture.prototype.setRGB = function(x,y,R,G,B) {
	this.dataTexture.image.data[4*this.length*x + 4*y    ] = to255(R);
	this.dataTexture.image.data[4*this.length*x + 4*y + 1] = to255(G);
	this.dataTexture.image.data[4*this.length*x + 4*y + 2] = to255(B);
	this.dataTexture.image.data[4*this.length*x + 4*y + 3] = to255(1);
};
RawTexture.prototype.setR = function(x,y,R) {
	this.dataTexture.image.data[4*this.length*x + 4*y    ] = to255(R);
};
RawTexture.prototype.setG = function(x,y,R) {
	this.dataTexture.image.data[4*this.length*x + 4*y + 1] = to255(G);
};
RawTexture.prototype.setB = function(x,y,R) {
	this.dataTexture.image.data[4*this.length*x + 4*y + 2] = to255(B);
};
RawTexture.prototype.setA = function(x,y,A) {
	this.dataTexture.image.data[4*this.length*x + 4*y + 3] = to255(A);
};
RawTexture.prototype.getRGBA = function(x,y) {
	return new THREE.Vector4(
		to1(this.dataTexture.image.data[4*this.length*x + 4*y    ]),
		to1(this.dataTexture.image.data[4*this.length*x + 4*y + 1]),
		to1(this.dataTexture.image.data[4*this.length*x + 4*y + 2]),
		to1(this.dataTexture.image.data[4*this.length*x + 4*y + 3])
	);
};
RawTexture.prototype.getRGB = function(x,y) {
	return new THREE.Vector3(
		to1(this.dataTexture.image.data[4*this.length*x + 4*y    ]),
		to1(this.dataTexture.image.data[4*this.length*x + 4*y + 1]),
		to1(this.dataTexture.image.data[4*this.length*x + 4*y + 2])
	);
};
RawTexture.prototype.getGray = function(x,y) {
	return to1(
		( this.dataTexture.image.data[4*this.length*x + 4*y    ] +
			this.dataTexture.image.data[4*this.length*x + 4*y + 1] +
			this.dataTexture.image.data[4*this.length*x + 4*y + 2] )/3
	);
};
RawTexture.prototype.blend = function(x,y,c,blendTimes) {
	c = to255(c);
	this.dataTexture.image.data[4*this.length*x + 4*y    ] = (this.dataTexture.image.data[4*this.length*x + 4*y    ]*blendTimes + c)/(blendTimes+1);
	this.dataTexture.image.data[4*this.length*x + 4*y + 1] = (this.dataTexture.image.data[4*this.length*x + 4*y + 1]*blendTimes + c)/(blendTimes+1);
	this.dataTexture.image.data[4*this.length*x + 4*y + 2] = (this.dataTexture.image.data[4*this.length*x + 4*y + 2]*blendTimes + c)/(blendTimes+1);
	this.dataTexture.image.data[4*this.length*x + 4*y + 3] = (this.dataTexture.image.data[4*this.length*x + 4*y + 3]*blendTimes + c)/(blendTimes+1);
};
RawTexture.prototype.update = function() {
	this.dataTexture.needsUpdate = true;
}