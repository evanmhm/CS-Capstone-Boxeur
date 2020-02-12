var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	camera = new THREE.OrthographicCamera(innerWidth / - 2, innerWidth / 2, innerHeight / 2, innerHeight / - 2, 1, 1000 );
	camera.position.z = 1;

	scene = new THREE.Scene();
	scene.add(camera);

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}