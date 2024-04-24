<?php
include("../connect.php");

$sql = "SELECT * FROM ssd";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$ssd = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $ssd[$index]['id'] = $line['id'];
  $ssd[$index]['name'] = $line['name'];
  $ssd[$index]['sku'] = $line['sku'];
  $ssd[$index]['warranty'] = $line['warranty'];
  $ssd[$index]['storage'] = $line['storage'];
  $ssd[$index]['discount'] = $line['discount'];
  $ssd[$index]['price'] = $line['price'];
  $ssd[$index]['discountprice'] = $line['discount_price'];


  $index++;
}

echo json_encode(['ssd' => $ssd]);


?>