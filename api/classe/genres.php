<?php
require_once('connect.php');
class Genreslist extends connect{

    public function __construct(){
        parent::__construct();
    }

    public function setGenre ($genre) {
        $this->genre = htmlspecialchars(strip_tags(ucfirst(strtolower($genre))));
    }

    public function getGenre () {
        return $this->genre;
    }

    public function get_genre () {
        try{
            $request = "SELECT name AS 'genre_name'
            FROM `genres`";
            $bV = $this->connection->prepare($request);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = ['data'=> $res];
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }

    public function search_genre () {
        try{
            $request = "SELECT albums.name AS 'album_name', albums.id AS 'id_album'
            FROM albums
            LEFT JOIN genres_albums
                ON albums.id = genres_albums.album_id
            LEFT JOIN genres
                ON genres_albums.genre_id = genres.id
                WHERE genres.name = :genre
            LIMIT 20";
            $bV = $this->connection->prepare($request);
            $bV->bindValue('genre', $this->genre, PDO::PARAM_STR);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = ['data'=> $res];
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }

}