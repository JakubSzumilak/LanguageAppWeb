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

$id = $_SESSION['userID'];

if (isset($_POST['correct'])) {
    // Saving full user data
    $sql = "UPDATE users set totalCorrect = totalCorrect + :correct, totalMistakes = totalMistakes + :mistakes, totalRounds = totalRounds + :rounds WHERE ID=:id";
    $query = $conn->prepare($sql);
    $query->bindParam(':correct', $_POST['correct'], PDO::PARAM_INT);
    $query->bindParam(':mistakes', $_POST['mistakes'], PDO::PARAM_INT);
    $query->bindParam(':rounds', $_POST['rounds'], PDO::PARAM_INT);
    $query->bindParam(':id', $id, PDO::PARAM_INT);
    $query->execute();
    echo 'success';
    return;
}
$time = $_POST['time'];
$sql = "UPDATE users set timeSpent = :time WHERE ID=:id";
$query = $conn->prepare($sql);
$query->bindParam(':time', $time, PDO::PARAM_INT);
$query->bindParam(':id', $id, PDO::PARAM_INT);
$query->execute();

echo 'success';