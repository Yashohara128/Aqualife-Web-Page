<?php
header("Content-Type: application/json");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userOrEmail = trim($_POST['username_email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

    if (empty($userOrEmail) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Please enter username and password!"]);
        exit();
    }

    try {
        // 1. User Login Activity එක Database එකේ Save කිරීම
        $stmt = $pdo->prepare("INSERT INTO user_logins (username_email, ip_address) VALUES (:username_email, :ip_address)");
        $stmt->execute([
            ':username_email' => $userOrEmail,
            ':ip_address' => $ipAddress
        ]);

        // 2. Admin Login එකක්ද නැද්ද යන්න පරීක්ෂා කිරීම
        if ($userOrEmail === "admin" && $password === "admin123") {
            echo json_encode(["status" => "success", "role" => "admin", "redirect" => "admin-dashboard.php"]);
        } else {
            // සාමාන්‍ය User කෙනෙක් නම් Services පේජ් එකට
            echo json_encode(["status" => "success", "role" => "user", "redirect" => "services.html"]);
        }

    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>