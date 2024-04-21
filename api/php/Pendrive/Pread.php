<?php
include("../connect.php");

$sql = "SELECT * FROM pendrive";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$pendrive = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $pendrive[$index]['id'] = $line['id'];
  $pendrive[$index]['name'] = $line['name'];
  $pendrive[$index]['sku'] = $line['sku'];
  $pendrive[$index]['warranty'] = $line['warranty'];
  $pendrive[$index]['storage'] = $line['storage'];
  $pendrive[$index]['writespeed'] = $line['writespeed'];
  $pendrive[$index]['discount'] = $line['discount'];


  $index++;
}

echo json_encode(['pendrive' => $pendrive]);


?>