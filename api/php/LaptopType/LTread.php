<?php
include("../connect.php");

$sql = "SELECT * FROM laptop_type";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$laptop_type = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $laptop_type[$index]['id'] = $line['id'];
  $laptop_type[$index]['type'] = $line['type'];
  $index++;
}

echo json_encode(['laptopType' => $laptop_type], JSON_UNESCAPED_UNICODE);


?>