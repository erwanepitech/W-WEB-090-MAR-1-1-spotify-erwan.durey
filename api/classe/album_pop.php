<?php
require_once("album.php");
$album = new Album();
$data = $album->get_album();
echo json_encode($data);