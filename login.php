<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>

<head>
	<?php
		$PAGE_TITLE = "Login";
		include("includes/head-contents.php");
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
				<h2 class="card-title">Log in / Sign up</h2>
				<?php if (isset($googleAuthUrl)): ?>
				<a href="<?php echo $googleAuthUrl; ?>">
					<div class="google-btn">
						<div class="google-icon-wrapper">
							<img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
						</div>
						<p class="btn-text"><b>Sign in with google</b></p>
					</div>
				</a>
				<?php endif ?>
			</div>
		</div>
	</div>
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
	<?php include("includes/footer.php");?>
</body>

</html>
