<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>
<head>
  <?php include("includes/head-contents.php");?>
  <script src="js/main.js" charset="utf-8" defer></script>


</head>


<div class="row content">
	<div class="col-sm-3" id="sidebar">
        <div id='modes'>
        <ul>
           <li >
              <a href='#' id="dimension">
                 <span>Dimensions</span>
               </a>
            </li>
           <li>
              <a href='#' id = EdgeType>
                 <span>Edge Type</span>
               </a>
            </li>
           <li class='last'>
              <a href='#' id ='holes'>
                 <span>Holes</span>
               </a>
            </li>
        </ul>
        </div>

        <hr>


      <div id="contaner">
         <div id="dimensionId" class="visible"> <!-- this will change based on the mode selected above -->
            <form>
                <label for="width">Width</label>
                <input type="text" name="width" value="">
                  <br>
                <label for="height">Height</label>
                <input type="text" name="height" value="">
            </form>
         </div>
         <div id="edgeTypeId" class="invisible"> <!-- this will change based on the mode selected above -->
            <form>
                <label for="edge">edge</label>
                <input type="text" name="edge" value="">
                <br>
                <label for="edgelength">edgeLength</label>
                <input type="text" name="edgeLength" value="">
            </form>
         </div>
         <div id="holesId" class="invisible"> <!-- this will change based on the mode selected above -->
            <form>
                <label for="holes">holes</label>
                  <select id="holes">
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                  </select>
            </form>
         </div>
      </div>
   </div>
   
  

	<div class="col-sm-9" id="editor">
	</div>
</div>




<style>
#container {
  position: relative;
}

#dimensionId,
#edgeTypeId,
#holesId {
  position: absolute;
  left: 20px;
}
/* edgeTypeId will be on top of dimensionId */
#dimensionId {
  z-index: 1;
}
#edgeTypeId {
  z-index: 2;
}

#holesId{
   z-index: 3;
}
</style>


<?php include("includes/footer.php");?>

</body>

</html>