let valueSearch;
let form;
xhr = new XMLHttpRequest();

valueSearch = document.getElementById('search');
form = document.getElementById('formSearch');
let resultSearch = document.getElementById('resultSearch');

/*
window.addEventListener('DOMContentLoaded',loadList);

function loadList(event){

    xhr.open('GET','list.php',true);
    xhr.onload = function(){
        if(xhr.status == 200){
            console.log(JSON.parse(xhr.responseText));
        }else{
            console.log('error');
        }
    }
    xhr.send();

    
}*/

valueSearch.addEventListener('keyup', getValue);

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
                    <div class="col s12">
                        <div class="card horizontal">
                            <div class="card-stacked">
                                <div class="card-content">
                                <p>${estudiante.nombres}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                }
            } else {
                console.log('Error')
            }
            resultSearch.innerHTML = resultados;
        }
        xhr.send(valueInputSearch);
    }else {
        resultSearch.innerHTML = ``;
    }

    event.preventDefault();
}