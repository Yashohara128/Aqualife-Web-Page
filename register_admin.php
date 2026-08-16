<?php
session_start();
header("Content-Type: application/json");
require_once 'db.php';

// Security check: Only logged in admins can register new admins
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    echo json_encode(["status" => "error", "message" => "Unauthorized access!"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newUsername = trim($_POST['new_admin_user'] ?? '');
    $newPassword = trim($_POST['new_admin_pass'] ?? '');

    if (empty($newUsername) || empty($newPassword)) {
        echo json_encode(["status" => "error", "message" => "All fields are required!"]);
        exit();
    }

    if (strlen($newPassword) < 6) {
        echo json_encode(["status" => "error", "message" => "Password must be at least 6 characters!"]);
        exit();
    }

    try {
        // Check if username already exists
        $checkStmt = $pdo->prepare("SELECT id FROM admins WHERE username = :username");
        $checkStmt->execute([':username' => $newUsername]);
        if ($checkStmt->rowCount() > 0) {
            echo json_encode(["status" => "error", "message" => "Username already exists!"]);
            exit();
        }

        // Hash the password securely
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("INSERT INTO admins (username, password) VALUES (:username, :password)");
        $stmt->execute([
            ':username' => $newUsername,
            ':password' => $hashedPassword
        ]);

        echo json_encode(["status" => "success", "message" => "New Admin registered successfully!"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?> 