
console.log("js is loaded")

var clickDimension = document.getElementById("dimension");
   console.log(clickDimension);
   if(clickDimension){
   clickDimension.addEventListener('click',function(){
        document.getElementById("dimensionId").className = "visible";
        document.getElementById("edgeTypeId").className = "invisible";
        document.getElementById("holesId").className = "invisible";

   
    });
}


var clickEdge = document.getElementById("EdgeType");
    console.log(clickEdge);
    if(clickEdge){
        clickEdge.addEventListener('click',function(){
        document.getElementById("dimensionId").className = "invisible";
        document.getElementById("edgeTypeId").className = "visible";
        document.getElementById("holesId").className = "invisible";


    });
}

var clickHoles = document.getElementById("holes");
    console.log(clickHoles);
    if(clickHoles){
        clickHoles.addEventListener('click',function(){
        document.getElementById("dimensionId").className = "invisible";
        document.getElementById("edgeTypeId").className = "invisible";
        document.getElementById("holesId").className = "visible";

        });
    }