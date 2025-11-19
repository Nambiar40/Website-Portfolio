<?php
$host = 'localhost';
$dbname = 'myportfolio';
$username = 'root'; // Change if different
$password = '1234'; // Change if different
$port = 3306; // MySQL is running on port 3306

try {
    // First connect without specifying database to create it
    $pdo = new PDO("mysql:host=$host;port=$port", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create database if it doesn't exist
    $sql = "CREATE DATABASE IF NOT EXISTS myportfolio";
    $pdo->exec($sql);

    echo "Database 'myportfolio' created successfully!";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
