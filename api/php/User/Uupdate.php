<?php
include("../connect.php");

$conn->set_charset("utf8");

$getData = file_get_contents('php://input');

// Extract JSON data
$data = json_decode($getData);


if (!isset($data->name) || !isset($data->password) || !isset($data->type_id)) {
    http_response_code(400);
    echo json_encode($data);
    echo json_encode(array('error' => 'Hiányzó adat(ok).'));
    exit;
}


// Detach json data
$id = $data->id;
$name = $data->name;
$password = $data->password;
$type_id = $data->type_id;


// SQL
$sql = "UPDATE users SET name='$name', password='$password', type_id=$type_id WHERE id=$id";
mysqli_query($conn, $sql);

// Export data
$users = array(
  'id' => $id,
  'name' => $name,
  'password' => $password,
  'type_id' => $type_id
);

echo json_encode(array('users' => $users));
?>