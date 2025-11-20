<?php
$host = '127.0.0.1';
$port = 3307;
$dbname = 'myportfolio';
$username = 'root';
$password = '1234';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "CONNECTED SUCCESSFULLY!";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
