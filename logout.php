<html>

<body>
    <?php
    session_start();
    unset($_SESSION['access_token']);
    unset($_SESSION['userData']);
    $client->revokeToken();
    ?>
</body>

</html>
