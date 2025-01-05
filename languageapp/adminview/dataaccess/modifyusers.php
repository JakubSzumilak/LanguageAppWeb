<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'languageappdb';

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// USER MANAGEMENT
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add'])) {
        //add - LET THERE BE LIGHT
        $login = $_POST['login'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $email = $_POST['email'];
        $stmt = $conn->prepare("INSERT INTO users (login, password, email) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $login, $password, $email);
        $stmt->execute();
    } elseif (isset($_POST['edit'])) {
        //edit - stuff will change around here
        $id = $_POST['id'];
        $login = $_POST['login'];
        $email = $_POST['email'];
        $isAdmin = $_POST['bIsAdmin'];
        $stmt = $conn->prepare("UPDATE users SET login = ?, email = ?, bIsAdmin = ? WHERE ID = ?");
        $stmt->bind_param('ssii', $login, $email, $isAdmin, $id);
        $stmt->execute();
    } elseif (isset($_POST['delete'])) {
        //remove - pull the lever Khronk. WRONG LEVELR! remove the user 
        $id = $_POST['id'];
        $stmt = $conn->prepare("DELETE FROM users WHERE ID = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
    }
}

$result = $conn->query("SELECT * FROM users");
echo "<h1>User Management</h1>";
echo "<table border='1'><tr><th>ID</th><th>Login</th><th>Email</th><th>Is Admin</th><th>Actions</th></tr>";
while ($row = $result->fetch_assoc()) {
    echo "<tr><td>{$row['ID']}</td><td>{$row['login']}</td><td>{$row['email']}</td><td>{$row['bIsAdmin']}</td>";
    echo "<td>
        <form method='post' style='display:inline;'>
            <input type='hidden' name='id' value='{$row['ID']}'>
            <button name='edit' type='submit'>Edit</button>
            <button name='delete' type='submit'>Delete</button>
        </form>
    </td></tr>";
}
echo "</table>";
echo "<h3>Add New User</h3>
    <form method='post'>
        <input type='text' name='login' placeholder='Login'>
        <input type='password' name='password' placeholder='Password'>
        <input type='email' name='email' placeholder='Email'>
        <button name='add' type='submit'>Add</button>
    </form>";

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Modification</title>
    <link rel="stylesheet" href="modusrstyle.css">
</head>
<body>
<!-- 
Wait its empty? how can it be?
-->
</body>
</html>
