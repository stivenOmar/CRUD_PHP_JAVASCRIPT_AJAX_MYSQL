<?php 

include('db.php');

$query = "SELECT * FROM lista_estudiantes";

$result = mysqli_connect($connectionDb , $query);

if(!result){
    die('No se encontraron resultados'.mysqli_error($connectionDb));
}

$json = array();

while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'cedula'=>$row['cedula'],
        'nombres'=>$row['nombres'],
        'apellidos'=>$row['apellidos'],
        'carrera'=>$row['carrera']
    );
}

echo json_encode($json);


?>