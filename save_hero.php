<?php
header("Content-Type: application/json");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = $_POST['name'] ?? '';
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';

    // Image: accept an image URL from form field or a file upload
    $image = $_POST['image'] ?? '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $image = $targetDir . basename($_FILES['image']['name']);
        move_uploaded_file($_FILES['image']['tmp_name'], $image);
    }

    if ($name && $title && $description) {
        try {
            $sql = "INSERT INTO hero (id, name, title, description, image)
                    VALUES (1, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                    name = VALUES(name),
                    title = VALUES(title),
                    description = VALUES(description),
                    image = VALUES(image)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $title, $description, $image]);

            echo json_encode(["success" => true, "message" => "Hero saved successfully"]);
        } 
        catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
    }
}

else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
