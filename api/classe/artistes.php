<?php
require_once('connect.php');

class Artists extends connect{

    private $artist_id;
    private $album_id;

    public function __construct(){
        parent::__construct();
    }

    public function set_artist_id ($id) {
        $this->artist_id = $id;
    }

    public function get_artist_id () {
        return $this->artist_id;
    }

    public function set_album_id ($id) {
        $this->album_id = $id;
    }

    public function get_album_id () {
        return $this->album_id;
    }

    public function get_artists_info(){
        try{
            $request = "SELECT `name`, `description`, `bio`, `photo`
            FROM `artists`
            WHERE `id` = :id";
            $bV = $this->connection->prepare($request);
            $bV->bindValue(':id', $this->artist_id, PDO::PARAM_INT);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = $res;
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }

    public function get_artists_name(){
        try{
            $request = "SELECT `artists`.`name`, `artists`.`id`, `albums`.`popularity`, `photo`
            FROM `artists`
            INNER JOIN `albums`
                ON albums.artist_id = artists.id
            ORDER BY albums.popularity DESC
            LIMIT 20";
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

    public function get_artists_album(){
        try{
            $request = "SELECT `artists`.`name` AS 'artist_name', `albums`.`name` AS 'album_name', `albums`.`id` AS 'album_id'
            FROM `artists`
            INNER JOIN `albums`
                ON `artists`.`id` = `albums`.`artist_id`
            WHERE `artists`.`id` = :id";
            $bV = $this->connection->prepare($request);
            $bV->bindValue(':id', $this->artist_id, PDO::PARAM_INT);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = ['data'=> $res];
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }

    public function get_album_genre () {
        try{
            $request = "SELECT genres.name
            FROM albums
            LEFT JOIN genres_albums
                ON albums.id = genres_albums.album_id
            LEFT JOIN genres
                ON genres_albums.genre_id = genres.id
            LEFT JOIN artists
                ON artists.id = albums.artist_id
            WHERE artist_id.id = :id";
            $bV = $this->connection->prepare($request);
            $bV->bindValue(':id', $this->artist_id, PDO::PARAM_INT);
            $bV->execute();
            $res = $bV->fetchAll(PDO::FETCH_ASSOC);
            $result = ['data'=> $res];
        }catch(Exception $e){
            $msg = $e->getMessage();
            $result = ['success'=>0, 'msg'=>$msg];
        }
        return $result;
    }

    public function get_track_nb () {
        try{
            $request = "SELECT COUNT(tracks.id) AS 'nb_tracks'
            FROM albums
            LEFT JOIN genres_albums
                ON albums.id = genres_albums.album_id
            LEFT JOIN genres
                ON genres_albums.genre_id = genres.id
            LEFT JOIN artists
                ON artists.id = albums.artist_id
            LEFT JOIN tracks
                ON tracks.album_id = albums.id
            WHERE albums.id = :id";
            $bV = $this->connection->prepare($request);
            $bV->bindValue(':id', $this->album_id, PDO::PARAM_INT);
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