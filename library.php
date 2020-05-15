<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>

<head>
	<?php
		$PAGE_TITLE = "Library";
		include("includes/head-contents.php");
	?>
</head>
<style>
	body{
		background-color: #23272A;
		overflow: auto;
	}
</style>

<body>
	<?php
		include("includes/library-nav.php");

		// load projects from the user into the array $projects
		if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
			$projects = [];

			$servername = "oniddb.cws.oregonstate.edu";
			$username = "hopperme-db";
			$password = "lEl05pJffs7OtcfV";
			$dbname = "hopperme-db";

			// Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
				die("Connection failed: " . $conn->connect_error);
			}

			// Get user from database
			$email = $_SESSION["account"]["email"];
		    $result = $conn->query("SELECT * FROM users WHERE email='$email'");
		    if ($result->num_rows != 0) {
		        $row = mysqli_fetch_assoc($result);
		        $user =  $row['id'];

				// Get all the projects that the user owns and append to projects array
				$sql = 'SELECT * FROM projects WHERE user ="'. $user. '"';
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
				        $response['name'] = $row["name"];
				        $response['width'] = $row["width"];
				        $response['height'] = $row["height"];
				        $response['depth'] = $row["depth"];
				        $response['unit'] = $row["unit"];
				        $response['edgeType'] = $row["edgeType"];
				        $response['holes'] = $row["holes"];
						array_push($projects, $response);
				    }
				}
		    }
			// print_r($projects);
		}
	?>

<div class="container">
    <h1 id="library-title">Library</h1>
	<div class="row" id="library-row">
		<?php foreach ($projects as $project): ?>
	        <div class="col-4 card-col">
	            <div class="card" style="width: 18rem;">
	              <div class="card-body">
	                <h5 class="card-title"><?= $project['name']?></h5>
		                <p class="card-text">
							<ul class="specs-list">
								<li>Width: <?= $project['width']?> <?= $project['unit']?></li>
								<li>Height: <?= $project['height']?> <?= $project['unit']?></li>
								<li>Depth: <?= $project['depth']?> <?= $project['unit']?></li>
							</ul>
						</p>
	                <a href="#" class="btn btn-primary">Continue Project</a>
	                <button class="btnDelete btn-delete">
	                  <mdb-icon fas icon = "heart"> </mdb-icon>
	                  <i class = "material-icons">delete</i>
	                </button>
	              </div>
	            </div>
	        </div>
		<?php endforeach; ?>
		<div class="col-4">
			<a href="editor.php">
				<image class="add" href="../css/editor.css" src="img/add.png" align="middle">
			</a>
		</div>
	</div>

</div>


<?php include("includes/footer.php");?>

</body>

</html>
