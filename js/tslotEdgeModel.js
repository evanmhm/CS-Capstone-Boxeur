var tslotBoxGeometry = [];
var tslotBoxGeometry = [];

function tslotBoxModel(){
    for(var i=0; i<6; i++){
		setUpBasicGeometry(i, 2);
		setUpBoxProperties(i, 2);

		tslotBoxMesh[i] = new THREE.Mesh( tslotBoxGeometry[i], material );
    }
    geometryList[2] = tslotBoxGeometry;
    meshList[2] = tslotBoxMesh;
}