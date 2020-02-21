var clickDimension = document.getElementById("dimension");
console.log(clickDimension);
if (clickDimension) {
	clickDimension.addEventListener('click', function() {
		document.getElementById("dimension-options").className = "visible";
		document.getElementById("edge-type-options").className = "invisible";
		document.getElementById("holes-options").className = "invisible";
        var children = clickDimension.parentElement.parentElement.children;
        var i;
        for (i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }

        clickDimension.parentElement.className = "active";
        controls.enabled = true;
        camera.position.x = 120;
        camera.position.y = 120;
        camera.position.z = 120;
        scene.remove(grid);
        document.getElementById("model_canvas").removeEventListener('mousemove', onCanvasMouseMove, false);
	});
}

var clickEdge = document.getElementById("edge-type");
console.log(clickEdge);
if (clickEdge) {
	clickEdge.addEventListener('click', function() {
		document.getElementById("dimension-options").className = "invisible";
		document.getElementById("edge-type-options").className = "visible";
		document.getElementById("holes-options").className = "invisible";
        var children = clickDimension.parentElement.parentElement.children;
        var i;
        for (i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }
        clickEdge.parentElement.className = "active";
        controls.enabled = true;
        camera.position.x = 120;
        camera.position.y = 120;
        camera.position.z = 120;
        scene.remove(grid);
        document.getElementById("model_canvas").removeEventListener('mousemove', onCanvasMouseMove, false);
	});
}

var clickHoles = document.getElementById("holes");
console.log(clickHoles);
if (clickHoles) {
	clickHoles.addEventListener('click', function() {
		document.getElementById("dimension-options").className = "invisible";
		document.getElementById("edge-type-options").className = "invisible";
		document.getElementById("holes-options").className = "visible";
        var children = clickDimension.parentElement.parentElement.children;
        var i;
        for (i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }
        clickHoles.parentElement.className = "active";
        controls.enabled = false;
        document.getElementById("model_canvas").addEventListener('mousemove', onCanvasMouseMove, false);
	});
}
