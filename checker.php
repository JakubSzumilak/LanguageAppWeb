<?php
if (session_status() !== PHP_SESSION_ACTIVE)
    session_start();

if (isset($_SESSION['userID']))
    echo $_SESSION['userID'];
else
    echo '-1';


?>