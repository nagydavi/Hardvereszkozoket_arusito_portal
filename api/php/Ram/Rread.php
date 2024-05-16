<?php
include("../connect.php");

$sql = "SELECT * FROM ram";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$ram = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $ram[$index]['id'] = $line['id'];
  $ram[$index]['name'] = $line['name'];
  $ram[$index]['sku'] = $line['sku'];
  $ram[$index]['warranty'] = $line['warranty'];
  $ram[$index]['storage'] = $line['storage'];
  $ram[$index]['discount'] = $line['discount'];
  $ram[$index]['price'] = $line['price'];
  $ram[$index]['discountprice'] = $line['discount_price'];



  $index++;
}

echo json_encode(['ram' => $ram]);

?>