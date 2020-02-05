<title><?php print ("Boxeur | " . $PAGE_TITLE);?></title>

<?php if ($CURRENT_PAGE == "Index") { ?>
	<meta name="description" content="" />
	<meta name="keywords" content="" />
<?php }
include_once("google_oauth_config.php");

if (!isset($_SESSION)) { session_start(); }
ini_set('display_errors', 'On')
?>

<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="css/main.css" type="text/css">
<link rel="stylesheet" href="css/editor.css" type="text/css">
<script src="js/main.js"></script>
