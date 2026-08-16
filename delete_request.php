<?php
header("Content-Type: application/json");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id'] ?? 0);

    if ($id <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid request ID."]);
        exit();
    }

    try {
        // Slip Image එකක් තිබේ නම් uploads ෆෝල්ඩරයෙන්ද මකා දැමීම
        $stmtSlip = $pdo->prepare("SELECT slip_path FROM filter_requests WHERE id = :id");
        $stmtSlip->execute([':id' => $id]);
        $request = $stmtSlip->fetch(PDO::FETCH_ASSOC);

        if ($request && !empty($request['slip_path']) && file_exists($request['slip_path'])) {
            unlink($request['slip_path']);
        }

        // Database Record එක මකා දැමීම
        $stmt = $pdo->prepare("DELETE FROM filter_requests WHERE id = :id");
        $stmt->execute([':id' => $id]);

        echo json_encode(["status" => "success", "message" => "Request deleted successfully!"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>