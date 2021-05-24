<?php
require_once('database.php');

//Inizio sessione 
session_start();
if(isset($_SESSION["username"]))
{
    // Vai alla home
    header("Location:login.php");
   
}
//verifica l'accesso
//per andare alla home
 
if(isset($_POST["name"]) && isset($_POST["surname"]) && isset($_POST["email"]) && isset($_POST["username"]) && isset($_POST["birthdate"]) && isset($_POST["password"]) && isset($_POST["confirmpassword"]))
{    
    // Connetti al database
    $conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
    $nome = mysqli_real_escape_string($conn, $_POST["name"]);
    $cognome = mysqli_real_escape_string($conn, $_POST["surname"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $pwd = $_POST["password"];
    $pwdhash=password_hash($pwd, PASSWORD_BCRYPT);
    $password=mysqli_real_escape_string($conn, $pwdhash);
    $birthdate = mysqli_real_escape_string($conn, $_POST["birthdate"]);
    
    $resq=mysqli_query($conn, "INSERT INTO USER VALUES(\"$username\",\"$password\",\"$nome\",\"$cognome\",\"$email\",\"$birthdate\")");
   if(!$resq){
       $error=true;
       mysqli_close($conn);
   } else{
    mysqli_close($conn);
        // Imposta la variabile di sessione
        $_SESSION["username"] = $_POST["username"];
        header("Location: home.php");
        exit;
   } 
    } 

?>

<html>
<head>
<link rel='stylesheet' href='signup.css'>
    <script src='signup.js' defer></script>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
</head>
<body>
<nav id='first'>
        <div id='logo'>
            <img src='img1.png'/>
        <h2>Ospedale Maggiore 
        di Modica</h2> 
    </div>
        
        <div id='links'>
        <a href='mhw3.html'>Home</a>
        
        <a href='login.php'>Accedi</a>
        
        </div>
        <div id="menu" class='showmenu'>
            <div></div>
            <div></div>
            <div></div>
          </div>
                </nav>
                <nav id='second'>
    
                    <a href='mhw3.html'>Home</a>
                    
                    <a href='login.php'>Accedi</a>
                    
            </nav>
            <header id='validation'>  <?php
        // Verifica la presenza di errori
        if(isset($error))
        {
            echo "<p class='errore'>";
            echo "Username già in uso";
            echo "</p>";
        }
    ?>
    </header>
            <main>
          
    <form autocomplete='off' name='signup' method='post'>
    <p>
            <label>Nome:  <input type='text' name='name' value='<?php if(isset($_POST["name"])){echo $_POST['name'];}else{echo"";}?>'></label>
        </p>
        <p>
            <label>Cognome: <input type='text' name='surname' value='<?php if(isset($_POST["surname"])){echo $_POST['surname'];}else{echo"";}?>'></label>
        </p>
        <p>
            <label>Data di nascita: <input id='date' type='date' name='birthdate'></label>
            <p id='date'></p>
        </p>
        <p>
            <label>E-mail: <input type='text' name='email' value='<?php if(isset($_POST["email"])){echo $_POST['email'];}else{echo"";}?>'></label>
            <p id='email'></p>
        </p>
        <p>
            <label>Username: <input type='text' name='username' value='<?php if(isset($_POST["username"])){echo $_POST['username'];}else{echo"";}?>'></label>
       <p id='user'></p>
        </p>
        <p>
            <label>Password: <input placeholder='Inserire almeno 8 caratteri' type='password' name='password' value='<?php if(isset($_POST["password"])){echo $_POST['password'];}else{echo"";}?>'></label>
            <p id='pass'></p>
        </p>
        <p>
            <label>Conferma password: <input type='password' name='confirmpassword'></label> 
        </p>
        <p>
            <label>&nbsp;<input type='submit' id="submit"></label>
        </p>
        <p>
            <label class='login'>Sei già registrato?<a href="login.php">Effettua il login</a></label>
        </p>
    </form>

</main>
</body>
</html>