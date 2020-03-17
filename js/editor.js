var clickProjcet = document.getElementById("project");
console.log(clickProjcet);
if (clickProjcet) {
	clickProjcet.addEventListener('click', function() {
		document.getElementById("project-options").className = "d-block";
		document.getElementById("dimension-options").className = "d-none";
		document.getElementById("edge-type-options").className = "d-none";
        document.getElementById("holes-options").className = "d-none";
        document.getElementById("download-save-options").className = "d-none";

        var children = clickProjcet.parentElement.parentElement.children;
        var i;
        for (i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }

        clickProjcet.parentElement.className = "active";
	});
}

var clickDimension = document.getElementById("dimension");
console.log(clickDimension);
if (clickDimension) {
	clickDimension.addEventListener('click', function() {
		document.getElementById("project-options").className = "d-none";
		document.getElementById("dimension-options").className = "d-block";
		document.getElementById("edge-type-options").className = "d-none";
        document.getElementById("holes-options").className = "d-none";
        document.getElementById("download-save-options").className = "d-none";

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
        document.getElementById("editor").removeEventListener('mousemove', onCanvasMouseMove, false);
	});
}

var clickEdge = document.getElementById("edge-type");
console.log(clickEdge);
if (clickEdge) {
	clickEdge.addEventListener('click', function() {
		document.getElementById("project-options").className = "d-none";
		document.getElementById("dimension-options").className = "d-none";
		document.getElementById("edge-type-options").className = "d-block";
        document.getElementById("holes-options").className = "d-none";
        document.getElementById("download-save-options").className = "d-none";

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
        document.getElementById("editor").removeEventListener('mousemove', onCanvasMouseMove, false);
	});
}

var clickHoles = document.getElementById("holes");
console.log(clickHoles);
if (clickHoles) {
	clickHoles.addEventListener('click', function() {
		document.getElementById("project-options").className = "d-none";
		document.getElementById("dimension-options").className = "d-none";
		document.getElementById("edge-type-options").className = "d-none";
        document.getElementById("holes-options").className = "d-block";
        document.getElementById("download-save-options").className = "d-none";

        var children = clickDimension.parentElement.parentElement.children;
        var i;
        for (i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }
        clickHoles.parentElement.className = "active";
        controls.enabled = false;
        document.getElementById("editor").addEventListener('mousemove', onCanvasMouseMove, false);
	});
}




var clickDownload = document.getElementById("download/save");
console.log(clickDownload);
if (clickDownload) {
	clickDownload.addEventListener('click', function() {
		document.getElementById("project-options").className = "d-none";
		document.getElementById("dimension-options").className = "d-none";
		document.getElementById("edge-type-options").className = "d-none";
        document.getElementById("holes-options").className = "d-none";
        document.getElementById("download-save-options").className = "d-block";
       
        
        var filename = "boxeur.dxf";

       
        document.getElementById("editor").addEventListener('mousemove', onCanvasMouseMove, false);
	});
}

$("#holes-options form").on("input", function() {
	if (document.getElementById('rect').checked) {
		document.getElementById("shape-width-label").innerHTML = "Rectangle width";
		document.getElementById("shape-height-label").innerHTML = "Rectangle height";
		document.getElementById("shape-height-group").style.display = "block";
	} else if (document.getElementById('triangle').checked) {
		document.getElementById("shape-width-label").innerHTML = "Triangle base";
		document.getElementById("shape-height-label").innerHTML = "Triangle height";
		document.getElementById("shape-height-group").style.display = "block";
	} else if (document.getElementById('circle').checked) {
		document.getElementById("shape-width-label").innerHTML = "Circle diameter";
		document.getElementById("shape-height-group").style.display = "none";
	}
});
