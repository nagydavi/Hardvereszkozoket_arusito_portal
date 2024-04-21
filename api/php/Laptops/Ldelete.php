<?php
include("../connect.php");
mysqli_set_charset($conn, 'utf8');

// Extract query parameters
$id = $_GET['id'];

// SQL
$sql = "DELETE FROM laptops WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$result = $stmt->execute();

if ($result) {
    $response = array("message" => "Laptop törlése sikeres");
    http_response_code(200);
} else {
    $response = array("message" => "Sikertelen törlés");
    http_response_code(500);
}

echo json_encode($response);
?>