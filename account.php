<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>

<head>
	<?php
        ob_start();
		$PAGE_TITLE = "Account";
		include("includes/head-contents.php");
        if (!isset($_SESSION['access_token']) || !$_SESSION['access_token']) {
            echo "<script type='text/javascript'>window.location.href='index.php'</script>";
        }
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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
            // make query to see if email is a user in our database
            $email = mysqli_real_escape_string($conn, $userData["email"]);
            $result = $conn->query("SELECT * FROM users WHERE email='$email'");
			$finfo = $result->fetch_row();

			$newName = $_POST['account-name'];
			$newName = filter_var($newName, FILTER_SANITIZE_STRING);

        	// if user found
            if ($result->num_rows != 0 && strcmp($finfo[3], $_POST['account-name']) !== 0 && strcmp($newName, "") !== 0) {
                // make new user
                $sql = "UPDATE users SET first_name='$newName'
				        WHERE email='$email'";
                if ($conn->query($sql) === TRUE) {
					$result = $conn->query("SELECT * FROM users WHERE email='$email'");
					$_SESSION['account']['first_name'] = $newName;
					$finfo = $result->fetch_row();
					// echo $finfo[3];
                }
            }
            $conn->close();
		}
		// var_dump($_SESSION['account']);
		?>
	<style>
		body {
			background-color: #23272A;
		}
	</style>
</head>

<body>
	<?php include("includes/nav.php");?>
	<div class="container">
		<div class="card" id="main-card">
			<div class="card-body">
				<h2 class="card-title">
					<?php echo $_SESSION['account']['first_name'];?>
				</h2>
				<form action="account.php" method="POST">
					<div class="form-group">
						<label for="account-name">Change account name</label>
						<input type="text" name="account-name" class="form-control" aria-describedby="accountname" placeholder="Name">
					</div>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
				<form action="account_delete.php" method="POST" style="margin-top: 15px;">
					<button type="submit" class="btn btn-danger">Delete Account</button>
				</form>
			</div>
		</div>
	</div>
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
	<?php include("includes/footer.php");?>
</body>

</html>
