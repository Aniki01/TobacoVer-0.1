<?php
    $login = $_POST['login'];
    $login = urldecode($login);
    $email = $_POST['email'];
    $email = urldecode($email);
    $password = $_POST['password'];
    $password = urldecode($password);
    $str = $password;
    echo $login, $email, $password;
?>