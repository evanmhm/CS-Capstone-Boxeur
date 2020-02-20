var camera, scene, renderer;
var geometry, material, mesh;
var controls;


var lastWidth = 50, lastDepth = 50, lastHeight = 50;
var formWidth, formDepth, formHeight;

var frustumSize = 600;
var canvas = document.getElementById("model_canvas").getContext("webgl");
var canvasDims = document.getElementById("model_canvas").getBoundingClientRect();;
var width = canvasDims.width;
var height = canvasDims.height;
var aspect = width/height;

init();

document.getElementById("width").addEventListener('input', updateGeometry);
document.getElementById("height").addEventListener('input', updateGeometry);
document.getElementById("depth").addEventListener('input', updateGeometry);

document.getElementById("holes-options").addEventListener('click', holesScreen);

animate();

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	//camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
	camera = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 1, 1000 );
	
	camera.position.x = 120;
	camera.position.y = 120;
	camera.position.z = 120;

	scene.add(camera);

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

	geometry.computeFaceNormals();

	geometry.verticesNeedUpdate = true;

	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: model_canvas } );
	renderer.setSize(width, height, false);

	controls = new THREE.OrbitControls(camera, document.getElementById("model_canvas"));
	
}

function updateGeometry(){

	formWidth = document.getElementById("width").value;
	formHeight = document.getElementById("height").value;
	formDepth = document.getElementById("depth").value;

	//console.log(formWidth/lastWidth)

	geometry.scale(formWidth/lastWidth, formHeight/lastHeight, formDepth/lastDepth);

	/*geometry.vertices[0] = THREE.Vector3(-(formWidth / 2), -(formHeight / 2), (formDepth / 2));
	geometry.vertices[1] = THREE.Vector3((formWidth / 2), -(formHeight / 2), (formDepth / 2));
	geometry.vertices[2] = THREE.Vector3(-(formWidth / 2), (formHeight / 2), (formDepth / 2));
	geometry.vertices[3] = THREE.Vector3((formWidth / 2), (formHeight / 2), (formDepth / 2));
	geometry.vertices[4] = THREE.Vector3(-(formWidth / 2), -(formHeight / 2), -(formDepth / 2));
	geometry.vertices[5] = THREE.Vector3((formWidth / 2), -(formHeight / 2), -(formDepth / 2));
	geometry.vertices[6] = THREE.Vector3(-(formWidth / 2), (formHeight / 2), -(formDepth / 2));
	geometry.vertices[7] = THREE.Vector3((formWidth / 2), (formHeight / 2), -(formDepth / 2));
*/

	lastWidth = formWidth;
	lastHeight = formHeight;
	lastDepth = formDepth;

	geometry.verticesNeedUpdate = true;
	geometry.normalsNeedUpdate = true;

}

function holesScreen(){

	controls.enabled = false;

}

function animate() {

	onWindowResize();

	controls.update();
	requestAnimationFrame( animate );

	//mesh.rotation.x += 0.01;
	//	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}

//Tried a thousand different methods to resize the canvas with a window resize, but nothing seems to work.
function onWindowResize(){

	//let newWidth = document.getElementById("editor").width;
	//let newHeight = document.getElementById("editor").height;
	canvasDims = document.getElementById("model_canvas").getBoundingClientRect();
	width = canvasDims.width;
	height = canvasDims.height;
	//aspect = newWidth/newHeight; 
	/*width = canvas.clientWidth;
	height = canvas.clientHeight;

	var styles = getComputedStyle(document.getElementById("editor")),
    w = parseInt(styles.getPropertyValue("width"), 10),
    h = parseInt(styles.getPropertyValue("height"), 10);

	canvas.width = w;
	canvas.height = h;*/

	aspect = width / height;

	if (canvas.width !== width || canvas.height !== height) {
		renderer.setSize(width, height, false);
		camera.aspect = aspect;
	}
	/*	camera.left = - width / 2;
		camera.right = width / 2;
		camera.top = height / 2;
		camera.bottom = - height / 2;
	*/

		camera.updateProjectionMatrix();

}