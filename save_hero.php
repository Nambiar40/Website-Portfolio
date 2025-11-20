<?php
header("Content-Type: application/json");

include 'db.php';

$name = $_POST['name'];
$title = $_POST['title'];
$description = $_POST['description'];
$image = $_POST['image'];

$stmt = $pdo->prepare("UPDATE hero SET name = ?, title = ?, description = ?, image = ? WHERE id = 1");
$stmt->execute([$name, $title, $description, $image]);

echo json_encode(['message' => 'Hero data saved successfully!']);
?>
