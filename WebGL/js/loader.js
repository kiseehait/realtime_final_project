// Load Object from file *.obj
function readObjectFromFile(file) {
	var geometry = new THREE.Geometry();

	// Reader
	var oFile = new XMLHttpRequest();
	oFile.open("GET", "./obj/"+file, false);

	var allText = "";

	oFile.onreadystatechange = function ()
	{
		if(oFile.readyState === 4)
		{
			if(oFile.status === 200 || oFile.status == 0)
			{
				allText = oFile.responseText;
				// alert(allText);
			}
		}
	}
	oFile.send(null);

	var vec3 = function (x,y,z) {
		return new THREE.Vector3(x,y,z);
	}
	var uv = function (x,y) {
		return new THREE.Vector2(x,y);
	}
	var face3 = function (a,i,x,b,j,y,c,k,z) {
		a--;b--;c--;i--;j--;k--;x--;y--;z--;
		var face = new THREE.Face3(a,b,c);
		face.normal.set(normals[x].x,normals[x].y,normals[x].z);
		return new THREE.Vector2(face,[uvs[i],uvs[j],uvs[k]]);
	}

	var vertices = [];
	var normals = [];
	var uvs = [];
	var faces = [];
	
	// Parser
	var lines = allText.split('\n');
	for(var line = 0; line < lines.length; line++) {
		switch (lines[line].substring(0, 2)) {
			case "v ":
				var vstring = lines[line].split(' ');
				vertices.push( vec3(parseFloat(vstring[1]), parseFloat(vstring[2]), parseFloat(vstring[3]) ) );
				break;
			case "vt":
				var uvstring = lines[line].split(' ');
				uvs.push( uv( parseFloat(uvstring[1]), parseFloat(uvstring[2]) ) );
				break;
			case "vn":
				var nstring = lines[line].split(' ');
				normals.push( vec3( parseFloat(nstring[1]), parseFloat(nstring[2]), parseFloat(nstring[3]) ) );
				break;
			case "f ":
				var fstring = lines[line].split(' ');
				var fs0 = fstring[1].split('/');
				var fs1 = fstring[2].split('/');
				var fs2 = fstring[3].split('/');
				faces.push(
					face3(parseInt(fs0[0]), parseInt(fs0[1]), parseInt(fs0[2]), 
						parseInt(fs1[0]), parseInt(fs1[1]), parseInt(fs1[2]), 
						parseInt(fs2[0]), parseInt(fs2[1]), parseInt(fs2[2]))
				);
				break;
			case "us":
				var mstring = lines[line].split(' ');

				// for debugging
				console.log("material " + mstring[1]);
		}
	}
	
	// Finishing
	for(var i=0;i<vertices.length;i++) {
		geometry.vertices.push(vertices[i]);
	}

	for(var i=0;i<faces.length;i++) {
		geometry.faces.push(faces[i].x);
		geometry.faceVertexUvs[0].push(faces[i].y);
	}
	
	return geometry;
}
