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

				if (isset($_POST['del'])) {
					if($_POST['del'] == 1) {
						$proj_id = $_POST['id'];
						$sql = "DELETE FROM projects WHERE id='$proj_id' AND user='$user' ";

						if ($conn->query($sql) === TRUE) {
							echo "Record deleted successfully";
						} else {
							echo "Error deleting record: " . $conn->error;
						}
					}
				} else {
					// Get all the projects that the user owns and append to projects array
					$sql = 'SELECT * FROM projects WHERE user ="'. $user. '"';
					$result = $conn->query($sql);
					if ($result->num_rows > 0) {
					    while($row = $result->fetch_assoc()) {
					        $response['id'] = $row["id"];
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
		    }
			$conn->close();
		}
	?>
	<?php if (!isset($_SESSION['access_token']) || !$_SESSION['access_token']): ?>
		<script>window.location = 'index.php';</script>
	<?php endif;?>

<div class="container">
    <h1 id="library-title">Library</h1>
	<div class="row" id="library-row">
		<?php foreach ($projects as $index=>$project): ?>
	        <div class="col-md-6 col-lg-4 card-col">
	            <div class="card" style="width: 18rem;">
	              <div class="card-body">
	                <h5 class="card-title" style="font-weight: bold;"><?= $project['name']?></h5>
					<hr class="card-hr">
	                <p class="card-text">
						<ul class="specs-list">
							<li>Width: <?= $project['width']?> <?= $project['unit']?></li>
							<li>Height: <?= $project['height']?> <?= $project['unit']?></li>
							<li>Depth: <?= $project['depth']?> <?= $project['unit']?></li>
						</ul>
					</p>
					<a class="btn btn-primary cont-btn" id="cont-<?= $index?>">Continue Project</a>
	                <button class="btnDelete btn-delete" id="del-<?= $index?>">
						<i class="fa fa-trash-o fa-lg"></i>
	                </button>
	              </div>
	            </div>
	        </div>
			<script type="text/javascript">
				document.getElementById("cont-<?= $index?>").addEventListener('click', function() {
					sessionStorage.load = 'true';
					sessionStorage.name = "<?= $project['name']?>";
					sessionStorage.width = <?= $project['width']?>;
					sessionStorage.height = <?= $project['height']?>;
					sessionStorage.depth = <?= $project['depth']?>;
					sessionStorage.unit = "<?= $project['unit']?>";
					sessionStorage.edgeType = <?= $project['edgeType']?>;
					sessionStorage.holes = '<?= $project['holes']?>';
					window.location.href = "editor.php";
				});

				document.getElementById("del-<?= $index?>").addEventListener('click', function() {
					$.ajax({
					    url: 'library.php',
					    type: "POST",
					    data: { del: 1, id: <?= $project['id']?> }
					}).done(function( msg ) {
					    window.location = 'library.php';
					});
				});
			</script>
		<?php endforeach; ?>
		<div class="col-md-6 col-lg-4" style="padding-top:40px;">
			<a href="editor.php">
				<image class="add" href="../css/editor.css" src="img/add.png" align="middle">
			</a>
		</div>
	</div>

</div>


<?php include("includes/footer.php");?>

</body>

</html>
