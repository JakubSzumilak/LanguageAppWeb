<?php
if (session_status() !== PHP_SESSION_ACTIVE)
    session_start();
include_once "connection.php";

$username = $_POST['username'];
$password = $_POST['password'];

//$username = $_GET['username'];
//$password = $_GET['password'];
//echo "Haslo: $password, Login: $username";

$sql = "SELECT login, password, ID FROM users WHERE login=:username OR email=:username";
$query = $conn->prepare($sql);
$query->bindParam(':username', $username, PDO::PARAM_STR);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_OBJ);

if ($query->rowCount() > 0) {
    foreach ($result as $user) {
        if (password_verify($password, $user->password)) {
            $_SESSION['userID'] = $user->ID;
            echo $user->ID;
            return;
        }
    }
    echo 'false';
} else {
    echo 'false';
}

?>