
let form = document.getElementById("xyr_form");
let canvas = document.getElementById("grid");
canvas.addEventListener("click", function () {
    canvasListener(canvas);
});
let width = canvas.width;
let height = canvas.height;

let half_width = width / 2;
let half_height = height / 2;

let quarter_width = half_width / 2 - (width / 20);
let quarter_height = half_height / 2 - (height / 20);
form.elements["Y"].addEventListener("input", validateY);
form.elements["X"].addEventListener("input", validateX);
form.elements["R"].addEventListener("input", checkR);
form.addEventListener("submit",submit);
let dotsArray = [];
window.onload = getSessionData;
//~~~~~~~~~~~~~~~~~~~~~~~//
function checkR(){
        if(validateR())
      drawCanvas(canvas, form.elements["R"].value)
}
function submit() {
    event.preventDefault();
    if (validateX()&&validateY()&&validateR()) {
        let formData = new FormData(form);
        sendClickCoors(formData, false);
    }
}

 function creatResTable() {
                 let  resCol = document.getElementById("resCol");
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
                     resCol.appendChild(resTable);
                 }
 }
 function addRow(data){
     creatResTable();
     let newRow =document.createElement("tr");
     let  newCell = document.createElement("td");
     newCell.innerText = data["x"];
     newRow.appendChild(newCell);

     let newCell2 = document.createElement("td");
     newCell2.innerText = data["y"];
     newRow.appendChild(newCell2);

     let  newCell3 = document.createElement("td");
     newCell3.innerText = data["r"];
     newRow.appendChild(newCell3);

     let  newCell4 = document.createElement("td");
     newCell4.innerText = data["result"];
     newRow.appendChild(newCell4);
     dotsArray = [...dotsArray, {x: data["x"], y: data["y"]}];
     document.getElementById("res_table").appendChild(newRow)
 }




 function validateY() {
    let y = form.elements["Y"].value;
    if(!(isNaN(y))&& (y>=-5) && (y<=3)){
        removeError("Y");
        return true;
    }
    else {
        event.preventDefault();
        showError("Y");
        return false;
    }

}
function validateX() {
    let y = form.elements["X"].value;
    if(!(isNaN(y))&& (y>=-5) && (y<=5)){
        removeError("X");
        return true;
    }
    else {
        event.preventDefault();
        showError("X");
        return false;
    }

}
function validateR() {
    let y = form.elements["R"].value;
    if(!(isNaN(y))&& (y>=1) && (y<=4)){
        removeError("R");
        return true;
    }
    else {
        event.preventDefault();
        showError("R");
        return false;
    }

}
 function showError(pol) {
    let input;
    let error;
    // alert(pol);
    switch (pol) {
        case "Y":
            input = "y-block";
            error = "y-error";
            break;
        case "R":
            input = "r-block";
            error = "r-error";
            break;
        case "X":
            input = "x-block";
            error = "x-error";
            break;
    }
            let Block= document.getElementById(input);
            if(!Block.contains(document.getElementById(error))){
                let errorSpan = document.createElement("div");
                errorSpan.id = error;
                // errorSpan.classList.add("error_span");
                errorSpan.innerHTML= " Неверное значение "+pol;
                Block.appendChild(errorSpan);
                form.elements[pol].classList.add("error_input");
            }
    }
function showErrorConv() {

    let Block= document.getElementById("task_col");
    if(!Block.contains(document.getElementById("convErr"))){
        let errorSpan = document.createElement("div");
        errorSpan.id = "convErr";
        errorSpan.innerHTML= "ВВедите значение R";
        Block.appendChild(errorSpan);
        form.elements[pol].classList.add("NoR");
    }
}

 function removeError(pol) {
    let input,error;
     switch (pol) {
         case "Y":
             input = "y-block";
             error = "y-error";
             break;
         case "R":
             input = "r-block";
             error = "r-error";
             break;
         case "X":
             input = "x-block";
             error = "x-error";
             break;
     }
     let Block = document.getElementById(input);
     if (Block.contains(document.getElementById(error))){
         Block.removeChild(document.getElementById(error));
         form.elements[pol].classList.remove("error_input");
     }

 }
function removeErrorConv() {

    let Block = document.getElementById("task_col");
    if (Block.contains(document.getElementById("convErr"))){
        Block.removeChild(document.getElementById("convErr"));
        form.elements[pol].classList.remove("Nor");
    }

}

function getSessionData() {
    fetch("ControllerServlet?getSession=true", {
        credentials: "include",
    }).then(function (response) {
        response.json().then(function (sessionRows) {
            if (sessionRows.length > 0) {
                creatResTable();
                for (let row in sessionRows) {
                    addRow(sessionRows[row]);
                }
            }
            drawCanvas(canvas, 2);
        })
    });
}
function drawCanvas(canvas, r) {
    if (canvas.getContext) {
        let context = canvas.getContext("2d");

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

            context.moveTo(half_width -  quarter_width, half_height - 4);
            context.lineTo(half_width -  quarter_width, half_height + 4);
            context.fillText(-r / 2, half_width -  quarter_width - 8, half_height - 6);

            context.moveTo(half_width + 2 * quarter_width, half_height - 4);
            context.lineTo(half_width + 2 * quarter_width, half_height + 4);
            context.fillText(r, half_width + 2 * quarter_width - 3, half_height - 6);

            context.moveTo(half_width +  quarter_width, half_height - 4);
            context.lineTo(half_width +  quarter_width, half_height + 4);
            context.fillText(r / 2, half_width +  quarter_width - 5, half_height - 6);


            context.moveTo(half_width - 4, half_height - (2 * quarter_height));
            context.lineTo(half_width + 4, half_height - (2 * quarter_height));
            context.fillText(r, half_width + 5, half_height - 2 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height - ( quarter_height));
            context.lineTo(half_width + 4, half_height - ( quarter_height));
            context.fillText(r / 2, half_width + 5, half_height -  quarter_height + 4);

            context.moveTo(half_width - 4, half_height + (2 * quarter_height));
            context.lineTo(half_width + 4, half_height + (2 * quarter_height));
            context.fillText(-r, half_width + 5, half_height + 2 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height + ( quarter_height));
            context.lineTo(half_width + 4, half_height + ( quarter_height));
            context.fillText(-r / 2, half_width + 5, half_height +  quarter_height + 4);

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
            context.rect(3/2*quarter_width, half_height, quarter_width, 2*quarter_height);

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
            let pointer_x = (dot.x / r) * quarter_width * 2;
            let pointer_y = (dot.y / r) * quarter_height * 2;

            context.beginPath();
            context.arc(half_width + pointer_x, half_height - pointer_y, 1, 2 * Math.PI, 0);
            context.closePath();
            context.fill();
            context.stroke();
        });
    }

}
function canvasListener(canvas) {
           let padding=parseInt($("#grid").css("padding"))+parseInt($("#grid").css("border"));
           let r = new FormData(form).get("R");
           if (r !== "") {
               // removeErrorConv();
               let posX=event.pageX-getOffsetRect(canvas).left;
               let posY =event.pageY-getOffsetRect(canvas).top;
               let deltaX=canvas.width/2+padding;
               let deltaY=canvas.height/2+padding;
               let coorX = ((posX - deltaX) / (2*quarter_width/r) ).toFixed(3);
               let coorY = ((-posY + deltaY) / (2*quarter_height/r) ).toFixed(3);
               alert(coorX+" "+coorX);
               let formData = new FormData;
               formData.append("X", coorX);
               formData.append("Y", coorY);
               formData.append("R", r);
                sendClickCoors(formData, true);
           } else true;//showErrorConv();
}

function sendClickCoors(formData, click) {
    formData.append("click", click);
    let formArr = {};
    formData.forEach(function (value, key) {
        formArr[key] = value;
    });
    let formJson = JSON.stringify(formArr);
    alert(formJson+" "+click);
    fetch("ControllerServlet", {
        method: "POST",
        credentials: "include",
        body: formJson,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            response.json().then(function (sessionRows) {
                    creatResTable();
                    addRow(sessionRows);
                    drawCanvas(canvas, sessionRows["r"]);
            })
        })
        .catch(function (exception) {
            alert(exception.toString());
        })
}
function getOffsetRect(elem) {
    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docElem = document.documentElement;
    let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    let clientTop = docElem.clientTop || body.clientTop || 0;
    let clientLeft = docElem.clientLeft || body.clientLeft || 0;
    let top  = box.top +  scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) }
}
