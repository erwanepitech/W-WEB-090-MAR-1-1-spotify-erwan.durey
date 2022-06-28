<?php
require_once('genres.php');
if (isset($_GET["genre"]) && $_GET["genre"]) {
    $search = new Genreslist();
    $genre = $_GET["genre"];
    $search->setGenre($genre);
    $data = $search->search_genre();
    echo json_encode($data);
}