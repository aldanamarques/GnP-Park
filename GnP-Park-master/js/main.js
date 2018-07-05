//seccion activa
const mostrarSection = sectionBtn => {
    document.querySelectorAll("body > section").forEach(section => {
        if (section.classList.contains(sectionBtn)) {

            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');

        }
    })
}
// Boton de Seccion
const activarMenu = () => {
    mostrarSection('menu');
}
const activarIngreso = () => {
    mostrarSection('ingreso');
    crearTabla();
}
const activarSalida = () => {
    mostrarSection('salida');
    crearTabla();
}
const activarEspacios = () => {
    mostrarSection('espacios');
}
const activarTarifa = () => {
    mostrarSection('tarifa');
    openNav();
}
// Activar/Desactivar SideNav
function openNav() {
    if (document.getElementById("sidenav").style.width == "250px") {
        document.getElementById("sidenav").style.width = "0";
        document.body.style.backgroundColor = "white";
    } else {
        document.getElementById("sidenav").style.width = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
}

//
function mostrarError(mensaje_error) {
    const errorText = document.querySelectorAll('.error-msg');
    errorText.forEach(element => {
        console.log('error: ' + element);
        element.innerHTML = mensaje_error;
        setTimeout(function() {
            element.innerHTML = '';
        }, 3000);
    });
}

function crearTabla() {
    var tabla = '';
    var fecha = '';
    //base = JSON.parse(base);
    mostrarTabla = document.querySelectorAll('.mostrarTabla');
    var filas = base.length;
    var cols = 3;
    tabla += '<tr>';
    tabla += '<td>' + 'Tipo' + '</td>';
    tabla += '<td>' + 'patente' + '</td>';
    tabla += '<td>' + 'Horario Entrada' + '</td>';
    tabla += '</tr>';
    for (var f = 0; f < filas; f++) {
        tabla += '<tr>';
        tabla += '<td>' + base[f].vehiculo + '</td>';
        tabla += '<td>' + base[f].patente + '</td>';
        tabla += '<td>' + base[f].fecha + '</td>';
        //fecha = base[f].fecha.split('T');
        //tabla += '<td>' + fecha[1].slice(0, -8) + '</td>';
        tabla += '</tr>';
    }
    mostrarTabla.forEach(element => {
        element.innerHTML = '<table>' + '' + '</table>';
        element.innerHTML = `<table class='table table-striped'>` + tabla + '</table>';
    });

}

//----------------------------------------------------------------------------

//Base de Datos:
var base = [];
const cliente = {
    vehiculo: '',
    patente: "",
    fecha: ''
}
//guardar en datos
const saveData = sectionBtn => {
    console.log('saveData() iniciado...');
    var patente = document.getElementById("nroPatente").value;
    var pat = '';
    var ente = '';
    if (patente.length == 7) {
        patente = patente.split('-');
        pat = patente[0];
        ente = patente[1];
    } else if (patente.length == 6) {
        pat = patente.slice(0, 3); //XXX - letras
        ente = patente.slice(4, 6); //000 - numeros
    }
    if (ente == parseInt(ente) && parseInt(pat) != pat) {
        if (document.querySelector('input[name="tipo"]:checked') == null) {
            mostrarError("Error; seleccione un tipo de vehiculo");
        } else {
            if (buscar(patente) == true) {
                mostrarError('Patente ya existe.');
            } else {
                const tipo = document.querySelector('input[name=tipo]:checked');
                switch (tipo.value) {
                    case 'moto':
                        cliente.vehiculo = 'moto';
                        break;
                    case 'auto':
                        cliente.vehiculo = 'auto';
                        break;
                    case 'camioneta':
                        cliente.vehiculo = 'camioneta';
                        break;
                }
                cliente.patente = document.getElementById('nroPatente').value;
                cliente.fecha = new Date().toTimeString().split(' ', 1);
                console.log('saveData dice: ' + cliente.fecha);
                base == null ? base[0] = cliente : base.push(cliente);
                guardar('datos');
                cargarDatos();
                crearTabla();
                contarVehiculos();
                console.log('saveData() dice - Datos Guardados');
            }
        }
    } else {
        mostrarError("Ingrese una patente valida y seleccione un tipo de vehiculo");
    }
}

//Guardar Base de Datos:
function guardar(elemento) {
    if (elemento == 'datos') {
        localStorage.setItem(elemento, JSON.stringify(base));
        console.log('guardar() dice:Elemento -base- guardado en localStorage');
    }
    if (elemento == 'tarifas') {
        localStorage.setItem(elemento, JSON.stringify(tarifas));
        console.log('guardar() dice:Elemento -tarifa- en localStorage');
    }
}
//Recuperar Base de Datos:
function cargarDatos() {
    base = [];
    if (localStorage.getItem('datos') == null) {
        console.log("cargarDatos() Dice: No hay datos")
    } else {
        var baseDeDatos = JSON.parse(localStorage.getItem('datos'));
        console.log('baseDeDatos in cargarDatos():'); //  Mostrar en consola baseDeDatos
        console.log(baseDeDatos); //
        baseDeDatos.forEach((key, value) => {
            base.push(key);
        });
        console.log('cargarDatos() dice Base= '); // Mostrar en consola base (ahora local)
        console.log(base); //
    } //else
} //fin de cargar()

var tarifas = {
    moto: 0,
    auto: 0,
    camioneta: 0,
    total: 0
}
//Guardar Tarifas

function guardarTarifa() {
    tmoto = document.getElementById('tarifaMoto').value; //                             //
    tauto = document.getElementById('tarifaAuto').value; // TOMA VALORES DE LA PAGINA   //
    tcam = document.getElementById('tarifaCam').value; //                             //

    if (tmoto <= 0 || tauto <= 0 || tcam <= 0) {
        mostrarError('Ingrese todas las tarifas.');
    } else {
        tarifas.moto = document.getElementById('tarifaMoto').value;
        tarifas.auto = document.getElementById('tarifaAuto').value;
        tarifas.camioneta = document.getElementById('tarifaCam').value;
        tarifas.Total = document.getElementById('money').value;
        guardar('tarifas');
        console.log('Datos Guardados');
    }
}

function cargarTarifas() {
    (localStorage.getItem('tarifas') == null) ? tarifas = {
        moto: 0,
        auto: 0,
        camioneta: 0,
        total: 0
    }: tarifas = JSON.parse(localStorage.getItem('tarifas'));
    console.log('cargarTarifas() Ejecutado|Tarifas= ' + JSON.stringify(tarifas));
} //fin de cargar Tarifas()

function contarVehiculos() {
    base.length > 0 ? largo = base.length : largo = 0;
    var vehiculos = {
        motos: 0,
        autos: 0,
        camionetas: 0
    };
    if (largo > 0) {
        console.log(base);
        for (i = 0; i < largo; i++) {
            console.log(base[i].vehiculo);
            switch (base[i].vehiculo) {
                case "moto":
                    vehiculos.motos++;
                    break;
                case "auto":
                    vehiculos.autos++;
                    break;
                case "camioneta":
                    vehiculos.camionetas++;
                    break;
            }
        }
    }
    document.getElementById("cantMotos").innerHTML = vehiculos.motos;
    document.getElementById("cantAutos").innerHTML = vehiculos.autos;
    document.getElementById("cantCamionetas").innerHTML = vehiculos.camionetas;
    document.getElementById("money").innerHTML = '$' + tarifas.total + ' Facturado hoy';
}

function eliminarVehiculo() {
    var eliminar = document.getElementById('eliminarPatente').value; // Busca patente a eliminar
    var check = true;
    for (var i = 0; i < base.length; i++) {
        if (base[i].patente == eliminar) {
            check = false;
            if (costeTarifa(base[i]) == true) {
                base.splice(i, 1);
                guardar('datos');
                cargarDatos();
                crearTabla();
                contarVehiculos();
                console.log("Patente encontrada y eliminada");
            } else {
                mostrarError('Se cancelo Salida');
            }
        }
    }
    check == true ? mostrarError('Patente No Encontrada') : '';
}

function clearLocalStorage() {
    localStorage.clear();
    console.log('localStorage.clear() ejecutado. localStorage limpiado');
}

function buscar(elemento) {
    for (i = 0; i < base.length; i++) {
        if (base[i].patente == elemento) {
            return true;
        }
    }
}

function costeTarifa(elemento) {
    cobrar = '';
    elTipo = elemento.vehiculo;
    elemento = enMinutos(elemento.fecha);
    horaActual = enMinutos('horaActual');

    console.log('horaActual%elemento ' + (horaActual % elemento));
    console.log('costeTarifa dice: cobrar:' + cobrar);
    console.log('costeTarifa dice: elemento:' + elemento);
    console.log('costeTarifa dice: horaActual:' + horaActual);
    console.log('costeTarifa dice: elTipo:' + elTipo);
    console.log('costeTarifa dice: Tarifa: ' + tarifas[elTipo]);
    Math.abs(horaActual[1] - elemento[1]) > 30 ? cobrar = (horaActual[0] - elemento[0]) + 1 : cobrar = (horaActual[0] - elemento[0]);
    txt =
        'Vehiculo:      ' + elTipo.toUpperCase() + '               Tarifa x Hora: ' + tarifas[elTipo] + '$\n' +
        'Horario de Llegada: ' + elemento[0] + ':' + elemento[1] + ' \n' +
        'Horario de Salida:    ' + horaActual[0] + ':' + horaActual[1] + ' \n' +
        'Tiempo total: ' + (horaActual[0] - elemento[0]) + ':' + Math.abs(horaActual[1] - elemento[1]) + '               Horas Cobradas: ' + cobrar + ' hs.\n' +
        'Coste total: ' + cobrar * tarifas[elTipo] + '$';
    if (confirm(txt) == true) {
        var total = parseInt(cobrar * tarifas[elTipo]);
        tarifas.total = parseInt(tarifas.total) + total;
        guardar('tarifas');
        document.getElementById("money").innerHTML = '$' + tarifas.total;
        return true;
    } else {
        return false
    }
}


//mini funciones o sub funciones
function enMinutos(elemento) {
    if (elemento == 'horaActual') {
        elemento = new Date().toTimeString().split(' ', 1);
    }
    elemento = elemento[0].split(':', 2);
    elemento[2] = (elemento[0] * 60) + elemento[1];
    //elemento[0]>0 ? elemento = parseInt((elemento[0])*60)+parseInt(elemento[1]) : elemento=parseInt(elemento[1]);
    return elemento;
}
window.onload = function() {
    iniciar();
    document.getElementById("tarifaMoto").placeholder = tarifas.auto;
    document.getElementById("tarifaAuto").placeholder = tarifas.auto;
    document.getElementById("tarifaCam").placeholder = tarifas.camioneta;
};

function iniciar() {
    cargarDatos();
    cargarTarifas();
    contarVehiculos();
}