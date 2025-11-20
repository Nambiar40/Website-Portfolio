<?php
include 'db.php';

try {
    $sql = "UPDATE hero SET image = 'images/yedu-portfolio.jpg' WHERE id = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    echo "Hero image updated successfully. Rows affected: " . $stmt->rowCount() . "\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
