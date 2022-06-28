<?php
header('Access-Control-Allow-Origin : *');
require_once('connect.php');

class RandomAlbum extends connect{

    public function __construct(){
        parent::__construct();
    }
    

    public function random_album () {

        $sql1 = "SELECT albums.name AS 'album_name', `albums`.`id` AS 'album_id', albums.cover_small, COUNT(tracks.id) AS 'nb_tracks', CAST(FROM_UNIXTIME(albums.release_date) as date) AS 'release_date'
        FROM albums
        INNER JOIN tracks
                ON albums.id = tracks.album_id
        WHERE description != '' 
        GROUP BY albums.id
        ORDER BY RAND()  
        LIMIT 20;";
        $bV = $this->connection->prepare($sql1);
        $bV->execute();
        $res = $bV->fetchAll(PDO::FETCH_ASSOC);

        foreach ($res as $row) {
            $data[] = array(
                "album_name" =>   $row["album_name"],
                "album_id" =>   $row["album_id"],
                "cover_small" =>   $row["cover_small"],
                "cover_small" =>   $row["cover_small"],
                "nb_tracks" =>   $row["nb_tracks"],
                "release_date" =>   $row["release_date"]
            );
        }
        return $data;
    }

}

$album = new RandomAlbum();
$data = $album->random_album();
echo json_encode($data);
