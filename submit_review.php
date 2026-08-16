<?php
header("Content-Type: application/json");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $rating = intval($_POST['rating'] ?? 5);
    $comment = trim($_POST['comment'] ?? '');

    if (empty($name) || empty($comment)) {
        echo json_encode(["status" => "error", "message" => "Name and comment are required."]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO reviews (name, rating, comment) VALUES (:name, :rating, :comment)");
        $stmt->execute([
            ':name' => $name,
            ':rating' => $rating,
            ':comment' => $comment
        ]);
        echo json_encode(["status" => "success", "message" => "Review added successfully!"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>