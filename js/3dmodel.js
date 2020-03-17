var camera, scene, renderer;
var geometry = [];
var mesh = [];
var material;
var controls;
var grid;
var raycaster, holeGeometry, holeMaterial, holeMesh;
var testHole;

var holesList = []; //Hole list for saving the box

var removeListener = false;

var mouse = new THREE.Vector2();

var lastWidth = 50, lastDepth = 50, lastHeight = 50; // !!!!!!  USE THESE FOR SAVING THE BOX SIZE !!!!!!!!!!!//
var formWidth, formDepth, formHeight;

var frustumSize = 600;
var canvas = document.getElementById("model_canvas").getContext("webgl");
var canvasDims = document.getElementById("model_canvas").getBoundingClientRect();;
var width = canvasDims.width;
var height = canvasDims.height;
var aspect = width/height;

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

	for(var i=0; i<6; i++){
		setUpBasicGeometry(i);
		setUpBoxProperties(i);

		mesh[i] = new THREE.Mesh( geometry[i], material );
		scene.add( mesh[i] );
	}
	
	holeGeometry = new THREE.PlaneGeometry(5, 5);
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

			holeMesh.visible = true;
			holeMesh.position.copy( intersects[0].point );

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
function edgeType(event){

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
			geometry[1].translate((formWidth-lastWidth)/2, 0, 0);
			geometry[3].translate((-(formWidth-lastWidth))/2, 0, 0);
			break;
		case "height":
			geometry[4].translate(0, (formHeight-lastHeight)/2, 0);
			geometry[5].translate(0, (-(formHeight-lastHeight))/2, 0);
			break;
		case "depth":
			geometry[0].translate(0, 0, (formDepth-lastDepth)/2);
			geometry[2].translate(0, 0, (-(formDepth-lastDepth))/2);
			break;
	}
	
	//We want two measurements of each box face to scale, and one to translate, in order to preserve eventual material thickness property
	for(var i=0; i<6; i++){
		switch(i){
			case 0: //Front
				geometry[i].scale(formWidth/lastWidth, formHeight/lastHeight, 1);
				break;
			case 1: //Right
				geometry[i].scale(1, formHeight/lastHeight, formDepth/lastDepth);
				break;
			case 2: //Back
				geometry[i].scale(formWidth/lastWidth, formHeight/lastHeight, 1);
				break;
			case 3: //Left
				geometry[i].scale(1, formHeight/lastHeight, formDepth/lastDepth);
				break;
			case 4: //Top
				geometry[i].scale(formWidth/lastWidth, 1, formDepth/lastDepth);
				break;
			case 5: //Bottom
				geometry[i].scale(formWidth/lastWidth, 1, formDepth/lastDepth);
				break;
		}
		geometry[i].verticesNeedUpdate = true;
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
	document.getElementById("model_canvas").addEventListener('click', helper, false);

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
	
	if(removeListener == true){
		document.getElementById("model_canvas").removeEventListener('mousemove', onCanvasMouseMove, false);
		removeListener = false;
	} else {
		document.getElementById("model_canvas").addEventListener('mousemove', onCanvasMouseMove, false);
		removeListener = true;
	}
}

//Helper function to place a hole. 
function helper(){

	if(scene.getObjectByName('grid') != null){
		raycaster.setFromCamera( mouse, camera );

		var intersects = raycaster.intersectObject( grid );

		if ( intersects.length > 0 ) {

			var intpoint = intersects[0].point;

			scene.add(testHole);
			testHole.translateX(intpoint.x);
			testHole.translateY(intpoint.y);
			testHole.translateZ(intpoint.z);

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

//Separate function to set geometry up, keeps code a little cleaner.
//Need to rework geometry set up however, current implementation won't allow for edge types.
function setUpBasicGeometry(index){

	//Box Geometry
	geometry[index] = new THREE.Geometry();

	geometry[index].vertices.push(
		new THREE.Vector3(-25, -2.5, 25),
		new THREE.Vector3(25, -2.5, 25),
		new THREE.Vector3(-25, 2.5, 25),
		new THREE.Vector3(25, 2.5, 25),
		new THREE.Vector3(-25, -2.5, -25),
		new THREE.Vector3(25, -2.5, -25),
		new THREE.Vector3(-25, 2.5, -25),
		new THREE.Vector3(25, 2.5, -25)
	);

}

//A bit messy, but each face needs to be a seperate box, which requires different set up for each,
// to allow for edge type implementation.
function setUpBoxProperties(index){

	switch(index){
		case 0: 
			frontBox(index);
			break;
		case 1: 
			rightBox(index);
			break;
		case 2: 
			backBox(index);
			break;
		case 3: 
			leftBox(index);
			break;
		case 4: 
			topBox(index);
			break;
		case 5: 
			bottomBox(index);
			break;
	}
}

//These are required to get proper face indexes for colors and future modification. Probably a better way to do this, 
// but not my current focus.
function frontBox(index){
	geometry[index].rotateX(Math.PI/2);
	geometry[index].translate(0, 0, 22.5);

	geometry[index].faces.push(
		// front
		new THREE.Face3(2, 7, 6),
		new THREE.Face3(2, 3, 7),
		// right
		new THREE.Face3(1, 7, 3),
		new THREE.Face3(1, 5, 7),
		// back
		new THREE.Face3(4, 1, 0),
		new THREE.Face3(4, 5, 1),
		// left
		new THREE.Face3(4, 2, 6),
		new THREE.Face3(4, 0, 2),
		// top
		new THREE.Face3(5, 6, 7),
		new THREE.Face3(5, 4, 6),
		// bottom
		new THREE.Face3(0, 3, 2),
		new THREE.Face3(0, 1, 3),
	);

	setFaces(index);
}
function rightBox(index){
	geometry[index].rotateZ(Math.PI/2);
	geometry[index].translate(22.5, 0, 0);
	
	geometry[index].faces.push(
		// front
		new THREE.Face3(0, 3, 2),
		new THREE.Face3(0, 1, 3),
		// right
		new THREE.Face3(4, 1, 0),
		new THREE.Face3(4, 5, 1),
		// back
		new THREE.Face3(5, 6, 7),
		new THREE.Face3(5, 4, 6),
		// left
		new THREE.Face3(2, 7, 6),
		new THREE.Face3(2, 3, 7),
		// top
		new THREE.Face3(1, 7, 3),
		new THREE.Face3(1, 5, 7),
		// bottom
		new THREE.Face3(4, 2, 6),
		new THREE.Face3(4, 0, 2),
		
	);

	setFaces(index);
}
function backBox(index){
	geometry[index].rotateX(Math.PI/2);
	geometry[index].translate(0, 0, -22.5);

	geometry[index].faces.push(
		// front
		new THREE.Face3(2, 7, 6),
		new THREE.Face3(2, 3, 7),
		// right
		new THREE.Face3(1, 7, 3),
		new THREE.Face3(1, 5, 7),
		// back
		new THREE.Face3(4, 1, 0),
		new THREE.Face3(4, 5, 1),
		// left
		new THREE.Face3(4, 2, 6),
		new THREE.Face3(4, 0, 2),
		// top
		new THREE.Face3(5, 6, 7),
		new THREE.Face3(5, 4, 6),
		// bottom
		new THREE.Face3(0, 3, 2),
		new THREE.Face3(0, 1, 3),
	);

	setFaces(index);
}
function leftBox(index){
	geometry[index].rotateZ(Math.PI/2);
	geometry[index].translate(-22.5, 0, 0);

	geometry[index].faces.push(
		// front
		new THREE.Face3(0, 3, 2),
		new THREE.Face3(0, 1, 3),
		// right
		new THREE.Face3(4, 1, 0),
		new THREE.Face3(4, 5, 1),
		// back
		new THREE.Face3(5, 6, 7),
		new THREE.Face3(5, 4, 6),
		// left
		new THREE.Face3(2, 7, 6),
		new THREE.Face3(2, 3, 7),
		// top
		new THREE.Face3(1, 7, 3),
		new THREE.Face3(1, 5, 7),
		// bottom
		new THREE.Face3(4, 2, 6),
		new THREE.Face3(4, 0, 2),
	);

	setFaces(index);
}
function topBox(index){
	geometry[index].translate(0, 22.5, 0);

	geometry[index].faces.push(
		// front
		new THREE.Face3(0, 3, 2),
		new THREE.Face3(0, 1, 3),
		// right
		new THREE.Face3(1, 7, 3),
		new THREE.Face3(1, 5, 7),
		// back
		new THREE.Face3(5, 6, 7),
		new THREE.Face3(5, 4, 6),
		// left
		new THREE.Face3(4, 2, 6),
		new THREE.Face3(4, 0, 2),
		// top
		new THREE.Face3(2, 7, 6),
		new THREE.Face3(2, 3, 7),
		// bottom
		new THREE.Face3(4, 1, 0),
		new THREE.Face3(4, 5, 1),
	);

	setFaces(index);
}
function bottomBox(index){
	geometry[index].translate(0, -22.5, 0);

	geometry[index].faces.push(
		// front
		new THREE.Face3(0, 3, 2),
		new THREE.Face3(0, 1, 3),
		// right
		new THREE.Face3(1, 7, 3),
		new THREE.Face3(1, 5, 7),
		// back
		new THREE.Face3(5, 6, 7),
		new THREE.Face3(5, 4, 6),
		// left
		new THREE.Face3(4, 2, 6),
		new THREE.Face3(4, 0, 2),
		// top
		new THREE.Face3(2, 7, 6),
		new THREE.Face3(2, 3, 7),
		// bottom
		new THREE.Face3(4, 1, 0),
		new THREE.Face3(4, 5, 1),
	);

	setFaces(index);
}

//Function to set faces and face colors
function setFaces(index){

	// front
	geometry[index].faces[0].color.setHex(0xff0000);
	geometry[index].faces[1].color.setHex(0xff0000);
	// right
	geometry[index].faces[2].color.setHex(0x008000);
	geometry[index].faces[3].color.setHex(0x008000);
	// back
	geometry[index].faces[4].color.setHex(0x0000ff);
	geometry[index].faces[5].color.setHex(0x0000ff);
	// left
	geometry[index].faces[6].color.setHex(0xffff00);
	geometry[index].faces[7].color.setHex(0xffff00);
	// top
	geometry[index].faces[8].color.setHex(0x800080);
	geometry[index].faces[9].color.setHex(0x800080);
	// bottom
	geometry[index].faces[10].color.setHex(0xff5733);
	geometry[index].faces[11].color.setHex(0xff5733);
}


//Function to set up listeners. Keeps code a little cleaner near the top.

function setListeners(){
	//Set listeners for the dimension options
	document.getElementById("width").addEventListener('input', updateDimensions, false);
	document.getElementById("height").addEventListener('input', updateDimensions, false);
	document.getElementById("depth").addEventListener('input', updateDimensions,false);

	//Set listeners for edge types
	document.getElementById("fingers").addEventListener('click', edgeType, false);
	document.getElementById("flat").addEventListener('click', edgeType, false);
	document.getElementById("t-slot").addEventListener('click', edgeType, false);

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
