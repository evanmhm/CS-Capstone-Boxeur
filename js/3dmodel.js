var camera, scene, renderer;
var geometry, material, mesh;
var controls;

init();
animate();

function init() {

	canvasDims = document.getElementById("model_canvas").getBoundingClientRect();

	camera = new THREE.OrthographicCamera( canvasDims.width / - 2, canvasDims.width / 2, canvasDims.height / 2, canvasDims.height / - 2, 1, 1000 );
	camera.position.z = 1;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: model_canvas } );

	controls = new THREE.OrbitControls(camera, document.getElementById("model_canvas"));

}

function animate() {

	controls.update();
	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}