let valueSearch;
let form;

valueSearch = document.getElementById('search');
form = document.getElementById('formSearch');

valueSearch.addEventListener('keyup',getValue);


function getValue(event){
    
    xhr = new XMLHttpRequest();
    xhr.open('POST','search.php','true');
    //Para enviar los datos a search.php
    let valueInputSearch = new FormData(form);
    xhr.onload = function(){
        if(xhr.status == 200){
            console.log(JSON.parse(xhr.responseText));

        }else{
            console.log('Error')
        }
    }

    xhr.send(valueInputSearch);
    event.preventDefault();



}