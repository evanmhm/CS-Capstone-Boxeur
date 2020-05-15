<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="index.php">boxeur</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="editor.php">Editor</a>
            </li>
            <?php if (isset($_SESSION['access_token']) && $_SESSION['access_token']): ?>
            <li class="nav-item">
                <a class="nav-link" href="library.php">Library</a>
            </li>
            <!-- <li class="search-wrapper" href="../css/editor.css">
              <form action="library.php">
                <input type="text" placeholder="Search Proejct.." name="search">
                <button type="submit"><i class="fa fa-search"></i></button>
              </form>
            </li> -->
            <?php endif;?>
            <?php if (!isset($_SESSION['access_token']) || !$_SESSION['access_token']): ?>
                <li class="nav-item">
                    <a class="nav-link" href="login.php">Log In</a>
                </li>
            <?php endif;?>

        </ul>

        <!-- if user is signed in... -->
        <?php if (isset($_SESSION['access_token']) && $_SESSION['access_token']): ?>
        <ul class="navbar-nav">
            <!--
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-user fa-lg" id="account"></i>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            -->
            <li class="nav-item">
                <a class="nav-link" href="account.php">
                    <i class="fa fa-user fa-lg" id="account"></i>
                </a>
            </li>

            <li class="nav-item">
                <form name="logout" method="POST" id="log-out-form">
                    <input type="hidden" name="logout" value="1">
                    <i class="fa fa-sign-out fa-lg nav-link" id="log-out"></i>
                </form>
            </li>
            <script>
            var button = $("#log-out");

            button.click(function() {
                console.log("submitting");
                $("#log-out-form").submit();
            });
            </script>
        </ul>
        <?php endif;?>

    </div>
</nav>
