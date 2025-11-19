<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = trim($_POST['content']);

    if (empty($content)) {
        echo json_encode(['success' => false, 'message' => 'Content cannot be empty']);
        exit;
    }

    try {
        $sql = "INSERT INTO about (id, content) VALUES (1, ?) ON DUPLICATE KEY UPDATE content=VALUES(content)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$content]);

        echo json_encode(['success' => true, 'message' => 'About section updated successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
