<?php
session_start();
header("Content-Type: application/json");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $adminUser = trim($_POST['admin_username'] ?? '');
    $adminPass = trim($_POST['admin_password'] ?? '');

    if (empty($adminUser) || empty($adminPass)) {
        echo json_encode(["status" => "error", "message" => "Please enter username and password!"]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = :username LIMIT 1");
        $stmt->execute([':username' => $adminUser]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        // Password verification (Hashed password check හෝ Default fallback check)
        if ($admin && (password_verify($adminPass, $admin['password']) || ($adminUser === 'admin' && $adminPass === 'admin123'))) {
            $_SESSION['admin_logged'] = true;
            $_SESSION['admin_user'] = $admin['username'];
            echo json_encode(["status" => "success", "redirect" => "admin-dashboard.php"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid Admin Username or Password!"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>