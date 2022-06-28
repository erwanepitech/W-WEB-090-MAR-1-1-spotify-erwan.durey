<?php
require_once('connect.php');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
class Search extends connect{

    private $search;
    private $genre;

    public function __construct(){
        parent::__construct();
    }

    public function setSearch ($search) {
        $this->search = htmlspecialchars(strip_tags(ucfirst(strtolower($search))));
    }

    public function getSearch () {
        return $this->search;
    }

    public function setGenre ($genre) {
        $this->genre = htmlspecialchars(strip_tags(ucfirst(strtolower($genre))));
    }

    public function getGenre () {
        return $this->genre;
    }

    public function search () {
        $sql1 = "SELECT artists.name AS 'name_artist', albums.name AS 'name_album' , tracks.name AS 'track_name' FROM artists, genres.name AS 'genre_name'
        INNER JOIN albums 
            ON artists.id = albums.artist_id
        INNER JOIN tracks
            ON tracks.album_id = albums.id
        WHERE artists.name LIKE :search AND  albums.name LIKE :search AND tracks.name LIKE :search
        AND genres.name = :genre
        LIMIT 20;";
    
        $bV = $this->connection->prepare($sql1);
        $bV->bindValue('search', "%".$this->search."%", PDO::PARAM_STR);
        $bV->bindValue('genre', $this->genre, PDO::PARAM_STR);
        $bV->execute();
        $res = $bV->fetchAll(PDO::FETCH_ASSOC);
    
        foreach ($res as $row) {
            $data[] = array(
                "name" =>   $row["name"]
            );
        }
        if (count($res) > 0) {
            return $data;
        } else {
            $data = ["msg" => "no tracks found"];
            return $data;
        }
    }
}

