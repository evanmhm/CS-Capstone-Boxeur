<html>
<body>
    <?php
    session_start();
    echo "string";
    unset($_SESSION['access_token']);
    unset($_SESSION['userData']);
    $client->revokeToken();
    ?>
    hey
</body>
</html>
