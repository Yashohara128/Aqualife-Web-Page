<?php
header("Content-Type: application/json");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product = $_POST['product'] ?? '';
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $plan = $_POST['plan'] ?? '';
    $paymentType = $_POST['paymentType'] ?? 'cash';
    $address = $_POST['address'] ?? '';
    $slipPath = null;

    // Slip Upload Handling (Online Bank Transfer තේරූ විට)
    if ($paymentType === 'bank' && isset($_FILES['slip']) && $_FILES['slip']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['slip']['tmp_name'];
        $fileName = $_FILES['slip']['name'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
        if (in_array($fileExtension, $allowedExtensions)) {
            $newFileName = time() . '_' . uniqid() . '.' . $fileExtension;
            $destPath = 'uploads/' . $newFileName;

            if (move_uploaded_file($fileTmpPath, $destPath)) {
                $slipPath = $destPath;
            }
        }
    }

    try {
        $sql = "INSERT INTO filter_requests (full_name, phone, product_name, payment_plan, payment_method, slip_path, address) 
                VALUES (:full_name, :phone, :product_name, :payment_plan, :payment_method, :slip_path, :address)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':full_name' => $name,
            ':phone' => $phone,
            ':product_name' => $product,
            ':payment_plan' => $plan,
            ':payment_method' => $paymentType,
            ':slip_path' => $slipPath,
            ':address' => $address
        ]);

        echo json_encode(["status" => "success", "message" => "Request submitted successfully!"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Failed to save request: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>