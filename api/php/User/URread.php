<?php
include("../connect.php");

$sql = "SELECT * FROM user_role";

mysqli_set_charset($conn, 'utf8');

$execute = mysqli_query($conn, $sql);

if (!$execute) {
    exit('Query failed: '.mysqli_error($conn).PHP_EOL);
}

$user_role = [];
$index = 0;

while($line = mysqli_fetch_assoc($execute)) {
  $user_role[$index]['id'] = $line['id'];
  $user_role[$index]['role_name'] = $line['role_name'];
  $index++;
}

echo json_encode(['user_role' => $user_role], JSON_UNESCAPED_UNICODE);


?>