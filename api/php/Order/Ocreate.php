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
    if (!isset($data->name) || !isset($data->address) || !isset($data->date) || !isset($data->email) || !isset($data->phone) || !isset($data->type) || !isset($data->product)){
        http_response_code(400);
        echo json_encode($data);
        echo json_encode(array('error' => 'Hiányzó adat(ok).'));
        exit;
    }

    // Adatok kinyerése a JSON objektumból 
    $name = $data->name;
    $address = $data->address;
    $date = date('Y-m-d H:i:s', strtotime($data->date));
    $email = $data->email;
    $phone = $data->phone;
    $type = $data->type;
    $product_id = $data->product;





    // SQL lekérdezés előkészítése az adatok beszúrására
    $sql = "INSERT INTO `order` (type, email, name, address, phone, date, product_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(array('error' => 'Hiba a SQL lekérdezés előkészítése közben: ' . $conn->error));
        exit;
    }

    // Adatok paraméterezése a lekérdezésben
    $stmt->bind_param('ssssssi', $type, $email, $name, $address, $phone, $date, $product_id); // 'sssiis', hogy a paramok milyen típusúak lesznek string, string, string, integer, 
    $result = $stmt->execute();

    // Ellenőrizzük, hogy sikeres volt-e a beszúrás
    if ($result) {
        // Sikeres beszúrás esetén visszaküldjük az újonnan létrehozott felhasználó adatait
        $order = array(
            'tpye' => $type,
            'email' => $email,
            'name' => $name,
            'address' => $address,
            'phone' => $phone,
            'date' => $date,
            'product' => $product_id,


        );
        echo json_encode(array('order' => $order));
    } else {

        // Ha hiba történt a beszúrás során, beállítjuk a megfelelő hibakódot
        http_response_code(500);
        echo json_encode(array(
            'error' => 'Hiba történt a megrendelés beszúrása közben.',
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
