
let form = document.getElementById("xyr_form");
let canvas = document.getElementById("grid");
canvas.addEventListener("click", function () {
    canvasListener(canvas);
});
let validatListener = validateY;
form.addEventListener("input", validatListener);
form.elements["R"].addEventListener("input", checkR);

let dotsArray = [];
window.onload = getSessionData;
// $.ajax({
//     url: "session.php",
//     dataType:"json",
//     success:function(sessionRows){
//         var mass = sessionRows["rows"];
//         if(!(mass.length === undefined ||mass.length == null)){
//             creatResTable();
//             for (let row in mass){
//                 addRow(mass[row]);
//             }
//         }
//     },
//     xhrFields: {
//         withCredentials: true
//     }
// });
//
// //AJAX
// $(function() {
//     $(form).submit(function(e) {
//         e.preventDefault();
//         var $form = $(this);
//         $.ajax({
//             type: $form.attr('method'),
//             url: $form.attr('action'),
//             data: $form.serialize(),
//             dataType:"json",
//             response:"json",
//             beforeSend: function(){
//                 if(!validateY()){
//                     return false
//                 }
//             },
//             success:addRow
//         }).done(function() {
//             console.log('success');
//         }).fail(function() {
//             console.log('fail');
//         });
//     });
// });
//~~~~~~~~~~~~~~~~~~~~~~~//
function checkR(){
      drawCanvas(canvas, form.elements["r-buttons"].value)
}

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

function getSessionData() {
    drawCanvas(canvas, 2);
    // fetch("ControllerServlet?getSession=true", {
    //     credentials: "include",
    // }).then(function (response) {
    //     response.json().then(function (sessionRows) {
    //         if (sessionRows.length > 0) {
    //             creatResTable();
    //             for (let row in sessionRows) {
    //                 addRow(sessionRows[row]);
    //             }
    //         }
    //         drawCanvas(canvas, 2);
    //     })
    // });
}
function drawCanvas(canvas, r) {
    if (canvas.getContext) {
        var context = canvas.getContext("2d");

        var width = canvas.width;
        var height = canvas.height;

        var half_width = width / 2;
        var half_height = height / 2;

        var quarter_width = half_width / 2 - (width / 20);
        var quarter_height = half_height / 2 - (height / 20);

        context.clearRect(0, 0, width, height);


        context.strokeStyle = "black";
        context.fillStyle = "black";

        //Create grid
        {
            context.beginPath();
            context.font = "10px sans-serif";
            context.moveTo(0, half_height);
            context.lineTo(width, half_height);
            context.lineTo(width - 8, half_height + 3);
            context.lineTo(width - 8, half_height - 3);
            context.lineTo(width, half_height);
            context.fillText("X", width - 8, half_height - 7);

            context.moveTo(half_width, 0);
            context.lineTo((half_width) - 3, 8);
            context.lineTo((half_width) + 3, 8);
            context.lineTo(half_width, 0);
            context.lineTo(half_width, height);
            context.fillText("Y", half_width + 5, 10);


            context.moveTo(half_width - 2 * quarter_width, half_height - 4);
            context.lineTo(half_width - 2 * quarter_width, half_height + 4);
            context.fillText(-r, half_width - 2 * quarter_width - 5, half_height - 6);

            context.moveTo(half_width - 1 * quarter_width, half_height - 4);
            context.lineTo(half_width - 1 * quarter_width, half_height + 4);
            context.fillText(-r / 2, half_width - 1 * quarter_width - 8, half_height - 6);

            context.moveTo(half_width + 2 * quarter_width, half_height - 4);
            context.lineTo(half_width + 2 * quarter_width, half_height + 4);
            context.fillText(r, half_width + 2 * quarter_width - 3, half_height - 6);

            context.moveTo(half_width + 1 * quarter_width, half_height - 4);
            context.lineTo(half_width + 1 * quarter_width, half_height + 4);
            context.fillText(r / 2, half_width + 1 * quarter_width - 5, half_height - 6);


            context.moveTo(half_width - 4, half_height - (2 * quarter_height));
            context.lineTo(half_width + 4, half_height - (2 * quarter_height));
            context.fillText(r, half_width + 5, half_height - 2 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height - (1 * quarter_height));
            context.lineTo(half_width + 4, half_height - (1 * quarter_height));
            context.fillText(r / 2, half_width + 5, half_height - 1 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height + (2 * quarter_height));
            context.lineTo(half_width + 4, half_height + (2 * quarter_height));
            context.fillText(-r, half_width + 5, half_height + 2 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height + (1 * quarter_height));
            context.lineTo(half_width + 4, half_height + (1 * quarter_height));
            context.fillText(-r / 2, half_width + 5, half_height + 1 * quarter_height + 4);

            context.closePath();
            context.strokeStyle = "black";
            context.fillStyle = "black";
            context.stroke();
            context.fill();
        }

        //Create figure
        {
            context.beginPath();
            context.moveTo(half_width, half_height);
            context.ellipse(half_width, half_height, quarter_width, quarter_height, 0, 0, Math.PI  / 2, false);
            context.rect(half_width - 2*quarter_width, half_height -  quarter_height, 2*quarter_width, quarter_height);

            context.moveTo(half_width, half_height);
            context.lineTo(half_width, half_height - quarter_height);
            context.lineTo(half_width + 2*quarter_width, half_height);
            context.lineTo(half_width, half_height);

            context.closePath();
            context.fillStyle = 'rgba(0, 97, 255, 0.7)';
            context.fill();
        }
        context.strokeStyle = "orange";
        context.fillStyle = "orange";

        //Create point of answer
        dotsArray.forEach(function (dot) {
            var pointer_x = (dot.x / r) * quarter_width * 2;
            var pointer_y = (dot.y / r) * quarter_height * 2;

            context.beginPath();
            context.arc(half_width + pointer_x, half_height - pointer_y, 1, 2 * Math.PI, 0);
            context.closePath();
            context.fill();
            context.stroke();
        });
    }

}
        function canvasListener(canvas) {
            let width = canvas.width;
            let height = canvas.height;

            let r = new FormData(form).get("r-buttons");
            if (r !== null) {
                removeErrorR();
                let posX = event.pageX - canvas.offsetLeft;
                let posY = event.pageY - canvas.offsetTop;
                let coorX = ((posX - 163) / 130 * r).toFixed(3);
                let coorY = (-(posY - 139) / 108 * r).toFixed(3);
                let formData = new FormData;
                formData.append("x-input", coorX);
                formData.append("y-input", coorY);
                formData.append("r-buttons", r);
                sendClickCoors(formData, true);
            } else showErrorR();
        }