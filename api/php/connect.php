<?php

$servername = "172.19.0.3";
$database = "db";
$username = "root";
$password = "root";

// Kapcsolódás
$conn = mysqli_connect($servername, $username, $password, $database);
if (!$conn) {
    exit('Connection failed: '.mysqli_connect_error().PHP_EOL);
}

// Speciális karakterek beállítása
mysqli_set_charset($conn, 'utf-8');
?>