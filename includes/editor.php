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
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="units" id="centimeters" value="centimeters">
                        <label class="form-check-label" for="units">
                            Centimeters
                        </label>
                    </div>
                </form>
            </div>
            <div id="dimension-options" class="invisible">
                <!-- this will change based on the mode selected above -->
                <form>
                    <div class="form-group">
                        <label for="width">Width</label>
                        <input class="form-control" type="number" min="0"name="width" aria-describedby="width" placeholder="Enter width">
                    </div>
                    <div class="form-group">
                        <label for="height">Height</label>
                        <input class="form-control" type="number" min="0" name="height" aria-describedby="height" placeholder="Enter height">
                    </div>
                    <div class="form-group">
                        <label for="length">Length</label>
                        <input class="form-control" type="number" min="0" name="length" aria-describedby="length" placeholder="Enter length">
                    </div>
                    <div class="form-group">
                        <label for="thickness">Thickness</label>
                        <input class="form-control" type="number" min="0" name="thickness" aria-describedby="thickness" placeholder="Enter thickness">
                    </div>
                </form>
            </div>
            <div id="edge-type-options" class="invisible">
                <!-- this will change based on the mode selected above -->
                <form>
                    <label for="edge-type">Edge Type</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="edge-type" id="fingers" value="fingers" checked>
                        <label class="form-check-label" for="edge-type">
                            Flat
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="edge-type" id="flat" value="flat">
                        <label class="form-check-label" for="edge-type">
                            Fingers
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="edge-type" id="t-slot" value="t-slot">
                        <label class="form-check-label" for="units">
                            T-slot
                        </label>
                    </div>
                </form>
            </div>
            <div id="holes-options" class="invisible">
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
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-8 col-lg-9" id="editor">
    </div>
</div>
