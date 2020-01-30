<div class="row content">
	<div class="col-sm-3" id="sidebar">
        <div id='modes'>
        <ul>
           <li><a href='#'><span>Dimensions</span></a></li>
           <!-- <li class='active has-sub'><a href='#'><span>Products</span></a>
              <ul>
                 <li class='has-sub'><a href='#'><span>Product 1</span></a>
                    <ul>
                       <li><a href='#'><span>Sub Product</span></a></li>
                       <li class='last'><a href='#'><span>Sub Product</span></a></li>
                    </ul>
                 </li>
                 <li class='has-sub'><a href='#'><span>Product 2</span></a>
                    <ul>
                       <li><a href='#'><span>Sub Product</span></a></li>
                       <li class='last'><a href='#'><span>Sub Product</span></a></li>
                    </ul>
                 </li>
              </ul>
           </li> -->
           <li><a href='#'><span>Edge Type</span></a></li>
           <li class='last'><a href='#'><span>Holes</span></a></li>
        </ul>
        </div>

        <hr>
        <div id="sidebar-content"> <!-- this will change based on the mode selected above -->
            <form>
                <label for="width">Width</label>
                <input type="text" name="width" value="">
            </form>
        </div>
	</div>
	<div class="col-sm-9" id="editor">
	</div>
</div>

<body>
   <?php include("js/3dmodel.js");?>
</body>