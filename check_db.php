<?php
$host = 'localhost';
$dbname = 'myportfolio';
$username = 'root'; // Change if different
$password = '1234'; // Change if different
$port = 3306; // MySQL is running on port 3306

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}

// Check if database exists
$result = $pdo->query("SHOW DATABASES LIKE 'myportfolio'");
if ($result->rowCount() > 0) {
    echo "Database 'myportfolio' exists.\n";
} else {
    echo "Database 'myportfolio' does not exist.\n";
}

// Check if tables exist
$tables = ['hero', 'about'];
foreach ($tables as $table) {
    $result = $pdo->query("SHOW TABLES LIKE '$table'");
    if ($result->rowCount() > 0) {
        echo "Table '$table' exists.\n";
    } else {
        echo "Table '$table' does not exist.\n";
    }
}

// Get row counts
foreach ($tables as $table) {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM $table");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "$table table has " . $row['count'] . " rows.\n";
}

// Get hero data
$stmt = $pdo->query("SELECT * FROM hero");
$hero = $stmt->fetch(PDO::FETCH_ASSOC);
echo "Hero data: " . json_encode($hero) . "\n";

// Get about data
$stmt = $pdo->query("SELECT * FROM about");
$about = $stmt->fetch(PDO::FETCH_ASSOC);
echo "About data: " . json_encode($about) . "\n";
?>
