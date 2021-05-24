<?php
require_once('database.php');
session_start();
if(!isset($_SESSION["username"]))
{
    // Vai alla home
    header("Location: login.php");
}
function generateRandomString($length = 8) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

if(isset($_POST["CF"]) && isset($_POST["vaccino"])){
    $conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
    $username=mysqli_real_escape_string($conn, $_SESSION["username"]);
    $query = "SELECT * from VACCINAZIONI where username ='".$username."'";
    $res =  mysqli_query($conn, $query);
    if(mysqli_num_rows($res) === 0){
    /*$cod = generateRandomString();
    $codprenotazione = mysqli_real_escape_string($conn, $cod);
    $query = "SELECT * from VACCINAZIONI where codprenotazione ='".$codprenotazione."'";
    $res =  mysqli_query($conn, $query);

    if(mysqli_num_rows($res) !== 0){      
         $cod = generateRandomString();
        }*/
        do{
            $cod = generateRandomString();
            $codprenotazione = mysqli_real_escape_string($conn, $cod);
            $query = "SELECT * from VACCINAZIONI where codprenotazione ='".$codprenotazione."'";
            $res =  mysqli_query($conn, $query);
        
               
                
                } while(mysqli_num_rows($res) !== 0);
        $codice = mysqli_real_escape_string($conn, $cod);
        $username = mysqli_real_escape_string($conn, $_SESSION["username"]);
        $CF =  mysqli_real_escape_string($conn, $_POST["CF"]);
        $vaccino =  mysqli_real_escape_string($conn, $_POST["vaccino"]);
        $x = mysqli_query($conn, "INSERT INTO VACCINAZIONI VALUES(\"$codice\",\"$username\",\"$CF\",\"$vaccino\")");
        if($x){
        mysqli_close($conn);
        $success=true;
 }
        else{
            $errore=true;
            mysqli_close($conn);
        }
    } else {
    $errore_cred=true;
}
} 
?>


<html>
<head>
    <link rel='stylesheet' href='Prenotazione.css'>
    <script src='signin.js' defer></script>
    <script src='Prenotazione.js' defer></script>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prenotazione Vaccino</title>
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
        
</div>
   </header>
   <div id='main'>
       <h1>Facciamo squadra per la nostra salute</h1>
</div>
<article>
<h1>vaccinazioni anti covid-19</h1> 
<?php  if(isset($success)){
    echo "<h2 id='prenotazione'>";
    echo "Prenotazione effettuata con successo!";
    echo "</h2>";
}
?>

</article>
<section>
<div id=mainprenotazione>

   <main>
    <h2>Inserisci i dati per la prenotazione</h2>
    <p id='compila'></p>
    <form autocomplete='off' name='prenota' method='post'>
        <p>
            <label>Codice Fiscale <input type='text' name='CF' value='<?php if(isset($_POST["CF"])){echo $_POST['CF'];}else{echo"";}?>'></label>
            <p id='CF'></p>
        </p>
       <p>
           <input type='radio' name='vaccino' value='AstraZeneca'> AstraZeneca
</p>
<p>
           <input type='radio' name='vaccino' value='Moderna'> Moderna
</p>
<p>
           <input type='radio' name='vaccino' value='Pfizer'> Pfizer
</p>
        <p>
            <label>&nbsp;<input type='submit' id="submit"></label>
        </p>
       
    </form>
    
</main>
<img src='vaccini.png'>
</div>
</section>
<div id='riepilogo'>
<?php
if(isset($errore)) {
    echo "<p class='msg'>";
    echo "Non ci sono dosi disponibili al momento per il vaccino ".$_POST["vaccino"].". Scegli un altro vaccino o attendi fino a quando il vaccino non sarà disponibile.";
    echo "</p>";
}
?>
</div>


          <footer>
        <h2>Via Resistenza Partigiana, 97015 Modica RG</h2>
        <p>O46001642</p>
<p>Edited by Francesco Denaro </p>
    </footer>
</body>
</html>
