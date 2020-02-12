<?php include("includes/config.php");?>
<!DOCTYPE html>
<html>

<head>
	<?php
		$PAGE_TITLE = "Editor";
		include("includes/head-contents.php");
		// var_dump($_SESSION);
	?>
	<script src="js/editor.js" charset="utf-8" defer></script>
</head>

<body>

	<?php include("includes/nav.php");?>

	<?php include("includes/editor.php");?>

	<?php include("includes/footer.php");?>

</body>

</html>
