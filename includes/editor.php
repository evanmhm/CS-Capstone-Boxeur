<div class="row content">
    <div class="col-sm-3" id="sidebar">
        <div id='modes'>
            <ul>
                <li class="active">
                    <a id="dimension">
                        <span>Dimensions</span>
                    </a>
                </li>
                <li>
                    <a id="edge-type">
                        <span>Edge Type</span>
                    </a>
                </li>
                <li class='last'>
                    <a id="holes">
                        <span>Holes</span>
                    </a>
                </li>
            </ul>
        </div>
        <hr>
        <div id="contaner">
            <div id="dimension-options" class="visible">
                <!-- this will change based on the mode selected above -->
                <form>
                    <label for="width">Width</label>
                    <input type="text" name="width" value="">

                    <br>
                    <label for="height">Height</label>
                    <input type="text" name="height" value="">
                </form>
            </div>
            <div id="edge-type-options" class="invisible">
                <!-- this will change based on the mode selected above -->
                <form>
                    <label for="edge">edge</label>
                    <input type="text" name="edge" value="">

                    <br>
                    <label for="edgelength">edgeLength</label>
                    <input type="text" name="edgeLength" value="">
                </form>
            </div>
            <div id="holes-options" class="invisible">
                <!-- this will change based on the mode selected above -->
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
      <canvas id="model_canvas">
      </canvas>
      <script>
         <?php include("./threejs/build/three.js");?>
         <?php include("./threejs/examples/js/controls/OrbitControls.js");?>
         <?php include("js/3dmodel.js");?>
      </script>
	</div>
</div>

<body>
   
</body>