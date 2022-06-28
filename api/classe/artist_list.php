<?php
require_once("artistes.php");
$search = new Artists();
echo json_encode($search->get_artists_name());