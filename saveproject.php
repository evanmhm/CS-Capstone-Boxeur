<?php
// file that handles the POST request from 3dmodel.js to save the project
session_save_path("/tmp");
session_start();

if (isset($_SESSION['access_token']) && $_SESSION['access_token'] && !empty($_POST)) {
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

    // get user object from database
    $email = $_SESSION["account"]["email"];

    $result = $conn->query("SELECT * FROM users WHERE email='$email'");
    if ($result->num_rows != 0) {
        $row = mysqli_fetch_assoc($result);
        $user =  $row['id'];

        // sanitize all data from POST request
        $name = mysqli_real_escape_string($conn, $_POST["name"]);
        $w = mysqli_real_escape_string($conn, $_POST["width"]);
        $h = mysqli_real_escape_string($conn, $_POST["height"]);
        $d = mysqli_real_escape_string($conn, $_POST["depth"]);
        $unit = mysqli_real_escape_string($conn, $_POST["unit"]);
        $edge = mysqli_real_escape_string($conn, $_POST["edgeType"]);
        $holes = mysqli_real_escape_string($conn, $_POST["holes"]);
        if (strlen($name) > 512) {$name = "";}

        // get projects that belong to the user
        $sql = 'SELECT * FROM projects WHERE user ="'. $user. '"';
        $found_dup = False;

        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // if the name of a project already exists, update it with the new information
            while($row = $result->fetch_assoc()) {
                if($row["name"] == $name) {
                    $found_dup = True;
                    $dup_id = $row["id"];

                    $sql = "UPDATE projects SET
                    unit='$unit', width='$w', height='$h', depth='$d', edgeType='$edge', holes='$holes'
                    WHERE id='$dup_id'";

                    break;
                }
            }
        }
        // if no project of the same name exists, insert a new one into the table
        if (!$found_dup) {
            $sql = "INSERT INTO projects (user,name,unit,width,height,depth,edgeType,holes)
            VALUES ('$user','$name', '$unit', '$w', '$h', '$d', '$edge', '$holes')";
        }
        // run the query to update or insert the project
        if ($conn->query($sql) === TRUE) {
            echo "Project saved!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    $conn->close();
}
?>
