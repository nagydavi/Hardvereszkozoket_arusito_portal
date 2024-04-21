<?php
include("../connect.php");

$sql = "SELECT * FROM operating_system";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$operating_system = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $operating_system[$index]['id'] = $line['id'];
  $operating_system[$index]['name'] = $line['name'];
  $index++;
}

echo json_encode(['opSys' => $operating_system], JSON_UNESCAPED_UNICODE);


?>