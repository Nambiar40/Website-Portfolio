<?php
include 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM about LIMIT 1");
    $about = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($about) {
        echo json_encode(['content' => $about['content']]);
    } else {
        echo json_encode(['error' => 'No about data found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
