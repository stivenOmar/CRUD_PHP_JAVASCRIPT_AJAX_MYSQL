
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
                        <td class="red-text" style="cursor:pointer;"><i class="material-icons delete">delete_forever</i></td>
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

studentsForm = document.getElementById('studentsForm');

studentsForm.addEventListener('submit',addStudent);

function addStudent(event){
    event.preventDefault();

    xhr.open('POST','addStudent.php',true);
    let data = new FormData(studentsForm);

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

}


//PROCESO DE ELIMINACION
tareas.addEventListener('click',deleteStudent);

function deleteStudent(event){
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
}
