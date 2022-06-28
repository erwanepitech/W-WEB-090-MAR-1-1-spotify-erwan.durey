<?php

require_once("album.php");
if (isset($_GET["search"]) && strlen($_GET["search"]) != 0 && isset($_GET["genre"]) && $_GET["genre"] != "undefined" && $_GET["genre"] != "selecte a genre") {
    $album = new Album();
    $search = $_GET["search"];
    $genre = $_GET["genre"];
    $album->setSearch($search);
    $album->setGenre($genre);
    $data = $album->search_album();
}
echo json_encode($data);