<?php
session_start();
include_once("connection.php");

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE login=:username and password=:password";
$query = $conn->prepare($sql);
$query->bindParam(':username', $username, PDO::PARAM_STR);
$query->bindParam(':password', $password, PDO::PARAM_STR);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_OBJ);

if ($query->rowCount() > 0) {
    $_SESSION['username'] = $_POST['username'];
    echo 'true';
} else {
    echo 'false';
}

?>