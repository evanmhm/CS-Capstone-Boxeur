<div class="row content">
    <div class="col-md-4 col-lg-3" id="sidebar">
        <div id='modes'>
            <ul>
                <li class="active">
                    <a id="project">
                        <span>Project</span>
                    </a>
                </li>
                <li>
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
        <div id="options">
            <div id="project-options" class="visible">
                <!-- this will change based on the mode selected above -->
                <form>
                    <div class="form-group">
                        <label for="name">Project name</label>
                        <input class="form-control" type="text" name="name" aria-describedby="naem" placeholder="Enter name">
                    </div>
                    <label for="units">Project units</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="units" id="inches" value="inches" checked>
                        <label class="form-check-label" for="units">
                            Inches
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="units" id="milimeters" value="milimeters">
                        <label class="form-check-label" for="units">
                            Milimeters
                        </label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" name="units" id="centimeters" value="centimeters">
                        <label class="form-check-label" for="units">
                            Centimeters
                        </label>
                    </div>
                    <?php if (isset($_SESSION['access_token']) && $_SESSION['access_token']): ?>
                        <button type="button" class="btn btn-primary mb-2" id="account-save">Save to Account</button>
                        <br>
                    <?php endif;?>
                    <button type="button" class="btn btn-success" id="export">Export to File</button>
                    <?php if (!isset($_SESSION['access_token']) || !$_SESSION['access_token']): ?>
                        <p style="color:gray; font-size:11px;">Log in to save to account</p>
                    <?php endif;?>
                </form>
            </div>
            <div id="dimension-options" class="d-none">
                <!-- this will change based on the mode selected above -->
                <div class="form-group pb-1">
                    <label>Width</label>
                    <div class="pl-2">
                        <div class="slider" id="slider-width" value=50></div><br/>
                        <input id="width-value" type="text">
                        <span class="unit" style="margin-left:-20px;">in</span>
                    </div>
                </div>

                <div class="form-group pb-1">
                    <label>Height</label>
                    <div class="pl-2">
                        <div class="slider" id="slider-height" value=50></div><br/>
                        <input id="height-value" type="text">
                        <span class="unit" style="margin-left:-20px;">in</span>
                    </div>
                </div>

                <div class="form-group pb-1">
                    <label>Depth</label>
                    <div class="pl-2">
                        <div class="slider" id="slider-depth" value=50></div><br/>
                        <input id="depth-value" type="text">
                        <span class="unit" style="margin-left:-20px;">in</span>
                    </div>
                </div>

            </div>
            <div id="edge-type-options" class="d-none">
                <!-- this will change based on the mode selected above -->
                <form>
                    <label for="edge-type">Edge Type</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="edge-type" id="flat" value="flat" checked>
                        <label class="form-check-label" for="edge-type">
                            Flat
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="edge-type" id="fingers" value="fingers">
                        <label class="form-check-label" for="edge-type">
                            Fingers
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="edge-type" id="t-slot" value="t-slot">
                        <label class="form-check-label" for="edge-type">
                            T-slot
                        </label>
                    </div>
                </form>
            </div>
            <div id="holes-options" class="d-none">
                <!-- this will change based on the mode selected above -->
                <form>
                <label for="edge-type">Hole Shape Type</label>
                    <div class="form-check">
                        <input id="rect" class="form-check-input" type="radio" name="shape-type" id="rectangle" value="rectangle" checked>
                        <label class="form-check-label" for="shape-type">
                            Rectangle
                        </label>
                    </div>
                    <div class="form-check">
                        <input id="triangle" class="form-check-input" type="radio" name="shape-type" id="triangle" value="triangle">
                        <label class="form-check-label" for="shape-type">
                            Triangle
                        </label>
                    </div>
                    <div class="form-check">
                        <input id="circle" class="form-check-input" type="radio" name="shape-type" id="circle" value="circle">
                        <label class="form-check-label" for="shape-type">
                            Circle
                        </label>
                    </div>
                    <div id="holes-rect">
                        <div class="form-group">
                            <label for="name" id="shape-width-label">Rectangle width</label>
                            <input class="form-control" type="number" min="0" name="shape-width" aria-describedby="shape-width" placeholder="Width">
                        </div>
                        <div class="form-group" id="shape-height-group">
                            <label for="name" id="shape-height-label">Rectangle height</label>
                            <input class="form-control" type="number" min="0" name="shape-height" aria-describedby="shape-height" placeholder="Height">
                        </div>
                    </div>

                    <button type="button" id="front">Front</button>
                    <button type="button" id="top">Top</button>
                    <button type="button" id="right">Right</button>
                    <button type="button" id="left">Left</button>
                    <button type="button" id="bottom">Bottom</button>
                    <button type="button" id="back">Back</button>
                </form>
            </div>
        </div>
	</div>
	<!--div class="col-sm-9" id="editor">
	</div-->

    <div class="col-md-8 col-lg-9" id="editor">
     <canvas id="model_canvas"></canvas>
    </div>
</div>
        <script src="https://threejs.org/build/three.min.js"></script>
        <script src="js/OrbitControls.js"></script>
        <script src="js/three-csg.js"></script>
        <script src="js/geometry.js"></script>
        <script src="js/flatEdgeModel.js"></script>
        <script src="js/fingerEdgeModel.js"></script>
        <script src="js/tslotEdgeModel.js"></script>
        <script src="js/3dmodel.js"></script>
