<?php
session_save_path("/tmp");
session_start();

//Google API PHP Library includes
require_once 'vendor/autoload.php';

// Set config params to acces Google API
$client_id = '173728842922-gdj34rkacnhnjtk0lir9nno2kbflvbt1.apps.googleusercontent.com';
$client_secret = 'CBwmgkt7xF5Wr9vh_oIo39AW';
$redirect_uri = 'http://web.engr.oregonstate.edu/~hopperme/boxeur/index.php';

//Create and Request to access Google API
$client = new Google_Client();
$client->setApplicationName("Boxeur");
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope('openid');
$client->addScope('profile');
$client->addScope('email');

$objRes = new Google_Service_Oauth2($client);

//Add access token to php session after successfully authenticate
if (isset($_GET['code']) && !isset($_SESSION['access_token'])) {
    $client->authenticate($_GET['code']);
    $_SESSION['access_token'] = $client->getAccessToken();
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

//set token
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
    $client->setAccessToken($_SESSION['access_token']);
}

//store with user data
if ($client->getAccessToken()) {
    try {
        $userData = $objRes->userinfo->get();
        $_SESSION['access_token'] = $client->getAccessToken();
        $_SESSION['userData'] = $userData;
        
        // if there is user data from google
        if (!empty($userData)) {
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

            // if no results for user query
            if ($result->num_rows == 0) {
                // make new user
                $first = mysqli_real_escape_string($conn, $userData["givenName"]);
                $last = mysqli_real_escape_string($conn, $userData["familyName"]);
                $picture = mysqli_real_escape_string($conn, $userData["picture"]);

                $sql = "INSERT INTO users (first_name, last_name, email, picture, created, modified)
                VALUES ('$first', '$last', '$email', '$picture', 'NOW()', 'NOW()')";
                if ($conn->query($sql) === TRUE) {
                    $last_id = $conn->insert_id;
                }
            } else {
                $finfo = $result->fetch_row();
                // var_dump($finfo);
                $_SESSION["account"]["first_name"] = $finfo[3];
                $_SESSION["account"]["last_name"] = $finfo[4];
                $_SESSION["account"]["email"] = $finfo[5];
                $_SESSION["account"]["picture"] = $finfo[6];
            }
            $conn->close();
        }
    } catch (Exception $e) {
        unset($_SESSION['access_token']);
        unset($_SESSION['userData']);
        unset($_SESSION['account']);
        $client->revokeToken();
        $googleAuthUrl = $client->createAuthUrl();

        // header('Location: login.php'); //redirect user back to page
    }
} else {
    $googleAuthUrl = $client->createAuthUrl();
}

//Logout
if (isset($_REQUEST['logout'])) {
    unset($_SESSION['access_token']);
    unset($_SESSION['userData']);
    unset($_SESSION['account']);
    $client->revokeToken();
    header('Location: index.php'); //redirect user back to page
}
