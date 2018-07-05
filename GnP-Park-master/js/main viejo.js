function limpiarDatos() {
    localStorage.setItem('datos', '');
}
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
const activarMenu = () => { mostrarSection('menu'); }
const activarIngreso = () => { mostrarSection('ingreso'); crearTabla(); }
const activarSalida = () => { mostrarSection('salida'); crearTabla(); }
const activarEspacios = () => { mostrarSection('espacios'); }
const activarTarifa = () => { mostrarSection('tarifa'); sideNav(); }
// Activar/Desactivar SideNav
function sideNav() {
    if (document.getElementById("sideNav").style.width == "250px") {
        document.getElementById("sideNav").style.width = "0"
    } else {
        document.getElementById("sideNav").style.width = "250px";
    }
}
//----------------------------------------------------------------------------

//variables Globales:
// usado en la funcion de carga
//Base de Datos:
var datos = [];
var base = [];
const cliente = {
    vehiculo: '',
    patente: "",
    fecha: new Date()
}
var tarifas = {
    moto: 0,
    auto: 0,
    camioneta: 0
}
//guardar en datos

const saveData = sectionBtn => {
    console.log('guardar Datos?');
    var patente = document.getElementById("nroPatente").value;
    console.log('patente= ' + patente + ' - Largo= ' + patente.length);
    var pat = '';
    var ente = '';
    if (patente.length == 7) {
        patente = patente.split('-'); pat = patente[0]; ente = patente[1];
    }
    if (patente.length == 6) {
        pat = patente.slice(0, 3); //XXX
        ente = patente.slice(4, 6);//000
    } else { mostrarError("Ingrese una patente valida. Error nro 101"); }
    if (ente == parseInt(ente)) {
        var nro = ente;
        if (document.querySelector('input[name="tipo"]:checked') == null) {
            mostrarError("Error; seleccione un tipo de vehiculo");
        } else {
            //datos.push(base); //ATENCION A ESTE DE ACA
            const tipo = document.querySelector('input[name=tipo]:checked');
            switch (tipo.value) {
                case 'moto':
                    cliente.vehiculo = 'moto'; break;
                case 'auto':
                    cliente.vehiculo = 'auto'; break;
                case 'camioneta':
                    cliente.vehiculo = 'camioneta'; break;
            }
            cliente.patente = document.getElementById('nroPatente').value;
            cliente.fecha = new Date();

            datos.push(JSON.stringify(cliente))
            guardar('datos');
            console.log('Datos Guardados');
        }
    } else {
        mostrarError("Ingrese una patente valida. Error nro 202");
    }
}

//Guardar Base de Datos:
function guardar(elemento) {
    if (elemento == 'datos') {
        localStorage.setItem(elemento, JSON.stringify(datos));
        console.log('elemento datos fue guardado en setItem');
    }
    if (elemento == 'tarifas') {
        localStorage.setItem(elemento, JSON.stringify(tarifas));
        console.log('elemento datos fue guardado en setItem');
    }
}
//Recuperar Base de Datos:
function cargarDatos() {
    base = [];
    baseDeDatos = localStorage.getItem('datos');
    if (baseDeDatos == '') { console.log("No hay datos") } else {

        baseDeDatos = JSON.parse(localStorage.getItem('datos'));
        console.log(baseDeDatos);
        baseDeDatos.forEach((key, value) => {
            base.push(JSON.parse(key));
        });
        console.log('cargar() Ejecutado. - base= ' + base);
    }//else
}//fin de cargar()

function cargarTarifas() { //revisar que esta crudo

    const tarifa = localStorage.getItem('tarifas'); console.log('const tarifa: ' + tarifa);
    tarifas = JSON.parse(tarifa);
    console.log('cargar() Ejecutado. - base= ' + tarifas);
}//fin de cargartTarifas()

function contarVehiculos() {
    //cargar();
    var vehiculos = { 'motos': 0, 'autos': 0, 'camionetas': 0 };
    if (base == '') { base = 0 } //control por si esta en blanco los datos de base[]
    for (i = 0; i < base.length; i++) {
        switch (base[i].vehiculo) {
            case "moto":
                vehiculos.motos = vehiculos.motos + 1; break;
            case "auto":
                vehiculos.autos = vehiculos.autos + 1; break;
            case "camioneta":
                vehiculos.camionetas = vehiculos.camionetas + 1; break;
        }
        document.getElementById("cantMotos").innerHTML = vehiculos.motos;
        document.getElementById("cantAutos").innerHTML = vehiculos.autos;
        document.getElementById("cantCamionetas").innerHTML = vehiculos.camionetas;
    }
}
function guardarTarifa() {
    tmoto = document.getElementById('tarifaMoto').value;
    tauto = document.getElementById('tarifaAuto').value;
    tcam = document.getElementById('tarifaCam').value;

    if (tmoto <= 0 || tauto <= 0 || tcam <= 0) {
        mostrarError('Ingrese todas las tarifas.');
    } else {
        tarifas.moto = document.getElementById('tarifaMoto').value;
        tarifas.auto = document.getElementById('tarifaAuto').value;
        tarifas.camioneta = document.getElementById('tarifaCam').value;
        guardar('tarifas');
        console.log('Datos Guardados');
    }
}
function mostrarError(mensaje_error) {
    const errorText = document.querySelectorAll('.error-msg');
    errorText.innerHTML = mensaje_error;
    setTimeout(function () {
        errorText.innerHTML = '';
    }, 5000);
}
function crearTabla() {
    var tabla = ''; var fecha = '';
    document.getElementById('tabla').innerHTML = '<table>' + tabla + '</table>';
    document.getElementById('tabla2').innerHTML = '<table>' + tabla + '</table>';
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
        fecha = base[f].fecha.split('3T');//depende del formato de fecha de la pc
        tabla += '<td>' + fecha[1].slice(0, -5) + '</td>';
        //tabla += '<td>' + fecha+ '</td>';
        tabla += '</tr>';
    }
    document.getElementById('tabla').innerHTML = `<table class='table table-striped'>` + tabla + '</table>';
    document.getElementById('tabla2').innerHTML = `<table class='table table-striped'>` + tabla + '</table>';
}
function eliminarVehiculo() {
    var eliminar = document.getElementById('eliminarPatente').value;
    console.log('variable eliminar:' + eliminar);
    
    for (var i = 0; i < base.length; i++) {
        console.log('busqueda en progreso patente:' + base[i].patente);
        if (base[i].patente == eliminar) {
            var aux = base[base.length - 1]; console.log(aux);
            base[base.length - 1] = base[i];
            base[i] = aux;
            base.pop();
            return console.log("Patente encontrada y eliminada");
            datos = base;
        } else {
            console.log("Patente no encontrada");
            console.log(i);
        }
    }
}

function iniciar() {
    datos = JSON.parse(localStorage.getItem('datos'));
    cargarDatos();
    cargarTarifas();
    contarVehiculos();
}
