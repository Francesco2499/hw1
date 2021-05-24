<?php
require_once('database.php');
// Avvia la sessione
session_start();
// Verifica l'accesso
if(isset($_SESSION["username"])){
    //Vai alla home
    header("Location: home.php");
    exit;
}
if(isset($_POST["username"]) && isset($_POST["password"])){
    $conn = mysqli_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);
    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $password = $_POST["password"];

    $query = "SELECT password from USER where username ='".$username."'";
    $res = mysqli_query($conn, $query);
  
    // Verifica la correttezza delle credenziali
    if(mysqli_num_rows($res) > 0){ 
         $row =mysqli_fetch_assoc($res);  
        //$pass='"'.$row['password'].'"';
       if(password_verify($password, $row['password'])){
        mysqli_free_result($res);
        mysqli_close($conn);
        $_SESSION["username"] = $_POST["username"];
        header("Location: home.php");
        exit;
       }  else {
        $errore = true;
    }  
    } else if(empty($username) || empty($password)){
        $errore_cred=true;
    }else {
        $errore = true;
    }
}

?>
<html>
<head>
    <link rel='stylesheet' href='signin.css'>
    <script src='signin.js' defer></script>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
            <header>
    <?php
        // Verifica la presenza di errori
        if(isset($errore))
        {
            echo "<p class='errore'>";
            echo "Username e/o password errate!";
            echo "</p>";
        }
    ?>
    <?php
        // Verifica la presenza di errori
        if(isset($errore_cred))
        {
            echo "<p class='errore'>";
            echo "Inserire le credenziali!";
            echo "</p>";
        }
    ?>
    </header>
            <main>
    
    <form autocomplete='off' name='signin' method='post'>
        <p>
            <label>Username: <input type='text' name='username' value='<?php if(isset($_POST["username"])){echo $_POST['username'];}else{echo"";}?>'></label>
        </p>
        <p>
            <label>Password: <input type='password' name='password' value='<?php if(isset($_POST["password"])){echo $_POST['password'];}else{echo"";}?>'></label>
        </p>
        <p>
            <label>&nbsp;<input type='submit' id="submit"></label>
        </p>
        <p>
            <label id='registrazione'>Non sei registrato?<a href="Registrazione.php">Registrati</a></label>
        </p>
    </form>
    
</main>
</body>
</html>