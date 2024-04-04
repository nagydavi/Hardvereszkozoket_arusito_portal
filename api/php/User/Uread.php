<?php
include("../connect.php");

$sql = "SELECT * FROM users";

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
  $users[$index]['type'] = $line['type'];

  $index++;
}

echo json_encode(['users' => $users]);


?>