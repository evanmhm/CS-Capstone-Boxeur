var camera, scene, renderer;
var geometry, material, mesh;
var controls;
var grid;
var raycaster, holeGeometry, holeMaterial, holeMesh;
var testHole;

var holesList = []; //Hole list for saving the box

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

//Set listeners for the dimension options
document.getElementById("width").addEventListener('input', updateGeometry, false);
document.getElementById("height").addEventListener('input', updateGeometry, false);
document.getElementById("depth").addEventListener('input', updateGeometry,false);

//Set listeners for what side to look at during hole placement
document.getElementById("front").addEventListener('click', function(e){holePlacement(e, 0, 0, 51)}, false);
document.getElementById("back").addEventListener('click', function(e){holePlacement(e, 0, 0, -51)}, false);
document.getElementById("top").addEventListener('click', function(e){holePlacement(e, 0, 51, 0)}, false);
document.getElementById("bottom").addEventListener('click', function(e){holePlacement(e, 0, -51, 0)}, false);
document.getElementById("right").addEventListener('click', function(e){holePlacement(e, 51, 0, 0)}, false);
document.getElementById("left").addEventListener('click', function(e){holePlacement(e, -51, 0, 0)}, false);

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

	setUpGeometry();

	scene.add( mesh );
	
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

//Tried a thousand different methods to resize the canvas with a window resize, but nothing seems to work.
//Edit: Suddenly it works. Weird.
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

//Change box geometry based on form values when a slider is being input
function updateGeometry(){

	formWidth = document.getElementById("width").value;
	formHeight = document.getElementById("height").value;
	formDepth = document.getElementById("depth").value;

	geometry.scale(formWidth/lastWidth, formHeight/lastHeight, formDepth/lastDepth);

	lastWidth = formWidth;
	lastHeight = formHeight;
	lastDepth = formDepth;

	geometry.verticesNeedUpdate = true;
	//geometry.normalsNeedUpdate = true;

}

function holePlacement(event, x, y, z){

	camera.position.x = x; camera.position.y = y; camera.position.z = z;
	gridPlacer(event.target.id); 
	document.getElementById("model_canvas").addEventListener('click', helper, false);

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

			/*  DO SAVING HERE, THIS IS WHERE HOLE PLACEMENT OCCURS */
			

		} 
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
	
	document.getElementById("model_canvas").removeEventListener('mousemove', onCanvasMouseMove, false);
	
	document.getElementById("model_canvas").addEventListener('mousemove', onCanvasMouseMove, false);
}

//Function tracking mousemovement when in hole placement mode
function onCanvasMouseMove(event){

	event.preventDefault();

	mouse.x = ( ( event.clientX - canvasDims.left ) / ( canvasDims.right - canvasDims.left ) ) * 2 - 1;
	mouse.y = - ( ( event.clientY - canvasDims.top ) / ( canvasDims.bottom - canvasDims.top ) ) * 2 + 1;

	//console.log(mouse);
}

//Separate function to set geometry up, keeps code a little cleaner.
function setUpGeometry(){

	//Box Geometry
	geometry = new THREE.Geometry();

	geometry.vertices.push(
		new THREE.Vector3(-25, -25, 25),
		new THREE.Vector3(25, -25, 25),
		new THREE.Vector3(-25, 25, 25),
		new THREE.Vector3(25, 25, 25),
		new THREE.Vector3(-25, -25, -25),
		new THREE.Vector3(25, -25, -25),
		new THREE.Vector3(-25, 25, -25),
		new THREE.Vector3(25, 25, -25)
	);

    geometry.faces.push(
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

	//geometry.computeFaceNormals();

	// front
	geometry.faces[0].color.setHex(0xff0000);
	geometry.faces[1].color.setHex(0xff0000);
	// right
	geometry.faces[2].color.setHex(0x008000);
	geometry.faces[3].color.setHex(0x008000);
	// back
	geometry.faces[4].color.setHex(0x0000ff);
	geometry.faces[5].color.setHex(0x0000ff);
	// left
	geometry.faces[6].color.setHex(0xffff00);
	geometry.faces[7].color.setHex(0xffff00);
	// top
	geometry.faces[8].color.setHex(0x800080);
	geometry.faces[9].color.setHex(0x800080);
	// bottom
	geometry.faces[10].color.setHex(0xff5733);
	geometry.faces[11].color.setHex(0xff5733);

	material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

	mesh = new THREE.Mesh( geometry, material );

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
