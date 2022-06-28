<?php
require_once("artistes.php");

if (isset($_GET["artistes"]) ) {
    $art = new Artists();
    $search = $_GET["artistes"];
    $art->set_artist_id($search);
    $data = [
        "info" => $art->get_artists_info(),
        "album" => $art->get_artists_album(),
        "album_genre" => $art->get_album_genre()
    ];
    echo json_encode($data);
}
