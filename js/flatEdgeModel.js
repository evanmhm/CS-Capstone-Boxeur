var flatBoxGeometry = [];
var flatBoxMesh = [];

function flatEdgeModel(){
    geometryList[0] = flatBoxGeometry;
    for(var i=0; i<6; i++){
		setUpBasicGeometry(i, 0);
		setUpBoxProperties(i, 0);

		flatBoxMesh[i] = new THREE.Mesh( flatBoxGeometry[i], material );
    }
    //geometryList[0] = flatBoxGeometry;
    meshList[0] = flatBoxMesh;
}