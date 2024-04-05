<?php
include("../connect.php");

$sql = "SELECT * FROM users";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$users = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $users[$index]['id'] = $line['id'];
  $users[$index]['name'] = $line['name'];
  $users[$index]['password'] = $line['password'];
  $users[$index]['type_id'] = $line['type_id'];

  $index++;
}

echo json_encode(['users' => $users]);


?>