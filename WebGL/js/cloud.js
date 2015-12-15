
// Cloud Generate by Perlin Noise
var Plane = new MeshObject("cloud");
var nL = 32;
var L = nL<<4;
var planeTexture = new RawTexture("cloud");
planeTexture.newSize(L);
var cloud1 = new RawTexture("cloud1");
var cloud2 = new RawTexture("cloud2");
cloud1.newSize(L);
cloud2.newSize(L);
var noise = new RawTexture("noise");
var noise2 = new RawTexture("noise2");
noise.newSize(nL+1);
noise2.newSize(nL+1);
function NoiseRandom() {
	return Math.random();
}
function BilinearInterpolate(v1,v2,v3,v4,x,y) {
	var cX1 = v1 + x*(v2-v1);
	var cX2 = v3 + x*(v4-v3);
	return  cX1 + y*(cX2-cX1);
}
for(var i=0;i<nL+1;i++) {
	for(var j=0;j<nL+1;j++) {
		var rand = NoiseRandom();
		noise.setRGB(i,j,rand,rand,rand);
		rand = NoiseRandom();
		noise2.setRGB(i,j,rand,rand,rand);
	}
}
for(var i=0;i<L;i++) {
	for(var j=0;j<L;j++) {
		var x = i/L*nL, y = j/L*nL;
		var x1 = Math.floor(x), x2 = Math.ceil(x);
		var y1 = Math.floor(y), y2 = Math.ceil(y);
		var v1 = noise.getGray(x1,y1);
		var v2 = noise.getGray(x2,y1);
		var v3 = noise.getGray(x1,y2);
		var v4 = noise.getGray(x2,y2);
		var s  = BilinearInterpolate(v1,v2,v3,v4,x-x1,y-y1);
		cloud1.setRGBA(i,j,s,s,s,s);
		
		v1 = noise2.getGray(x1,y1);
		v2 = noise2.getGray(x2,y1);
		v3 = noise2.getGray(x1,y2);
		v4 = noise2.getGray(x2,y2);
		s  = BilinearInterpolate(v1,v2,v3,v4,x-x1,y-y1);
		cloud2.setRGBA(i,j,s,s,s,s);
	}
}
var blendTimes = 0;
for(var k=nL;k<L;k<<=1) {
	blendTimes++;
	for(var i=0;i<nL+1;i++) {
		for(var j=0;j<nL+1;j++) {
			var rand = NoiseRandom();
			noise.setRGB(i,j,rand,rand,rand);
		}
	}
	for(var i=0;i<k;i++) {
		for(var j=0;j<k;j++) {
			var x = i/k*nL, y = j/k*nL;
			var x1 = Math.floor(x), x2 = Math.ceil(x);
			var y1 = Math.floor(y), y2 = Math.ceil(y);
			var v1 = noise.getGray(x1,y1);
			var v2 = noise.getGray(x2,y1);
			var v3 = noise.getGray(x1,y2);
			var v4 = noise.getGray(x2,y2);
			var s = BilinearInterpolate(v1,v2,v3,v4,x-x1,y-y1);
			for(var p=0;p<L;p+=k) {
				for(var q=0;q<L;q+=k) {
					cloud1.blend(p+i,q+j,s,blendTimes);
				}
			}
			
			v1 = noise2.getGray(x1,y1);
			v2 = noise2.getGray(x2,y1);
			v3 = noise2.getGray(x1,y2);
			v4 = noise2.getGray(x2,y2);
			s  = BilinearInterpolate(v1,v2,v3,v4,x-x1,y-y1);
			for(var p=0;p<L;p+=k) {
				for(var q=0;q<L;q+=k) {
					cloud2.blend(p+i,q+j,s,blendTimes);
				}
			}
		}
	}
}

for(var i=0;i<L;i++) {
	for(var j=0;j<L;j++) {
		var vec4 = cloud1.getRGBA(i,j);
		if(vec4.w < 0.5) {
			cloud1.setA(i,j,0);
		}
		
		vec4 = cloud2.getRGBA(i,j);
		if(vec4.w < 0.5) {
			cloud2.setA(i,j,0);
		}
		planeTexture.setRGBAV4(i,j,cloud1.getRGBA(i,j));
	}
}
planeTexture.dataTexture.anisotropy = 2;
Plane.setTexture(planeTexture.dataTexture);
Plane.loadTHREEObject(
	new THREE.PlaneGeometry(100,100,10,10),
	light, _VERTEX_SHADER, _PURE_TEXTURE_FRAGMENT_SHADER
);
Plane.mesh.position.y = 1000;
Plane.mesh.scale.x = Plane.mesh.scale.y = 100;
Plane.mesh.rotation.x = Math.PI/2;
Plane.mesh.material.needsUpdate = true;
scene.add(Plane.mesh);
var CloudTiming = 0, CloudSelect = true, CloudMov = 0, CloudMovDist = 3;
function updateCloud() {
	if(CloudTiming >= 1) {
		CloudSelect = false;
		CloudTiming = 1;
	}
	else if(CloudTiming <= 0){
		CloudSelect = true;
		CloudTiming = 0;
	}
	if(CloudSelect)
		CloudTiming += 0.01;
	else
		CloudTiming -= 0.01;
	CloudMov += 0.005;
	var Mov = 0;
	if(CloudMov-Math.floor(CloudMov) == 0) {
		Mov = CloudMov;
		Plane.mesh.position.z = 0;
	}
	else {
		Mov = Math.floor(CloudMov);
		Plane.mesh.position.z -= CloudMovDist;
	}
	for(var i=0;i<planeTexture.length;i++) {
		for(var j=0;j<planeTexture.length;j++) {
			var x = (i+Mov)%cloud1.length, y = j;
			var c1 = cloud1.getRGBA(x,y), c2 = cloud2.getRGBA(x,y), halfL = planeTexture.length>>1;
			c1.multiplyScalar(CloudTiming);
			c2.multiplyScalar(1-CloudTiming);
			c1.add(c2);
			planeTexture.setRGBAV4(i,j,c1);
			
			var distance = ((i-halfL)*(i-halfL)+(j-halfL)*(j-halfL))/halfL/halfL;
			planeTexture.setA(i,j,(1-distance)*c1.x);
		}
	}
	planeTexture.update();
}
updateCloud();
var cloudInterval = setInterval(updateCloud,200);