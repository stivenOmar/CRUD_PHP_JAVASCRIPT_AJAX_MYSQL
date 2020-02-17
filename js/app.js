
let xhr = new XMLHttpRequest();


//CARGAR LISTADO AL ABRIR LA PAGINA
window.addEventListener('DOMContentLoaded',loadList);
let tareas = document.getElementById('tareas');
function loadList(event){
    let row  =``;
    xhr.open('GET','list.php',true);
    xhr.onload = function(){
        if(xhr.status == 200){
            let listado = JSON.parse(xhr.responseText);
            for (const estudiante of listado) {
                row +=`
                    <tr idMat="${estudiante.numMatricula}">
                        <td>${estudiante.numMatricula}</td>
                        <td>${estudiante.cedula}</td>
                        <td>${estudiante.nombres}</td>
                        <td>${estudiante.apellidos}</td>
                        <td>${estudiante.carrera}</td>
                        <td  style="cursor:pointer;">
                        <i class="material-icons red-text delete">delete_forever</i>
                        <i class="material-icons edit">edit</i>
                        </td>
                        
                    </tr>
                `
            }
            tareas.innerHTML = row;
        }else{
            console.log('error');
        }
    }
    xhr.send();
}


//PROCESO DE BUSQUEDA EN LA BARRA DE NAVEGACION

let valueSearch;
let form;
let resultSearch = document.getElementById('resultSearch');
valueSearch = document.getElementById('search');
form = document.getElementById('formSearch');
valueSearch.addEventListener('keyup', getValue);
let list;
list = document.createElement('ul');
list.classList.add('collection');

function getValue(event) {

    if (event.target.value) {
        xhr.open('POST', 'search.php', true);
        //Para enviar los datos a search.php
        let valueInputSearch = new FormData(form);
        let resultados = ``;
        xhr.onload = function () {
            if (xhr.status == 200) {
                let resultSearch = JSON.parse(xhr.responseText);

                for (const estudiante of resultSearch) {
                    resultados += `
                        <li class="collection-item">${estudiante.nombres}</li>
                    `
                }

                loadList();
                list.innerHTML = resultados;
            } else {
                console.log('Error')
            }
            resultSearch.appendChild(list);

        }
        xhr.send(valueInputSearch);
    } else {
        resultSearch.innerHTML = ``;
    }

    event.preventDefault();
}

//PROCESO DE GUARDADO DE DATOS 

let studentsForm;

//datos para accion editar
let accion = "guardar";
studentsForm = document.getElementById('studentsForm');

studentsForm.addEventListener('submit',addStudent);

function addStudent(event){
    event.preventDefault();
    let data = new FormData(studentsForm);
    if(accion=="guardar"){
        xhr.open('POST','addStudent.php',true);
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log(xhr.responseText)
                loadList();
            }else {
                console.log('desconexion exitosa :v')
            }
        }

        xhr.send(data);
        studentsForm.reset();
    }else {
        xhr.open('POST','editStudent.php',true);
        xhr.onload = function(){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                loadList();
            }else {
                console.log('edit desexitoso');
            }
        }

        xhr.send(data);
        studentsForm.reset();
    }
    

}

//PROCESOS DE ELIMINACION Y EDICION DE ESTUDIANTE
tareas.addEventListener('click',deleteStudent);

function deleteStudent(event){
    //PROCESO DE ELIMINACION
    if(event.target.classList.contains('delete')){
        let idMat = parseInt(event.target.parentElement.parentElement.getAttribute('idMat'));
        xhr.open('POST','deleteStudent.php', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function (){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                loadList();
            }else {
                console.log('conexion incorrecta');
            }
        }

        xhr.send("idMat="+ idMat);

        
    }

    //PROCESO DE EDICION
    if(event.target.classList.contains('edit')){
        let idMat = parseInt(event.target.parentElement.parentElement.getAttribute('idMat'));
        
        xhr.open('POST','editStudent.php', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function (){
            if(xhr.status == 200){
                let studentToEdit = JSON.parse(xhr.responseText);
                document.getElementById('editIdMat').value = studentToEdit[0].idMat;
                document.getElementById('cedula').value = studentToEdit[0].cedula;
                document.getElementById('names').value = studentToEdit[0].nombres;
                document.getElementById('apellidos').value = studentToEdit[0].apellidos;
                document.getElementById('carrera').value = studentToEdit[0].carrera;
                accion = 'editar';
            }else {
                console.log('conexion incorrecta');
            }
        }
        cedula
        xhr.send("idMat="+ idMat);
    }
}


