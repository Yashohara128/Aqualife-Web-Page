<?php
session_start();
header("Content-Type: application/json");
require_once 'db.php';

// Security: Logged in Admins only
if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    echo json_encode(["status" => "error", "message" => "Unauthorized access!"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);
    $currentAdmin = $_SESSION['admin_user'] ?? '';

    if ($id <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid Admin ID!"]);
        exit();
    }

    try {
        // 1. Admin සොයා ගැනීම
        $stmt = $pdo->prepare("SELECT username FROM admins WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $targetAdmin = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$targetAdmin) {
            echo json_encode(["status" => "error", "message" => "Admin not found!"]);
            exit();
        }

        // 2. තමන්ගේම Account එක Delete කිරීම වැළැක්වීම
        if ($targetAdmin['username'] === $currentAdmin) {
            echo json_encode(["status" => "error", "message" => "You cannot delete your own logged-in account!"]);
            exit();
        }

        // 3. අවසාන Adminව Delete කිරීම වැළැක්වීම
        $countStmt = $pdo->query("SELECT COUNT(*) FROM admins");
        if ($countStmt->fetchColumn() <= 1) {
            echo json_encode(["status" => "error", "message" => "Cannot delete the only remaining admin!"]);
            exit();
        }

        // 4. Admin ඉවත් කිරීම
        $delStmt = $pdo->prepare("DELETE FROM admins WHERE id = :id");
        $delStmt->execute([':id' => $id]);

        echo json_encode(["status" => "success", "message" => "Admin removed successfully!"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>