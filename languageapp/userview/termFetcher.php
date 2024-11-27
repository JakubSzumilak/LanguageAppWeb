<?php
if (session_status() !== PHP_SESSION_ACTIVE)
    session_start();
if (!isset($_SESSION['userID'])) {
    echo '-1';
    return;
}

include_once("../../connection.php");

$firstID = $_POST['first'];
$lastID = $_POST['last'];

$sql = "SELECT term, translation FROM terms WHERE ID >= :first AND ID <= :last;";
$query = $conn->prepare(query: $sql);
$query->bindParam(':first', $firstID, PDO::PARAM_INT);
$query->bindParam(':last', $lastID, PDO::PARAM_INT);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_OBJ);

if ($query->rowCount() > 0) {
    echo json_encode($result);
    return;
}