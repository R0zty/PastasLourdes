<?php
$to = "info@hotmail.com";
$subject = "Mail desde el formulario";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . 
"\r\n";
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$comentarios = $_POST['comentarios'];
$contraseña = $_POST['contraseña']
$apellido = $_POST['apellido']
$telefono = $POST['telefono']
$localidad = $POST['Localidad']
$pais = $POST['Pais']


$message = "
<html>
<head>
<title>HTML</title>
</head>
<body>
<h1>Información del formulario</h1>
<p>Nombre: $nombre </p> 
<p>Email: $email </p> 
<p>Comentarios: $comentarios </p> 
<p>Contraseña: $contraseña </p>
<p>Apellido: $apellido </p>
<p>Telefono: $telefono </p>
<p>Localidad: $Localidad </p>
<p>Pais: $Pais </p>

</body>
</html>";
 echo 'Gracias por comunicarse con nosotros';
mail($to, $subject, $message, $headers);
?>
¡Sigamos!