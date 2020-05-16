var camera, scene, renderer;
var material, outlinemat;
var controls;
var grid;
var raycaster, holeGeometry, holeMaterial, holeMesh;
var subtract;

var geometryList = [];
var meshList = [];
var outlineList = [];
var edgeType = 0;
var _face = 0;

var holesList = []; //Hole list for saving the box

var lastWidth = 50, lastDepth = 50, lastHeight = 50; // !!!!!!  USE THESE FOR SAVING THE BOX SIZE !!!!!!!!!!!//
var boxWidth = 50, boxHeight = 50, boxDepth = 50;

var thickness = 5;

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

	camera = new THREE.OrthographicCamera( 0.3 * width / - 2, 0.3 * width / 2, 0.3 * height / 2, 0.3 * height / - 2, 1, 2000 );

	camera.position.x = 51;
	camera.position.y = 51;
	camera.position.z = 51;

	scene.add(camera);

	material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

	flatEdgeModel();

	/*outlinemat = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide});
	//Setup outlines for visibility
	for(var i=0; i<6; i++){
		outlineList[i] = new THREE.Mesh(geometryList[0][i], outlinemat);
		outlineList[i].scale.multiplyScalar(1.01);
	}*/


	/***** All "outlineList" related code is a NYI feature. Breaks the model view if uncommented. *****/


	for(var i=0; i<6; i++){
		scene.add(meshList[0][i]);
		//scene.add(outlineList[i]);
	}

	//holeGeometry = new THREE.BoxGeometry(5, 5, 15);
	holeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
	holeGeometry = new THREE.BoxGeometry(5, thickness+.5, 5);
	holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
	scene.add(holeMesh);

	raycaster = new THREE.Raycaster();
	raycaster.params.Line.threshold = 2;

	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: model_canvas} );
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
			
			holeMesh.position.copy( fixed  );
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
// *** NYI ***
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

//Function for changing the hole shape
function holeType(event){

	scene.remove(holeMesh);	

	holeMesh.quaternion.set(0, 0, 0, 0);

	switch(event.target.id){
		case "rect":
			holeGeometry = new THREE.BoxGeometry(5, thickness+.5, 5);
			holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
			scene.add(holeMesh);
			break;
		case "triangle":
			break;
		case "circle":
			holeGeometry = new THREE.CylinderGeometry(2.5, 2.5, thickness+2.5, 100);
			holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
			scene.add(holeMesh);
			break;
	}

	switch(_face){
		case 0: 
			holeMesh.rotateX(Math.PI/2);
			break;
		case 1: 
			holeMesh.rotateZ(Math.PI/2);
			break;
		case 2: 
			holeMesh.rotateX(Math.PI/2);
			break;
		case 3: 
			holeMesh.rotateZ(Math.PI/2);
			break;
		case 4: 
		case 5: 		//Top and bottom faces don't need any rotations
			break;
	}

}

//Functions for adjusting hole dimensions
function holeHeight(){

}
function holeWidth(){

}


//Change box geometry based on form values when a slider is being input or if a value is entered into the form.
//Really need to think of a more elegant way to do each face other than a switch.
function updateDimensions(event){


	//Only 2 sides need to be translated depending on what measurement is being changed
	//console.log(event.target.id, boxDepth, boxHeight, boxWidth);
	switch(event.target.id){
		case "slider-width":
		case "width-value":
			meshList[edgeType][1].geometry.translate((boxWidth-lastWidth)/2, 0, 0);
			meshList[edgeType][3].geometry.translate((-(boxWidth-lastWidth))/2, 0, 0);
			/*outlineList[1].geometry.translate((boxWidth-lastWidth)/2, 0, 0);
			outlineList[3].geometry.translate((-(boxWidth-lastWidth))/2, 0, 0);*/
			break;
		case "slider-height":
		case "height-value":
			meshList[edgeType][4].geometry.translate(0, (boxHeight-lastHeight)/2, 0);
			meshList[edgeType][5].geometry.translate(0, (-(boxHeight-lastHeight))/2, 0);
			/*outlineList[4].geometry.translate(0, (boxHeight-lastHeight)/2, 0);
			outlineList[5].geometry.translate(0, (-(boxHeight-lastHeight))/2, 0);*/
			break;
		case "slider-depth":
		case "depth-value":
			meshList[edgeType][0].geometry.translate(0, 0, (boxDepth-lastDepth)/2);
			meshList[edgeType][2].geometry.translate(0, 0, (-(boxDepth-lastDepth))/2);
			/*outlineList[0].geometry.translate(0, 0, (boxDepth-lastDepth)/2);
			outlineList[2].geometry.translate(0, 0, (-(boxDepth-lastDepth))/2);*/
			break;
	}
	
	//We want two measurements of each box face to scale, and one to translate, in order to preserve eventual material thickness property
	for(var i=0; i<6; i++){
		switch(i){
			case 0: //Front
				meshList[edgeType][i].geometry.scale(boxWidth/lastWidth, boxHeight/lastHeight, 1);
				//outlineList[i].geometry.scale(boxWidth/lastWidth, boxHeight/lastHeight, 1);
				break;
			case 1: //Right
				meshList[edgeType][i].geometry.scale(1, boxHeight/lastHeight, boxDepth/lastDepth);
				//outlineList[i].geometry.scale(1, boxHeight/lastHeight, boxDepth/lastDepth);
				break;
			case 2: //Back
				meshList[edgeType][i].geometry.scale(boxWidth/lastWidth, boxHeight/lastHeight, 1);
				//outlineList[i].geometry.scale(boxWidth/lastWidth, boxHeight/lastHeight, 1);
				break;
			case 3: //Left
				meshList[edgeType][i].geometry.scale(1, boxHeight/lastHeight, boxDepth/lastDepth);
				//outlineList[i].geometry.scale(1, boxHeight/lastHeight, boxDepth/lastDepth);
				break;
			case 4: //Top
				meshList[edgeType][i].geometry.scale(boxWidth/lastWidth, 1, boxDepth/lastDepth);
				//outlineList[i].geometry.scale(boxWidth/lastWidth, 1, boxDepth/lastDepth);
				break;
			case 5: //Bottom
				meshList[edgeType][i].geometry.scale(boxWidth/lastWidth, 1, boxDepth/lastDepth);
				//outlineList[i].geometry.scale(boxWidth/lastWidth, 1, boxDepth/lastDepth);
				break;
		}
		meshList[edgeType][i].geometry.verticesNeedUpdate = true;
		//outlineList[i].geometry.verticesNeedUpdate = true;
	}

	lastWidth = boxWidth;
	lastHeight = boxHeight;
	lastDepth = boxDepth;

}

//Function to change camera angle, call grid placement, and set up listener for hole placement helper 
function holePlacement(event, x, y, z){

	camera.position.x = x; camera.position.y = y; camera.position.z = z;
	gridPlacer(event.target.id); 
	
	document.getElementById("model_canvas").addEventListener('click', helper, false);
	//Though this helped prevent duplicate listeners, this caused a bug for not registering hole placement clicks on every other face button click
	/*if(removeHoleClickListener == true){
		document.getElementById("model_canvas").removeEventListener('click', helper, false);
		removeHoleClickListener = false;
	} else {
		document.getElementById("model_canvas").addEventListener('click', helper, false);
		removeHoleClickListener = true;
	}*/

}

//function to swap grid placement depending on which face button was clicked
function gridPlacer(face){

	if(scene.getObjectByName('grid') != null){
		scene.remove(grid);
	}

	holeMesh.quaternion.set(0, 0, 0, 0);

	switch(face){
		case "front":
			grid = new THREE.GridHelper(lastWidth, 10);
			grid.translateZ(lastDepth/2);
			grid.rotateX(Math.PI/2);
			_face = 0;
			holeMesh.rotateX(Math.PI/2);
			break;
		case "back":
			grid = new THREE.GridHelper(lastWidth, 10);
			grid.translateZ(-lastDepth/2);
			grid.rotateX(Math.PI/2);
			_face = 2;
			holeMesh.rotateX(Math.PI/2);
			break;
		case "top":
			grid = new THREE.GridHelper(lastHeight, 10);
			grid.translateY(lastHeight/2);
			_face = 4;
			break;
		case "bottom":
			grid = new THREE.GridHelper(lastHeight, 10);
			grid.translateY(-lastHeight/2);
			_face = 5;
			break;
		case "right":
			grid = new THREE.GridHelper(lastDepth, 10);
			grid.translateX(lastWidth/2);
			grid.rotateZ(Math.PI/2);
			_face = 1;
			holeMesh.rotateZ(Math.PI/2);
			break;
		case "left":
			grid = new THREE.GridHelper(lastDepth, 10);
			grid.translateX(-lastWidth/2);
			grid.rotateZ(Math.PI/2);
			_face = 3;
			holeMesh.rotateZ(Math.PI/2);
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
			holeMesh.translateX(intpoint.x);
			holeMesh.translateY(intpoint.y);
			holeMesh.translateZ(intpoint.z);

			var newmat = new THREE.MeshBasicMaterial({ color: 0xff0000, vertexColors: THREE.FaceColors });
			subtract = threecsg.subtract(meshList[edgeType][_face], holeMesh, newmat);
			scene.remove(meshList[edgeType][_face]);
			//scene.remove(outlineList[_face]);

			/*outlineList[_face] = new THREE.Mesh(subtract, outlinemat);
			outlineList[_face].scale.multiplyScalar(1.5);*/

			scene.add(subtract);
			//scene.add(outlineList[_face]);
			meshList[edgeType][_face] = subtract;
			
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
	document.getElementById("slider-width").addEventListener('input', updateDimensions, false);
	document.getElementById("slider-height").addEventListener('input', updateDimensions, false);
	document.getElementById("slider-depth").addEventListener('input', updateDimensions,false);

	//Set listeners for edge types
	document.getElementById("flat").addEventListener('click', edgeTypeHandler, false);
	document.getElementById("fingers").addEventListener('click', edgeTypeHandler, false);
	document.getElementById("t-slot").addEventListener('click', edgeTypeHandler, false);

	//Set listeners for hole options
	document.getElementById("rect").addEventListener('click', holeType, false);
	document.getElementById("triangle").addEventListener('click', holeType, false);
	document.getElementById("circle").addEventListener('click', holeType, false);
	document.getElementById("shape-width-label").addEventListener('change', holeWidth, false);
	document.getElementById("shape-height-label").addEventListener('change', holeHeight, false);

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
	constructor(x, y, z, type, face, width, height) {
		this.x = x;
		this.y = y;
		this.z = z;

		this.type = type;
		this.face = face;

		this.width = width;
		this.height = height;
	}
}
