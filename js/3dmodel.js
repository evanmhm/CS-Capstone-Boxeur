var camera, scene, renderer;
var geometry, material, mesh;
var controls;

var frustumSize = 600;
var canvas = document.getElementById("model_canvas").getContext("webgl");
var canvasDims = document.getElementById("model_canvas").getBoundingClientRect();;
var width = canvasDims.width;
var height = canvasDims.height;
var aspect = width/height;

init();
animate();

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
	//camera = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 1, 1000 );
	
	camera.position.z = 5;

	scene.add(camera);

	geometry = new THREE.BoxGeometry(  );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: model_canvas } );
	renderer.setSize(width, height);

	controls = new THREE.OrbitControls(camera, document.getElementById("model_canvas"));

	//window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {

	controls.update();
	requestAnimationFrame( animate );

	//mesh.rotation.x += 0.01;
	//	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}

function onWindowResize(){

	canvasDims = document.getElementById("model_canvas").getBoundingClientRect();;
	width = canvasDims.width;
	height = canvasDims.height;
	aspect = width/height; 

	camera.left = - width / 2;
	camera.right = width / 2;
	camera.top = height / 2;
	camera.bottom = - height / 2;
	camera.updateProjectionMatrix();
}