<?php

include('db.php');
if(isset($_POST['cedula'])){
    $cedula = $_POST['cedula'];
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $carrera = $_POST['carrera'];

    $query = "INSERT INTO lista_estudiantes (numMatricula , cedula , nombres , apellidos , carrera) 
        values (null,'$cedula','$nombres','$apellidos','$carrera')";
    
    $result = mysqli_query($connectionDb,$query);

    if(!$result){
        die('Error , estudiante no listado'.mysqli_error($connectionDb));  
    }else {
        echo 'datos insertados';
    }

}
?>