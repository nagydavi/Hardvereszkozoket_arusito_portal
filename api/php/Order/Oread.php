<?php
include("../connect.php");

$sql = "SELECT * FROM `order`";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$order = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $order[$index]['id'] = $line['id'];
  $order[$index]['type'] = $line['type'];
  $order[$index]['email'] = $line['email'];
  $order[$index]['name'] = $line['name'];
  $order[$index]['address'] = $line['address'];
  $order[$index]['phone'] = $line['phone'];
  $order[$index]['date'] = $line['date'];
  $order[$index]['product'] = $line['product_id'];



  $index++;
}

echo json_encode(['order' => $order]);


?>