<?php
// Add email field in phpmyadmin
// Connect to database
// Check if user with the same login or email already exists
// If not, hash the password and add the user
// Echo error message on error or 'success' on success.

if (session_status() !== PHP_SESSION_ACTIVE)
    session_start();

if (!isset($_SESSION['userID'])) {
    echo 'Failed to find user account';
}

include_once("../../connection.php");

$time = $_POST['time'];
$id = $_SESSION['userID'];

$sql = "UPDATE users set timeSpent = :time WHERE ID=:id";
$query = $conn->prepare($sql);
$query->bindParam(':time', $time, PDO::PARAM_INT);
$query->bindParam(':id', $id, PDO::PARAM_INT);
$query->execute();

echo 'success';