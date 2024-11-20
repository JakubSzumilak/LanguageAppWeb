<?php
if (session_status() !== PHP_SESSION_ACTIVE)
    session_start();
if (!isset($_SESSION['userID'])) {
    echo '-1';
    return;
}

include_once("../../connection.php");

$sql = "SELECT login, timeSpent FROM users WHERE ID=:id";
$query = $conn->prepare(query: $sql);
$query->bindParam(':id', $_SESSION['userID'], PDO::PARAM_STR);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_OBJ);

if ($query->rowCount() > 0) {
    echo json_encode($result[0]);
    return;
}