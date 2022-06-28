<?php
require_once('genres.php');
$search = new Genreslist();
echo json_encode($search->get_genre());
