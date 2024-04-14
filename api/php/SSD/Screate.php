<?php
include("../connect.php");

$conn->set_charset("utf8");

// Ellenőrizzük, hogy a POST kérés tartalmaz-e adatokat
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ellenőrizzük, hogy a kérés tartalmaz-e adatokat
    $postData = file_get_contents('php://input');
    if (!$postData) {
        http_response_code(400);
        echo json_encode(array('error' => 'Nincsenek adatok a kérésben.'));
        exit;
    }

    // JSON adatok dekódolása
    $data = json_decode($postData);

    // Ellenőrizzük, hogy minden szükséges adatot megkaptunk-e
    if (!isset($data->name) || !isset($data->sku) || !isset($data->warranty) || !isset($data->discount) || !isset($data->storage) ){
        http_response_code(400);
        echo json_encode($data);
        echo json_encode(array('error' => 'Hiányzó adat(ok).'));
        exit;
    }

    // Adatok kinyerése a JSON objektumból 
    $name = $data->name;
    $sku = $data->sku;
    $warranty = $data->warranty;
    $discount = $data->discount;
    $storage = $data->storage;



    // SQL lekérdezés előkészítése az adatok beszúrására
    $sql = "INSERT INTO ssd (name, sku, warranty, discount, storage) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array('error' => 'Hiba a SQL lekérdezés előkészítése közben: ' . $conn->error));
        exit;
    }

    // Adatok paraméterezése a lekérdezésben
    $stmt->bind_param('sssii', $name, $sku, $warranty, $discount, $storage); // 'sssi', hogy a paramok milyen típusúak lesznek string, string, string, integer, 
    $result = $stmt->execute();

    // Ellenőrizzük, hogy sikeres volt-e a beszúrás
    if ($result) {
        // Sikeres beszúrás esetén visszaküldjük az újonnan létrehozott felhasználó adatait
        $createdSsd = array(
            'name' => $name,
            'sku' => $sku,
            'warranty' => $warranty,
            'discount' => $discount,
            'storage' => $storage
        );
        echo json_encode(array('createdSsd' => $createdSsd));
    } else {

        // Ha hiba történt a beszúrás során, beállítjuk a megfelelő hibakódot
        http_response_code(500);
        echo json_encode(array(
            'error' => 'Hiba történt a felhasználó beszúrása közben.',
            'details' => $stmt->error,
            'result' => $result
        ));

    }
} else {
    // Ha nem POST kérés érkezett, visszaadjuk a megfelelő hibakódot
    http_response_code(405);
    echo $_SERVER['REQUEST_METHOD'];
    echo json_encode(array('error' => 'Csak POST kérések engedélyezettek.'));
}
?>
