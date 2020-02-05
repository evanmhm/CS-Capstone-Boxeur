<?php
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
    $userData = $objRes->userinfo->get();

    if (!empty($userData)) {
        //insert data into database
    }
    $_SESSION['access_token'] = $client->getAccessToken();
    $_SESSION['userData'] = $userData;
} else {
    $googleAuthUrl  =  $client->createAuthUrl();
}

//Logout
if (isset($_REQUEST['logout'])) {
    unset($_SESSION['access_token']);
    unset($_SESSION['userData']);
    $client->revokeToken();
    header('Location: index.php'); //redirect user back to page
}
