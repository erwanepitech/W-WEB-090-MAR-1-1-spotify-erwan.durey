<?php
require_once("search.php");

$tracks = new Search();
if (isset($_GET["search"]) && strlen($_GET["search"]) != 0) {
    $search = $_GET["search"];
    $genre = $_GET["genre"];
    $tracks->setSearch($search);
    $tracks->setGenre($genre);
    $data = $tracks->search();
}
echo json_encode($data);