var clickProjcet = document.getElementById("project");
console.log(clickProjcet);
if (clickProjcet) {
	clickProjcet.addEventListener('click', function() {
		document.getElementById("project-options").className = "d-block";
		document.getElementById("dimension-options").className = "d-none";
		document.getElementById("edge-type-options").className = "d-none";
        document.getElementById("holes-options").className = "d-none";

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

// Units
$("#project-options form").on("input", function() {
	if (document.getElementById('inches').checked) {
		$('.unit').each(function(index, obj) {
			$(this).text("in");
			$(this).css("margin-left", "-22px");
		});
	} else if (document.getElementById('milimeters').checked) {
		$('.unit').each(function(index, obj) {
			$(this).text("mm");
			$(this).css("margin-left", "-35px");
		});
	} else if (document.getElementById('centimeters').checked) {
		$('.unit').each(function(index, obj) {
			$(this).text("cm");
			$(this).css("margin-left", "-29px");
		});
	}
});

// HWD sliders
$(function() {
	var initialValue = 50;
	$("#slider-width").slider({
		min: 0.001,
		max: 150,
		step: .001,
		value: 10,
		slide: function(event, ui) {
			$("#width-value").val(ui.value);
			boxWidth = ui.value;
			updateGeometry();
		}
	});

	$("#width-value").val(initialValue);
	$("#width-value").change(function() {
		var oldVal = $("#slider-width").slider("option", "value");
		var newVal = $(this).val();
		if (isNaN(newVal) || newVal < 10 || newVal > 100) {
			$("#width-value").val(oldVal);
		} else {
			$("#slider-width").slider("option", "value", newVal);
			boxWidth = newVal;
			updateGeometry();
		}
	});

	$("#slider-height").slider({
		min: 0.001,
		max: 150,
		step: .001,
		value: 10,
		slide: function(event, ui) {
			$("#height-value").val(ui.value);
			boxHeight = ui.value;
			updateGeometry();
		}
	});

	$("#height-value").val(initialValue);
	$("#height-value").change(function() {
		var oldVal = $("#slider-height").slider("option", "value");
		var newVal = $(this).val();
		if (isNaN(newVal) || newVal < 10 || newVal > 100) {
			$("#height-value").val(oldVal);
		} else {
			$("#slider-height").slider("option", "value", newVal);
			boxHeight = newVal;
			updateGeometry();
		}
	});

	$("#slider-depth").slider({
		min: 0.001,
		max: 150,
		step: .001,
		value: 10,
		slide: function(event, ui) {
			$("#depth-value").val(ui.value);
			boxDepth = ui.value;
			updateGeometry();
		}
	});

	$("#depth-value").val(initialValue);
	$("#depth-value").change(function() {
		var oldVal = $("#slider-depth").slider("option", "value");
		var newVal = $(this).val();
		if (isNaN(newVal) || newVal < 10 || newVal > 100) {
			$("#depth-value").val(oldVal);
		} else {
			$("#slider-depth").slider("option", "value", newVal);
			boxDepth = newVal;
			updateGeometry();
		}
	});
});
