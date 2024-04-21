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

    // Tárolja azokat a mezőket, amelyek hiányoznak
$missingData = array();

// Ellenőrizzük, hogy minden szükséges adat megvan-e
if (!isset($data->name)) {
    $missingData[] = 'Név';
}
if (!isset($data->resolution)) {
    $missingData[] = 'Felbontás';
}
if (!isset($data->screen)) {
    $missingData[] = 'Képernyő méret';
}
if (!isset($data->processor)) {
    $missingData[] = 'Processzor';
}
if (!isset($data->grafic_card)) {
    $missingData[] = 'Grafikus kártya';
}
if (!isset($data->ram)) {
    $missingData[] = 'RAM';
}
if (!isset($data->ssd)) {
    $missingData[] = 'SSD';
}
if (!isset($data->op_system_id)) {
    $missingData[] = 'Oprendszer';
}
if (!isset($data->price)) {
    $missingData[] = 'Ár';
}
if (!isset($data->warranty)) {
    $missingData[] = 'Garancia';
}
if (!isset($data->battery)) {
    $missingData[] = 'Akkumulátor';
}
if (!isset($data->weight)) {
    $missingData[] = 'Súly';
}
if (!isset($data->keyboard)) {
    $missingData[] = 'Billentyűzet';
}
if (!isset($data->laptop_type_id)) {
    $missingData[] = 'Típus';
}
if (!isset($data->discount)) {
    $missingData[] = 'Akció';
}

// Ha hiányzó adatok vannak, küldjünk vissza hibakódot és üzenetet
if (!empty($missingData)) {
    http_response_code(400);
    echo json_encode(array('error' => 'Hiányzó adat(ok): ' . implode(', ', $missingData)));
    exit;
}



    // Ellenőrizzük, hogy minden szükséges adatot megkaptunk-e
    if (!isset($data->name) || !isset($data->resolution) || !isset($data->screen) || !isset($data->processor) || !isset($data->grafic_card) || !isset($data->ram) || !isset($data->ssd) || !isset($data->op_system_id) || !isset($data->price) || !isset($data->warranty) || !isset($data->battery) || !isset($data->weight) || !isset($data->keyboard) || !isset($data->laptop_type_id) || !isset($data->discount) ) {
        http_response_code(400);
        echo json_encode($data);
        echo json_encode(array('error' => 'Hiányzó adat(ok).'));
        exit;
    }

    // Adatok kinyerése a JSON objektumból 
    $name = $data->name;
    $resolution = $data->resolution;
    $screen = intval($data->screen);
    $processor = $data->processor;
    $grafic_card = $data->grafic_card;
    $ram = $data->ram;
    $ssd = $data->ssd;
    $op_system_id = $data->op_system_id;
    $price = intval($data->price);
    $warranty = $data->warranty;
    $battery = $data->battery;
    $weight = intval($data->weight);
    $keyboard = $data->keyboard;
    $laptop_type_id = $data->laptop_type_id;
    $discount = $data->discount ? 1 : 0;



    // SQL lekérdezés előkészítése az adatok beszúrására
    $sql = "INSERT INTO laptops (name, resolution, screen, processor, grafic_card, ram, ssd, op_system_id, price, warranty, battery, weight, keyboard, laptop_type_id, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array('error' => 'Hiba a SQL lekérdezés előkészítése közben: ' . $conn->error));
        exit;
    }

    // Adatok paraméterezése a lekérdezésben
    $stmt->bind_param('ssissssiissisii', $name, $resolution, $screen, $processor, $grafic_card, $ram, $ssd, $op_system_id, $price, $warranty, $battery, $weight, $keyboard, $laptop_type_id, $discount);
    $result = $stmt->execute();

    // Ellenőrizzük, hogy sikeres volt-e a beszúrás
    if ($result) {
        // Sikeres beszúrás esetén visszaküldjük az újonnan létrehozott felhasználó adatait
        $laptop = array(
            'id' => $id,
            'name' => $name,
            'resolution' => $resolution,
            'screen' => $screen,
            'processor' => $processor,
            'grafic_card' => $grafic_card,
            'ram' => $ram,
            'ssd' => $ssd,
            'op_system_id' => $op_system_id,
            'price' => $price,
            'warranty' => $warranty,
            'battery' => $battery,
            'weight' => $weight,
            'keyboard' => $keyboard,
            'laptop_type_id' => $laptop_type_id,
            'discount' => $discount
        );
        echo json_encode(array('laptop' => $laptop));
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
