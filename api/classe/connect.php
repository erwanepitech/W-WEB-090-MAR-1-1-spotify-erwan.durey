<?php
header('Access-Control-Allow-Origin : *');
class connect{

    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $db = "database_music";
 
    protected $connection;

    public function __construct(){
        try{
            $this->connection = new PDO("mysql:host=". $this->host .
            ";dbname=" . $this->db . "", "'$this->username'", "$this->password");
            $this->connection->exec('SET NAMES "UTF8"');
        } catch (PDOException $e){
            echo 'Erreur : '. $e->getMessage();
            die();
        }
        return $this->connection;
    }
}