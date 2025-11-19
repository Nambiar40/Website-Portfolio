<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Include DB connection and handle errors gracefully so we always return JSON
try {
    include __DIR__ . '/db.php';
    if (!isset($pdo) || !($pdo instanceof PDO)) {
        throw new Exception('Database connection not available');
    }
} catch (Throwable $e) {
    http_response_code(500);
    error_log('[load_hero] DB include error: ' . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

try {
    $stmt = $pdo->query("SELECT * FROM hero LIMIT 1");
    $hero = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($hero) {
        echo json_encode($hero);
    } else {
        echo json_encode(['name' => '', 'title' => '', 'description' => '', 'image' => '']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
