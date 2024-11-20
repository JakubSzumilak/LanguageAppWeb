<?php
// Add email field in phpmyadmin
// Connect to database
// Check if user with the same login or email already exists
// If not, hash the password and add the user
// Echo error message on error or 'success' on success.

if (session_status() !== PHP_SESSION_ACTIVE)
    session_start();

include_once("../connection.php");

$login = $_POST['login'];
$password = $_POST['password'];
$email = $_POST['email'];

$sql = "SELECT * FROM users WHERE login=:login";
$query = $conn->prepare($sql);
$query->bindParam(':login', $login, PDO::PARAM_STR);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_OBJ);

if ($query->rowCount() > 0) {
    echo 'Login already taken';
    return;
}

$sql = "SELECT * FROM users WHERE email=:email";
$query = $conn->prepare($sql);
$query->bindParam(':email', $email, PDO::PARAM_STR);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_OBJ);

if ($query->rowCount() > 0) {
    echo 'Email already taken';
    return;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users(login, password, email) VALUES ('$login','$hashed_password','$email')";
$query = $conn->prepare($sql);

$query->execute();

echo 'success';