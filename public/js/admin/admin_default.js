$(document).ready(function(){

    getUsersData();
});

function getUsersData(){
    fetch("/usuarios", {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        $(".usersData").empty();
        response.data.forEach(function(e,i){
            fetch("/school/"+e.document,{
                method:"GET",
                headers:{
                    "Content-Type":"applicaiont/json"
                }
            })
            .then(function(res){
                return res.json();
            })
            .then(function(response){
                if(response.ok){
                    $(".usersData").append(`
                    <tr onclick="getUserInfo('${e._id}','${e.name}','${e.email}','${e.parentName}','${e.number}','${e.document}','${response.name}');" data-toggle="modal" data-target="#userInfoModal">
                        <td>${e.typeDoc.toUpperCase()}</td>
                        <td>${e.document}</td>
                        <td>${response.name}</td>
                        <td>${e.email}</td>
                        <td>${response.school}</td>
                    </tr>
                `);
                }
            })
            .catch(function(err){
                return err;
            });
           
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('identity');

    window.location="/";
}

function getSchool(doc){
    var school='';
    fetch("/school/"+doc,{
        method:"GET",
        headers:{
            "Content-Type":"applicaiont/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){

        }
    })
    .catch(function(err){
        return err;
    });

   
}

function getUserInfo(id, user, email, parent, number, doc, name){
    $(".basic-info").empty();
    $("#userAnswer").empty();
    $(".basic-info").append(`
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre del estudiante</th>
                    <th>Correo</th>
                    <th>Número</th>
                    <th>Acudiente</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${user}</td>
                    <td>${email}</td>
                    <td>${number}</td>
                    <td>${parent}</td>
                </tr>
            </tbody>
        </table>
    `);
    $("#userAnswer").append(`
        <tr>
            <td style="">${doc}</td>
            <td style="">${name}</td>
        </tr>
    `);
    fetch("/usuario/"+id,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        console.log(response);
        if(response.data.length>0){
            var respuestas=[];
            var data=response.data;
            // extraccion de datos: preguntas y respuestas
            data.forEach(function(e,i){
                if(e.activity=="reflexion" || e.activity=="recorridos"){
                    respuestas.push({sense:e.sense,question:e.question, answer:e.value});
                }
            });

            //asignacion de los datos en la vista: sentidos
            
            respuestas.forEach(function(e,i){
                if(e.sense!=""){
                    $("#userAnswer").append(`
                        <tr>
                            <th style="width:50%">${e.question}</th>
                            <td style="width:50%">${e.answer}</td>
                        </tr>
                    `);
                }  
            });
        }
        
    })
    .catch(function(err){
        console.log(err);
    });
}

function doSearch(){

    var tableReg = document.getElementById('tableUsers');
    var searchText = document.getElementById('searchTerm').value.toLowerCase();
    var cellsOfRow="";
    var found=false;
    var compareWith="";

    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < tableReg.rows.length; i++)
    {
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        found = false;
        // Recorremos todas las celdas
        for (var j = 0; j < cellsOfRow.length && !found; j++)
        {
            compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
            {
                found = true;
            }
        }
        if(found)
        {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }
}

function exportTableToExcel(filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById("tableUsers");
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      window.location.href = uri + base64(format(template, ctx))
    }
  })()