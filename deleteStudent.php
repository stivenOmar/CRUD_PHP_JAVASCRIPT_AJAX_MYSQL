<?php

include('db.php');

if(isset($_POST['idMat'])){
    $idMat = $_POST['idMat'];
    
    $query = "DELETE FROM lista_estudiantes WHERE numMatricula = $idMat";

    $result = mysqli_query($connectionDb,$query);

    if(!$result){
        die("Error al eliminar".mysqli_error($connectionDb));
    }else{
        echo "ELiminado con exito";
    }
}
?>