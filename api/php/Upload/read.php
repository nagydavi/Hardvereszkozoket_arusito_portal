<?php
$folderPath = "../assets/";
$response = array();

// Ellenőrizzük, hogy a mappa létezik
if ($handle = opendir($folderPath)) {
    while (false !== ($entry = readdir($handle))) {
        // Csak képfájlokra korlátozzuk a válaszban szereplő elemeket
        if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $entry)) {
            // Hozzáadjuk a kép nevét a válaszhoz
            $response[] = $entry;
        }
    }
    closedir($handle);
}

// Visszaadjuk az összes kép nevét JSON formátumban
echo json_encode($response);
?>

