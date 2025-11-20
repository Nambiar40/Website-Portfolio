<?php
header("Content-Type: application/json");

$host = '127.0.0.1';
$port = 3307;
$dbname = 'myportfolio';
$username = 'root';
$password = '1234';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM hero WHERE id = 1");
    $hero = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($hero) {
        echo json_encode($hero);
    } else {
        echo json_encode(['name' => '', 'title' => '', 'description' => '', 'image' => '']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
