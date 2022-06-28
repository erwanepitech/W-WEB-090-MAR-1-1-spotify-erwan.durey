<?php
require_once('connect.php');

class Album extends connect{

    private $search;

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

    public function setId ($id) {
        $this->id = $id;
    }

    public function getId () {
        return $this->id;
    }

    public function search_album () {
        $sql1 = "SELECT genres.name AS 'genre_name', albums.name AS 'album_name', albums.id AS 'id_album'
        FROM albums
        LEFT JOIN genres_albums
            ON albums.id = genres_albums.album_id
        LEFT JOIN genres
            ON genres_albums.genre_id = genres.id
            WHERE albums.name LIKE :search
            AND genres.name = :genre
        LIMIT 10;";
    
        $bV = $this->connection->prepare($sql1);
        $bV->bindValue('search', $this->search."%", PDO::PARAM_STR);
        $bV->bindValue('genre', $this->genre, PDO::PARAM_STR);
        $bV->execute();
        $res = $bV->fetchAll(PDO::FETCH_ASSOC);
    
        foreach ($res as $row) {
            $data[] = array(
                "name" =>   $row["album_name"],
                "genre" =>   $row["genre_name"],
                "id" => $row["id_album"]
            );
        }
        if (count($res) > 0) {
            return $data;
        } else {
            $data = ["msg" => "no album found"];
            return $data;
        }
    }

    public function get_album_content(){
        try{
            $request = "SELECT albums.name AS 'album_name', `albums`.`id` AS 'album_id', albums.description AS 'album_desc', albums.cover_small, albums.cover, CAST(FROM_UNIXTIME(albums.release_date) as date) AS 'release_date', albums.popularity AS 'album_pop', COUNT(tracks.id) AS 'nb_tracks'
            FROM albums
            INNER JOIN tracks
                ON albums.id = tracks.album_id
            WHERE albums.id = :id";
            $bV = $this->connection->prepare($request);
            $bV->bindValue(':id', $this->id, PDO::PARAM_INT);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = $res;
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }

    public function get_album(){
        try{
            $request = "SELECT albums.name AS 'album_name', `albums`.`id` AS 'album_id', albums.cover_small, CAST(FROM_UNIXTIME(albums.release_date) as date) AS 'release_date', albums.popularity AS 'album_pop'
            FROM albums
            INNER JOIN artists
                ON albums.artist_id = artists.id
            INNER JOIN tracks
                ON albums.id = tracks.album_id
            GROUP BY albums.id
            ORDER BY albums.popularity DESC
            LIMIT 20;";
            $bV = $this->connection->prepare($request);
            $bV->bindValue(':id', $this->id, PDO::PARAM_INT);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = $res;
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }

    public function tracks_list () {
        try{
            $request = "SELECT tracks.name AS 'tracks_list'
            FROM albums
            INNER JOIN artists
                ON albums.artist_id = artists.id
            INNER JOIN tracks
                ON albums.id = tracks.album_id
            WHERE albums.id = :id";
            $bV = $this->connection->prepare($request);
            $bV->bindValue(':id', $this->id, PDO::PARAM_INT);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = $res;
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }


}