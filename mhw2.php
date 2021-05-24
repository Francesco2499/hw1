
<?php
session_start(); 
require_once('database.php');
if(!isset($_SESSION["username"]))
{
    // Vai alla home
    header("Location: login.php");
}
if(isset($_GET['add'])){
$add=$_GET['add'];

if($add==='1'){
 if(isset($_GET["titolo"]) && isset($_GET["imm"]) && isset($_GET["id"])){
   
    $conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
$username=mysqli_real_escape_string($conn, $_SESSION["username"]);
$titolo=mysqli_real_escape_string($conn,$_GET['titolo']);
 $imm=mysqli_real_escape_string($conn,$_GET['imm']);
 $id=mysqli_real_escape_string($conn,$_GET['id']);
 $x = mysqli_query($conn, "INSERT INTO evidenza VALUES(\"$id\",\"$username\",\"$titolo\",\"$imm\")");
mysqli_close($conn);
 }
}else if($add==='0'){
    if(isset($_GET["titolo"])){
$conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
$username=mysqli_real_escape_string($conn, $_SESSION["username"]);
$titolo=mysqli_real_escape_string($conn,$_GET['titolo']);
$x = mysqli_query($conn, "DELETE FROM evidenza where username ='".$username."' and servizio = '".$titolo."'");
mysqli_close($conn);
    }
}
}
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">   
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel='stylesheet' href='mhw2.css'/>
    <script src='scriptPag2.js' defer></script>
    <script src='contentPag2.js'></script>
    <title>Ospedale Maggiore: Servizi</title>
</head>
<body>
    <nav id='first'>
        <div id='logo'>
            <img src='img1.png'/>
        <h2>Ospedale Maggiore 
        di Modica</h2> 
    </div>
        
        <div id='links'>
            <a href='home.php'>Portale Prenotazioni</a>
            <a href='mhw2.php'>Servizi </a>
            <a href='logout.php'>Esci</a>
        
        </div>
        <div id="menu" class='showmenu'>
            <div></div>
            <div></div>
            <div></div>
          </div>
                </nav>
                <nav id='second'>
    
                    <a href='home.php'>Portale Prenotazioni</a>
                    <a href='mhw2.php'>Servizi </a>
                    <a href='logout.php'>Esci</a>
                    
            </nav>
    <header> 
        <div id='overlay'>       
        <h1>La sanità  al tuo servizio </h1>   
</div>
   </header>
   <section id='intro'>
   
       <h1>I nostri servizi</h1>
       <div id='cont'>
           <span>Cerca:</span>
        <input type='text'/>   
       </div>
       <article class='ricerca hidden'> 
           
      
    </article>
      
        <div class='hidden'>
            <h3>In evidenza:</h3> 
            <div class='evidenza'></div>
</div>
           
       
   </section>
   
   <section class='box-grid'>
       </section>
       
   <footer>
    <h2>Via Resistenza Partigiana, 97015 Modica RG</h2>
    <p>O46001642</p>
<p>Edited by Francesco Denaro </p>
</footer>
</body>
</html>