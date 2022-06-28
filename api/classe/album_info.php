<?php
require_once("album.php");

if (isset($_GET["album"]) && strlen($_GET["album"]) != 0) {
    $album = new Album();
    $search = $_GET["album"];
    $album->setId($search);
    $data = [
        "info" => $album->get_album_content(),
        "album" => $album->get_album(),
        "tracks_list" => $album->tracks_list()
    ];
}
echo json_encode($data);