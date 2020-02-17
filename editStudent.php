<?php

include('db.php');

if(isset($_POST['idMat'])){

    $idMat = $_POST['idMat'];
    $query = "SELECT * from lista_estudiantes where numMatricula = $idMat";

    $result = mysqli_query($connectionDb,  $query);

    if(!$result){
        die("No se pudo consultar el estudiante".mysqli_error($connectionDb));
    }

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $json [] = array(
            "idMat"=>$row['numMatricula'],
            "cedula"=>$row['cedula'],
            "nombres"=>$row['nombres'],
            "apellidos"=>$row['apellidos'],
            "carrera"=>$row['carrera']
        );
    }

    echo json_encode($json);

}

if(isset($_POST['editIdMat'])){
    $numMatricula = $_POST['editIdMat'];
    $cedula = $_POST['cedula'];
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $carrera = $_POST['carrera'];

    $query = "UPDATE lista_estudiantes SET cedula = '$cedula' , nombres = '$nombres' , 
        apellidos = '$apellidos' , carrera = '$carrera' WHERE numMatricula = $numMatricula";

    $result = mysqli_query($connectionDb,$query);

    if(!$result){
        die("Error al editar".mysqli_error($connectionDb));
    }else {
        echo "Editado con exito";
    }

}
?>