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
	});
}
