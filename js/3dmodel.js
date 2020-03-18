var camera, scene, renderer;
var material;
var controls;
var grid;
var raycaster, holeGeometry, holeMaterial, holeMesh;
var testHole;
var testsubtract;

var geometryList = [];
var meshList = [];
var edgeType = 0;

var holesList = []; //Hole list for saving the box

var lastWidth = 50, lastDepth = 50, lastHeight = 50; // !!!!!!  USE THESE FOR SAVING THE BOX SIZE !!!!!!!!!!!//
var formWidth, formDepth, formHeight;

var canvas = document.getElementById("model_canvas").getContext("webgl");
var canvasDims = document.getElementById("model_canvas").getBoundingClientRect();;
var width = canvasDims.width;
var height = canvasDims.height;
var aspect = width/height;

var mouse = new THREE.Vector2();

var removeMouseListener = false;
var removeHoleClickListener = false;

init();

setListeners();

animate();

//Set up variables, scene and renderer elements.
function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	camera = new THREE.OrthographicCamera( 0.3 * width / - 2, 0.3 * width / 2, 0.3 * height / 2, 0.3 * height / - 2, 1, 1000 );
	
	camera.position.x = 51;
	camera.position.y = 51;
	camera.position.z = 51;

	scene.add(camera);

	material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

	flatEdgeModel();

	for(var i=0; i<6; i++){
		scene.add(meshList[0][i]);
	}

	holeGeometry = new THREE.BoxGeometry(5, 5, 10);
	holeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
	holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
	testHole = new THREE.Mesh(holeGeometry, holeMaterial);
	
	scene.add(holeMesh);

	raycaster = new THREE.Raycaster();
	raycaster.params.Line.threshold = 3;

	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: model_canvas } );
	renderer.setSize(width, height, false);

	controls = new THREE.OrbitControls(camera, document.getElementById("model_canvas"));	
}

//Animation loop
function animate() {

	onWindowResize();

	controls.update();
	requestAnimationFrame( animate );

	render();

}

//Function to resize canvas when window changes size. 
function onWindowResize(){

	canvasDims = document.getElementById("model_canvas").getBoundingClientRect();
	width = canvasDims.width;
	height = canvasDims.height;

	aspect = width / height;

	if (canvas.width !== width || canvas.height !== height) {
		renderer.setSize(width, height, false);
		camera.aspect = aspect;
	}

		camera.updateProjectionMatrix();

}

//Renderer function
function render(){

	if(scene.getObjectByName('grid') != null){
		raycaster.setFromCamera( mouse, camera );

		var intersects = raycaster.intersectObject( grid );

		if ( intersects.length > 0 ) {

			var fixed = intersects[0].point;
			var fix = new THREE.Vector3(0, 0, 2.5)
			
			holeMesh.position.copy( fixed.sub(fix) );
			holeMesh.visible = true;

		} else {

			holeMesh.visible = false;

		}
	} else {

		holeMesh.visible = false;

	}

	renderer.render( scene, camera );
}

//
//
//
//
//Basic 3d code ends here, the following functions are listener handlers and helper functions for code clarity
//
//
//
//


//Function to change edge types
function edgeTypeHandler(event){

	switch(event.target.id){
		case "flat":

			break;
		case "finger":
			break;
		case "t-slot":
			break;
	}
}

//Change box geometry based on form values when a slider is being input or if a value is entered into the form.
//Really need to think of a more elegant way to do each face other than a switch.
function updateDimensions(event){


	formWidth = document.getElementById("width").value;
	formHeight = document.getElementById("height").value;
	formDepth = document.getElementById("depth").value;

	//Only 2 sides need to be translated depending on what measurement is being changed
	switch(event.target.id){
		case "width":
			geometryList[edgeType][1].translate((formWidth-lastWidth)/2, 0, 0);
			geometryList[edgeType][3].translate((-(formWidth-lastWidth))/2, 0, 0);
			break;
		case "height":
			geometryList[edgeType][4].translate(0, (formHeight-lastHeight)/2, 0);
			geometryList[edgeType][5].translate(0, (-(formHeight-lastHeight))/2, 0);
			break;
		case "depth":
			geometryList[edgeType][0].translate(0, 0, (formDepth-lastDepth)/2);
			geometryList[edgeType][2].translate(0, 0, (-(formDepth-lastDepth))/2);
			break;
	}
	
	//We want two measurements of each box face to scale, and one to translate, in order to preserve eventual material thickness property
	for(var i=0; i<6; i++){
		switch(i){
			case 0: //Front
				geometryList[edgeType][i].scale(formWidth/lastWidth, formHeight/lastHeight, 1);
				break;
			case 1: //Right
				geometryList[edgeType][i].scale(1, formHeight/lastHeight, formDepth/lastDepth);
				break;
			case 2: //Back
				geometryList[edgeType][i].scale(formWidth/lastWidth, formHeight/lastHeight, 1);
				break;
			case 3: //Left
				geometryList[edgeType][i].scale(1, formHeight/lastHeight, formDepth/lastDepth);
				break;
			case 4: //Top
				geometryList[edgeType][i].scale(formWidth/lastWidth, 1, formDepth/lastDepth);
				break;
			case 5: //Bottom
				geometryList[edgeType][i].scale(formWidth/lastWidth, 1, formDepth/lastDepth);
				break;
		}
		geometryList[edgeType][i].verticesNeedUpdate = true;
	}

	//console.log(event.target.id);

	lastWidth = formWidth;
	lastHeight = formHeight;
	lastDepth = formDepth;

}

//Function to change camera angle, call grid placement, and set up listener for hole placement helper 
function holePlacement(event, x, y, z){

	camera.position.x = x; camera.position.y = y; camera.position.z = z;
	gridPlacer(event.target.id); 
	
	if(removeHoleClickListener == true){
		document.getElementById("model_canvas").removeEventListener('click', helper, false);
		removeHoleClickListener = false;
	} else {
		document.getElementById("model_canvas").addEventListener('click', helper, false);
		removeHoleClickListener = true;
	}

}

//function to swap grid placement depending on which face button was clicked
function gridPlacer(face){

	if(scene.getObjectByName('grid') != null){
		scene.remove(grid);
	}
	
	switch(face){
		case "front": 
			grid = new THREE.GridHelper(lastWidth, 10);
			grid.translateZ(lastDepth/2);
			grid.rotateX(Math.PI/2);
			break;
		case "back":
			grid = new THREE.GridHelper(lastWidth, 10);
			grid.translateZ(-lastDepth/2);
			grid.rotateX(Math.PI/2);
			break;
		case "top":
			grid = new THREE.GridHelper(lastHeight, 10);
			grid.translateY(lastHeight/2);
			break;
		case "bottom":
			grid = new THREE.GridHelper(lastHeight, 10);
			grid.translateY(-lastHeight/2);
			break;
		case "right":
			grid = new THREE.GridHelper(lastDepth, 10);
			grid.translateX(lastWidth/2);
			grid.rotateZ(Math.PI/2);
			break;
		case "left":
			grid = new THREE.GridHelper(lastDepth, 10);
			grid.translateX(-lastWidth/2);
			grid.rotateZ(Math.PI/2);
			break;
	}

	grid.name = "grid";
	scene.add(grid);
	
	if(removeMouseListener == true){
		document.getElementById("model_canvas").removeEventListener('mousemove', onCanvasMouseMove, false);
		removeMouseListener = false;
	} else {
		document.getElementById("model_canvas").addEventListener('mousemove', onCanvasMouseMove, false);
		removeMouseListener = true;
	}
}

//Helper function to place a hole. 
function helper(){

	if(scene.getObjectByName('grid') != null){
		raycaster.setFromCamera( mouse, camera );

		var intersects = raycaster.intersectObject( grid );

		if ( intersects.length > 0 ) {

			var intpoint = intersects[0].point;

			//scene.add(testHole);
			testHole.translateX(intpoint.x);
			testHole.translateY(intpoint.y);
			testHole.translateZ(intpoint.z);

			var newmat = new THREE.MeshBasicMaterial({ color: 0xff0000, vertexColors: THREE.FaceColors });
			testsubtract = threecsg.subtract(meshList[edgeType][0], testHole, newmat);
			scene.remove(meshList[edgeType][0]);
			scene.add(testsubtract);
			
			/*  SAVE HOLE OBJECTS HERE, THIS IS WHERE HOLE PLACEMENT OCCURS */
			

		} 
	}
}

//Function tracking mousemovement when in hole placement mode
function onCanvasMouseMove(event){

	event.preventDefault();

	mouse.x = ( ( event.clientX - canvasDims.left ) / ( canvasDims.right - canvasDims.left ) ) * 2 - 1;
	mouse.y = - ( ( event.clientY - canvasDims.top ) / ( canvasDims.bottom - canvasDims.top ) ) * 2 + 1;

	//console.log(mouse);
}

//Function to set up listeners. Keeps code a little cleaner near the top.

function setListeners(){
	//Set listeners for the dimension options
	document.getElementById("width").addEventListener('input', updateDimensions, false);
	document.getElementById("height").addEventListener('input', updateDimensions, false);
	document.getElementById("depth").addEventListener('input', updateDimensions,false);

	//Set listeners for edge types
	document.getElementById("flat").addEventListener('click', edgeTypeHandler, false);
	document.getElementById("fingers").addEventListener('click', edgeTypeHandler, false);
	document.getElementById("t-slot").addEventListener('click', edgeTypeHandler, false);

	//Set listeners for what side to look at during hole placement
	document.getElementById("front").addEventListener('click', function(e){holePlacement(e, 0, 0, 51)}, false);
	document.getElementById("back").addEventListener('click', function(e){holePlacement(e, 0, 0, -51)}, false);
	document.getElementById("top").addEventListener('click', function(e){holePlacement(e, 0, 51, 0)}, false);
	document.getElementById("bottom").addEventListener('click', function(e){holePlacement(e, 0, -51, 0)}, false);
	document.getElementById("right").addEventListener('click', function(e){holePlacement(e, 51, 0, 0)}, false);
	document.getElementById("left").addEventListener('click', function(e){holePlacement(e, -51, 0, 0)}, false);
}


// When saving the data for the entire object, you'll need the size of the object itself, edge type (not currently implemented) 
// and a list/array of holes, using the hole class below.

//  CODE FOR HOLES OBJECT  //
//Constructor
class Hole {
	constructor(x, y, z, type, face) {
		this.x = x;
		this.y = y;
		this.z = z;
		
		this.type = type;
		this.face = face;
	}
}
