var fingerBoxGeometry = [];
var fingerBoxMesh = [];

function fingerBoxModel(){
    for(var i=0; i<6; i++){
		setUpBasicGeometry(i, 1);
		setUpBoxProperties(i, 1);

		fingerBoxMesh[i] = new THREE.Mesh( fingerBoxGeometry[i], material );
    }
    geometryList[1] = fingerBoxGeometry;
    meshList[1] = fingerBoxMesh;
}