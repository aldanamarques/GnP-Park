function openNav() {
    document.getElementById("submenu_1").style.width = "250px";
}

function closeNav() {
    document.getElementById("submenu_1").style.width = "0";
}



function showMainMenu() {
    if (document.getElementById("main_menu").classList.contains("hidden")) {
        document.getElementById("main_menu").classList.remove("hidden");
        document.getElementById("ingreso").classList.add("hidden");
        document.getElementById("salida").classList.add("hidden");
    } else {
        document.getElementById("ingreso").classList.add("hidden");
    }
}


function showIngreso() {
    if (document.getElementById("ingreso").classList.contains("hidden")) {
        document.getElementById("ingreso").classList.remove("hidden");
        document.getElementById("main_menu").classList.add("hidden");
    } else {
        document.getElementById("ingreso").classList.add("hidden");
    }
}

document.getElementById("money").innerHTML = '$' + 'numero';

document.getElementById("num_moto").innerHTML = "moto";
document.getElementById("num_auto").innerHTML = "auto";
document.getElementById("num_cam").innerHTML = "cam";

function mostrarError(mensaje_error) {
    const errorText = document.querySelector('.error-msg');
    errorText.innerHTML = mensaje_error;
    setTimeout(function () {
        errorText.innerHTML = '';
    }, 3000);
}

function AddData() {
    var y = document.getElementById("nropatente").value;
    var letters = '/^[a-zA-Z]+$/';
    if (y != parseInt(y)) {
        mostrarError("Ingrese una patente valida");
    } else {
        var rows = "";
        var nro = y;
        if (document.querySelector('input[name="tipo"]:checked') == null) {
            mostrarError("Error; seleccione un tipo de vehiculo");
        } else {
            var tipo = document.querySelector('input[name="tipo"]:checked');
            tipo = tipo ? tipo.value : '';


            rows += "<td>" + nro + "</td><td>" + tipo + "</td>";
            var tbody = document.querySelector("#list tbody");
            var tr = document.createElement("tr");

            tr.innerHTML = rows;
            tbody.appendChild(tr)
        }
    }
}

function ResetForm() {
    document.getElementById("lista").reset();
}