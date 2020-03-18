function setUpBasicGeometry(index, box){

	//Box Geometry
	geometryList[edgeType][index] = new THREE.Geometry();

	geometryList[edgeType][index].vertices.push(
		new THREE.Vector3(-(lastWidth/2), -2.5, (lastDepth/2)),
		new THREE.Vector3((lastWidth/2), -2.5, (lastDepth/2)),
		new THREE.Vector3(-(lastWidth/2), 2.5, (lastDepth/2)),
		new THREE.Vector3((lastWidth/2), 2.5, (lastDepth/2)),
		new THREE.Vector3(-(lastWidth/2), -2.5, -(lastDepth/2)),
		new THREE.Vector3((lastWidth/2), -2.5, -(lastDepth/2)),
		new THREE.Vector3(-(lastWidth/2), 2.5, -(lastDepth/2)),
		new THREE.Vector3((lastWidth/2), 2.5, -(lastDepth/2))
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
	geometryList[edgeType][index].rotateX(Math.PI/2);
	geometryList[edgeType][index].translate(0, 0, 22.5);

	geometryList[edgeType][index].faces.push(
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
	geometryList[edgeType][index].rotateZ(Math.PI/2);
	geometryList[edgeType][index].translate(22.5, 0, 0);
	
	geometryList[edgeType][index].faces.push(
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
	geometryList[edgeType][index].rotateX(Math.PI/2);
	geometryList[edgeType][index].translate(0, 0, -22.5);

	geometryList[edgeType][index].faces.push(
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
	geometryList[edgeType][index].rotateZ(Math.PI/2);
	geometryList[edgeType][index].translate(-22.5, 0, 0);

	geometryList[edgeType][index].faces.push(
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
	geometryList[edgeType][index].translate(0, 22.5, 0);

	geometryList[edgeType][index].faces.push(
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
	geometryList[edgeType][index].translate(0, -22.5, 0);

	geometryList[edgeType][index].faces.push(
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
//Use index to set the color inside the cube to a a neutral color
function setFaces(index){

	if(index == 2){
		geometryList[edgeType][index].faces[0].color.setHex(0x000000);
		geometryList[edgeType][index].faces[1].color.setHex(0x000000);
	} else { // front
		geometryList[edgeType][index].faces[0].color.setHex(0xff0000);
		geometryList[edgeType][index].faces[1].color.setHex(0xff0000);
	}
	if(index == 3){
		geometryList[edgeType][index].faces[2].color.setHex(0x000000);
		geometryList[edgeType][index].faces[3].color.setHex(0x000000);
	} else {// right
		geometryList[edgeType][index].faces[2].color.setHex(0x008000);
		geometryList[edgeType][index].faces[3].color.setHex(0x008000);
	}
	if(index == 0){
		geometryList[edgeType][index].faces[4].color.setHex(0x000000);
		geometryList[edgeType][index].faces[5].color.setHex(0x000000);
	} else {// back
		geometryList[edgeType][index].faces[4].color.setHex(0x0000ff);
		geometryList[edgeType][index].faces[5].color.setHex(0x0000ff);
	}
	if(index == 1){
		geometryList[edgeType][index].faces[6].color.setHex(0x000000);
		geometryList[edgeType][index].faces[7].color.setHex(0x000000);
	} else {// left
		geometryList[edgeType][index].faces[6].color.setHex(0xffff00);
		geometryList[edgeType][index].faces[7].color.setHex(0xffff00);
	}
	if(index == 5){
		geometryList[edgeType][index].faces[8].color.setHex(0x000000);
		geometryList[edgeType][index].faces[9].color.setHex(0x000000);
	} else {// top
		geometryList[edgeType][index].faces[8].color.setHex(0x800080);
		geometryList[edgeType][index].faces[9].color.setHex(0x800080);
	}
	if(index == 4){
		geometryList[edgeType][index].faces[10].color.setHex(0x000000);
		geometryList[edgeType][index].faces[11].color.setHex(0x000000);
	} else {// bottom
		geometryList[edgeType][index].faces[10].color.setHex(0xff5733);
		geometryList[edgeType][index].faces[11].color.setHex(0xff5733);
	}
}