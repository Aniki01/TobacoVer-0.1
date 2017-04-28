<?php 
$login = $_GET['login'];
$login = urldecode($login);

    if($login == Aniki){
        echo "ocuppied";
    }else echo "free";

?>