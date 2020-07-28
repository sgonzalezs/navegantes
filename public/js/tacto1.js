$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    var pictures=[
        'abuelito', 
        'Cantante', 
        'deportista', 
        'Empresario', 
        'enfermero', 
        'Juez', 
        'Ladron', 
        'Panadero', 
        'policia', 
        'Profesor'
    ];
    $(".btnSendTacto").click(function(){
        let answer=$(this).attr("value");
        let data={
            id:identity._id,
            answer,
            question:$("#questionTacto").text(),
            sense:'tacto',
            activity:'reflexion'
        }
    });

});