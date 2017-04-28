<?php 
$email = $_GET['email'];
$email = urldecode($email);


if (!filter_var($email, FILTER_VALIDATE_EMAIL))
    echo "invalidFormat";
else if($email == "s@s.s")
        echo "ocuppied";
    else echo "free";

?>