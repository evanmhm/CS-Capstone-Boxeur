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
                
                    <label for="width">Width</label>
                    <input type="range" name="width" min="1" max="100" value="50" id="width">

                    <br>
                    <label for="height">Height</label>
                    <input type="range" name="height" min="1" max="100" value="50" id="height">

                    <br>
                    <label for="depth">Depth</label>
                    <input type="range" name="depth" min="1" max="100" value="50" id="depth">
                
            </div>
            <div id="edge-type-options" class="invisible">
                <!-- this will change based on the mode selected above -->
                <form>
                    <label for="edge">Edge</label>
                    <select name="edge">
                        <option value="flat">Flat</option>
                        <option value="finger">Finger</option>
                        <option value="t-slot">T-Slot</option>
                    </select>

                    <br>
                    <label for="edgelength">Edge Length</label>
                    <input type="range" name="edgeLength" min="1" max="100" value="50" id="edgelength">
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
        	<canvas id="model_canvas"></canvas>
	</div>
</div>
        <script src="https://threejs.org/build/three.js"></script>
        <script src="js/OrbitControls.js"></script>
        <script src="js/3dmodel.js"></script>
