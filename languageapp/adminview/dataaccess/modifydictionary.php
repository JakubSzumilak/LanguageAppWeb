<?php
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'languageappdb';

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// TERMS MANAGEMENT
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add'])) {
        //add - Just pretend it's nothing
        $term = $_POST['term'];
        $translation = $_POST['translation'];
        $example = $_POST['example'];
        $stmt = $conn->prepare("INSERT INTO terms (term, translation, example) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $term, $translation, $example);
        $stmt->execute();
    } elseif (isset($_POST['edit'])) {
        //edit - As if that's the way it's supposed to be, we know things are bad, worse than bad: they're crazy!
        $id = $_POST['id'];
        $term = $_POST['term'];
        $translation = $_POST['translation'];
        $example = $_POST['example'];
        $stmt = $conn->prepare("UPDATE terms SET term = ?, translation = ?, example = ? WHERE ID = ?");
        $stmt->bind_param('sssi', $term, $translation, $example, $id);
        $stmt->execute();
    } elseif (isset($_POST['delete'])) {
        // remove - pull the lever Khronk. WRONG LEVELR! remove the word from dictionary  
        $id = $_POST['id'];
        $stmt = $conn->prepare("DELETE FROM terms WHERE ID = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
    }
}

$result = $conn->query("SELECT * FROM terms");
echo "<h1>Terms Management</h1>";
echo "<table border='1'><tr><th>ID</th><th>Term</th><th>Translation</th><th>Example</th><th>Actions</th></tr>";
while ($row = $result->fetch_assoc()) {
    echo "<tr><td>{$row['ID']}</td><td>{$row['term']}</td><td>{$row['translation']}</td><td>{$row['example']}</td>";
    echo "<td>
        <form method='post' style='display:inline;'>
            <input type='hidden' name='id' value='{$row['ID']}'>
            <button name='edit' type='submit'>Edit</button>
            <button name='delete' type='submit'>Delete</button>
        </form>
    </td></tr>";
}
echo "</table>";
echo "<h3>Add New Term</h3>
    <form method='post'>
        <input type='text' name='term' placeholder='Term'>
        <input type='text' name='translation' placeholder='Translation'>
        <input type='text' name='example' placeholder='Example'>
        <button name='add' type='submit'>Add</button>
    </form>";

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>database Modification</title>
</head>
<body>
<!-- 
Wait its empty? how can it be?
-->
</body>
</html>