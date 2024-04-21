<?php
include("../connect.php");

$sql = "SELECT * FROM laptops";
mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$laptops = [];
$index = 0;


while($line = mysqli_fetch_assoc($execute)) {
  $laptops[$index]['id'] = $line['id'];
  $laptops[$index]['name'] = $line['name'];
  $laptops[$index]['resolution'] = $line['resolution'];
  $laptops[$index]['screen'] = $line['screen'];
  $laptops[$index]['processor'] = $line['processor'];
  $laptops[$index]['grafic_card'] = $line['grafic_card'];
  $laptops[$index]['ram'] = $line['ram'];
  $laptops[$index]['ssd'] = $line['ssd'];
  $laptops[$index]['op_system_id'] = $line['op_system_id'];
  $laptops[$index]['price'] = $line['price'];
  $laptops[$index]['warranty'] = $line['warranty'];
  $laptops[$index]['battery'] = $line['battery'];
  $laptops[$index]['weight'] = $line['weight'];
  $laptops[$index]['keyboard'] = $line['keyboard'];
  $laptops[$index]['laptop_type_id'] = $line['laptop_type_id'];
  $laptops[$index]['discount'] = $line['discount'];



  $index++;
}

echo json_encode(['laptops' => $laptops]);
?>