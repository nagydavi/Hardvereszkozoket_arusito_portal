<?php
include("../connect.php");

$sql = "SELECT * FROM images";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$images = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $images[$index]['id'] = $line['id'];
  $images[$index]['type'] = $line['type'];
  $images[$index]['product_id'] = $line['product_id'];
  $images[$index]['pic_name'] = $line['pic_name'];



  $index++;
}

echo json_encode(['image' => $images]);


?>