<?php
session_start();
require_once('database.php');
$conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
$dati=array();
   
  
$res=mysqli_query($conn,"SELECT orario, data from ticket");

while($row =mysqli_fetch_assoc($res)){
    $dati[]=$row; 
}
mysqli_free_result($res);
mysqli_close($conn);

echo json_encode($dati);

?>