
<?php 

    include('db.php');

    $valueSearch = $_POST['nombres'];

    if($valueSearch != ''){
        $query = "SELECT * FROM lista_estudiantes WHERE nombres like '$valueSearch%'";
        $result = mysqli_query($connectionDb,$query);
        if(!$result){
            die('No se encontraron resultados'.mysqli_error($connectionDb));
        }
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "cedula" =>$row['cedula'],
                "nombres" =>$row['nombres'],
                "apellidos"=>$row['apellidos'],
                "carrera"=>$row['carrera']
            );
        }
        echo json_encode($json);

    }

?>