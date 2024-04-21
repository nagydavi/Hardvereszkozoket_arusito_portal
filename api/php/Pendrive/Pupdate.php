<?php
include("../connect.php");

$conn->set_charset("utf8");

$getData = file_get_contents('php://input');

// Extract JSON data
$data = json_decode($getData);

if (!isset($data->name) || !isset($data->sku) || !isset($data->warranty) || !isset($data->discount) || !isset($data->storage) || !isset($data->writespeed) ) {
    http_response_code(400);
    echo json_encode($data);
    echo json_encode(array('error' => 'Hiányzó adat(ok).'));
    exit;
}


// Detach json data
$id = $data->id;
$name = $data->name;
$sku = $data->sku;
$warranty = $data->warranty;
$discount = $data->discount ? 1 : 0;
$storage = intval($data->storage);
$writespeed = intval($data->writespeed);


// SQL
$sql = "UPDATE pendrive SET name='$name', sku='$sku', warranty='$warranty', discount=$discount, storage=$storage, writespeed=$writespeed WHERE id=$id";
$result = mysqli_query($conn, $sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(array('error' => 'Hiba történt az adatbázis frissítése közben: ' . mysqli_error($conn)));
    exit;
}

// Export data
$pendrive = array(
    'id' => $id,
    'name' => $name,
    'sku' => $sku,
    'warranty' => $warranty,
    'discount' => $discount,
    'storage' => $storage,
    'writespeed' => $writespeed

);

echo json_encode(array('pendrive' => $pendrive));
?>