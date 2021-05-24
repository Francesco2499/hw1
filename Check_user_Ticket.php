
<?php
session_start();
require_once('database.php');
$conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
$username=mysqli_real_escape_string($conn, $_SESSION["username"]);
    
$res=mysqli_query($conn,"SELECT * from ticket  where username ='".$username."'");

if(mysqli_num_rows($res) === 0)
$error=true;
else{
    $error=false;
}
mysqli_free_result($res);
mysqli_close($conn);
echo json_encode($error);
?>