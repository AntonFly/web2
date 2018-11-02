var button_now;


let form = document.getElementById("xyr_form");
let validatListener = validateY;
form.addEventListener("input", validatListener);

$.ajax({
    url: "session.php",
    dataType:"json",
    success:function(sessionRows){
        var mass = sessionRows["rows"];
        if(!(mass.length === undefined ||mass.length == null)){
            creatResTable();
            for (let row in mass){
                addRow(mass[row]);
            }
        }
    },
    xhrFields: {
        withCredentials: true
    }
});

//AJAX
$(function() {
    $(form).submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            dataType:"json",
            response:"json",
            beforeSend: function(){
                if(!validateY()){
                    return false
                }
            },
            success:addRow
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
});
//~~~~~~~~~~~~~~~~~~~~~~~//

 function creatResTable() {
                 let  resCol = document.getElementById("resCol")
                 let resTable= document.getElementById("res_table");
                  if (resTable == undefined){
                     resTable = document. createElement("table");
                     resTable.id="res_table";
                     let tBody =document.createElement("tbody");
                     resTable.appendChild(tBody);
                     let headers =document.createElement("tr");
                     headers.id ="res_table_headers";
                     tBody.appendChild(headers);
                     let columnX =document.createElement("td");
                     columnX.id= "res_table_x";
                     columnX.innerText="X";
                     headers.appendChild(columnX);
                     let columnY =document.createElement("td");
                     columnY.id= "res_table_y";
                     columnY.innerText="Y";
                     headers.appendChild(columnY);
                     let columnR =document.createElement("td");
                     columnR.id= "res_table_r";
                     columnR.innerText="R";
                     headers.appendChild(columnR);
                     let columnRes =document.createElement("td");
                     columnRes.id= "res_table_res";
                     columnRes.innerText="Результат";
                     headers.appendChild(columnRes);
                     let columnTime =document.createElement("td");
                     columnTime.id= "res_table_time";
                     columnTime.innerText="Текущее время";
                     headers.appendChild(columnTime);
                     let columnExtime =document.createElement("td");
                     columnExtime.id= "res_table_extime";
                     columnExtime.innerText="Время выполнения";
                     headers.appendChild(columnExtime);

                     resCol.appendChild(resTable);
                 }
 }
 function addRow(data){
                creatResTable();
                 let newRow =document.createElement("tr");
                 for (let key in data){
                     let  newCell =document.createElement("td");
                     newCell.innerText = data[key];
                     newRow.appendChild(newCell);
                 }
                 document.getElementById("res_table").appendChild(newRow)
 }




 function validateY() {
     let y = form.elements["Y"].value;
     if(!(isNaN(y))&& (y>=-5) && (y<=3)){
         removeErrorY();
         return true;
     }
     else {
         event.preventDefault();
         showErrorY();
         return false;
     }

 }
 function showErrorY() {
     let yBlock= document.getElementById("y-block");
     if(!yBlock.contains(document.getElementById("y-error"))){
         let errorSpan = document.createElement("span");
         errorSpan.id = "y-error";
         // errorSpan.classList.add("error_span");
         errorSpan.innerHTML= "<br> Неверное значение Y";
         yBlock.appendChild(errorSpan);
         form.elements["Y"].classList.add("error_input");
     }
 }
 function removeErrorY() {
     let yBlock = document.getElementById("y-block");
     if (yBlock.contains(document.getElementById("y-error"))){
         yBlock.removeChild(document.getElementById("y-error"));
         form.elements["Y"].classList.remove("error_input");
     }

 }
// window.onload = function(){
// document.getElementById("test").onkeypress = function (ev) {
//
//     symb = ev.key.toLowerCase();
//
//     if(symb>=0 && symb <=9){
//         return true;
//     }
//
//     if(symb>='a' && symb<='z'){
//         return true;
//     }
//
//     return false;
// }}

// function button_click(_button) {
//     _button.style.background = 'white';
//
//     _button.style.width = '38px';
//     _button.style.height = '29px';
//
//
//     if(button_now!=null && button_now!=_button){
//         button_now.style.background='';
//     }
//     button_now = _button;
// }

