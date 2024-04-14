<?php
$folderPath = "../assets/";
$response = array();

if (!empty($_FILES['fileUpload'])) {
    for ($i = 0; $i < count($_FILES['fileUpload']['name']); $i++) {
        $filename = $_FILES['fileUpload']['name'][$i];
        $target_file = $folderPath . basename($filename);
        if (move_uploaded_file($_FILES['fileUpload']["tmp_name"][$i], $target_file)) {
            $response[] = array('status' => true, 'message' => 'Sikeres feltöltés');
        } else {
            $response[] = array('status' => false, 'message' => 'Sikertelen feltöltés');
        }
    }
} else {
    $response[] = array('status' => false, 'message' => 'Nincs fájl kiválasztva');
}

echo json_encode($response);
?>