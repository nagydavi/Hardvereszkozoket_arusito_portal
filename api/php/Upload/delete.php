<?php
$folderPath = "../assets/";

$response = array();
$getData = file_get_contents('php://input');

// Extract JSON data
$data = json_decode($getData);
$filename = trim($data->filename);

// Ellenőrizzük, hogy a fájlnév meg van-e adva
if (isset($filename)) {
    // A törlendő fájlnév
    // Teljes elérési út a fájlhoz
    $filePath = $folderPath . $filename;

    // Ellenőrizzük, hogy a fájl létezik-e
    if (file_exists($filePath)) {
        // Töröljük a fájlt
        if (unlink($filePath)) {
            $response['status'] = true;
            $response['message'] = 'A fájl sikeresen törölve lett.';
        } else {
            $response['status'] = false;
            $response['message'] = 'Hiba történt a fájl törlése közben.';
        }
    } else {
        $response['status'] = false;
        $response['message'] = 'A fájl nem található.';
    }
} else {
    $response['status'] = false;
    $response['message'] = 'Nincs fájlnév megadva.';
}

// Visszaadjuk a választ JSON formátumban
echo json_encode($response);
?>
