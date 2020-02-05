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
	?>
</head>
<body>
	<?php include("includes/nav.php");?>
	<div class="container">
		<div class="card">
			<div class="card-body">
				<h2 class="card-title"><?php echo $_SESSION['userData']['given_name']; ?></h2>
				<p> way to edit name and account info, and delete account</p>
			</div>
		</div>
	</div>
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
	<?php include("includes/footer.php");?>
</body>
</html>
