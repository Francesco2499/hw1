<?php
require_once('database.php');

//Inizio sessione 
session_start();
//verifica l'accesso

    // Connetti al database
    $conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
    $username = mysqli_real_escape_string($conn, $_SESSION["username"]);    
    $resq=mysqli_query($conn, "DELETE FROM ticket where username = '".$username."'");
    
    mysqli_close($conn);
?>