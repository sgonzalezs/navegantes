$(document).ready(function(){
    // $("#formImport").on("submit", function(e){
    //     e.preventDefault();
    // });
    $("#btnImport").click(function(){
        var fileName=document.getElementById("fileInput").files[0].name;
        if(fileName!=""){
            localStorage.setItem("table", fileName);
        }
    });

    if(localStorage.getItem("table")){
        getData(localStorage.getItem("table"));
    }
    $("#btnImport").attr("disabled", true);
    $("#fileInput").change(function(){
        var fileInput=$("#fileInput").val();
        if(fileInput==""){
            $("#btnImport").attr("disabled", true);
        }else{
            $("#btnImport").attr("disabled", false);
        }
    });
});

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('identity');

    window.location="/inspiracioncomfama/";
}

function getData(table){
	var url = "public/files/"+table;
	var oReq = new XMLHttpRequest();
	oReq.open("GET", url, true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function(e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
    //   console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        var data=XLSX.utils.sheet_to_json(worksheet,{raw:true});
        $("#dataImport").empty();
        data.forEach(function(e,i){
            var data={
                type_doc:e.Tipo,
                document:e.Numero,
                grade:e.Grado,
                name:e.Nombre,
                school:e.Colegio
            };
            
            storeStudent(data);

            $("#dataImport").append(`
                <tr>
                    <td>${e.Tipo}</td>
                    <td>${e.Numero}</td>
                    <td>${e.Grado}</td>
                    <td>${e.Nombre}</td>
                    <td>${e.Colegio}</td>
                </tr>
            `);
        });
        localStorage.removeItem("table");
    }
	oReq.send();
}

function storeStudent(data){
    fetch("/inspiracioncomfama/student", {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
       console.log(response);
    })
    .catch(function(err){
        console.log(400);
    });
}