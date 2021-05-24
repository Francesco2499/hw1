<?php
session_start();
if(!isset($_SESSION["username"]))
{
    // Vai alla home
    header("Location: login.php");
}
?>

<html>
<head>
    <link rel='stylesheet' href='home.css'>
    <script src='signin.js' defer></script>
    <script src='home.js' defer></script>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portale Prenotazioni</title>
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

<section>
<h1>
    Portale Prenotazioni
</h1>
<article>
 
</article>

          </section>
          <footer>
        <h2>Via Resistenza Partigiana, 97015 Modica RG</h2>
        <p>O46001642</p>
<p>Edited by Francesco Denaro </p>
    </footer>
</body>
</html>