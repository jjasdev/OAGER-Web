/**
 * @fileoverview Interactividad OAGER Ayuntamiento de Salamanca
 * @version 0.1
 * @author Juanjo Alonso Sánchez <jj.alonso@esla.com>
 * @copyright cgb@esla.com
 */
 "use strict";

 //--VARIABLES
  /**
  * Array con los nombres de los meses del año
  * @type {number}
  */
   let monthNames = [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ];
  /**
  * Array con los nombres de los días de la semana
  * @type {number}
  */
   let weekDaysNames = [ "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado" ];

   //--FUNCIONES
  /**
  * Añade ceros a un número. Si el número dado es menor que la longitud solicitada, rellena automáticamente el número con ceros hasta alcanzar la longitud
  * @param {number} numero Número
  * @param {number} longitudCifra Longitud del número
  * @returns {string} Número con ceros
  */
function rellenarCeros(numero, longitudCifra) {
    let valorNumero = Math.abs(numero).toString();
    let longitudNumero = numero.toString().length;
    let cero = "0"; 
    
    if(Number(longitudNumero) < longitudCifra){
        return (cero + valorNumero);
    }else{
        return numero.toString();
    }
}
/**
  * Establece el día, la hora y los minutos
  * @returns {void}
  */
 function establecerHora(){ 
    const today = new Date();
    const longitudCifra = 2;
    const nodoHora = document.querySelector(".date__hour");
    const nodoDia = document.querySelector(".date__day");
    let horas = rellenarCeros(today.getHours(), longitudCifra);
    let minutos = rellenarCeros(today.getMinutes(), longitudCifra);
    let diaSemana = weekDaysNames[today.getDay()];
    const hour = horas + ':' + minutos;    
    const getDia = rellenarCeros(today.getDate(), longitudCifra);
    const day = `${diaSemana}, ${getDia} de ${monthNames[today.getMonth()]} de ${today.getFullYear()}`;
    
    nodoHora.innerHTML = hour;  
    nodoDia.innerHTML = day; 
    
    setInterval(()=> {        
        establecerHora();
    }, 1000);
}
/**
  * Pinta el texto del horario de atención de un color u otro dependiendo si el servicio está o no disponible
  * @returns {void}
  */
 function pintarHorario(){ 
    const estadoHorario = document.querySelector(".contact__schedule-state");
    const diasDisponibles = document.querySelectorAll(".contact__submenu-text");
    const horasDisponibles = [8, 20];
    const today = new Date();
    let diaSemana = weekDaysNames[today.getDay()];
    let hora = Number(today.getHours());
    let servicioDisponible = false;
    
    diasDisponibles.forEach( (horario)=> {
            if (horario.innerHTML === diaSemana) {
                horario.parentNode.classList.add('contact__submenu-item--background');
                if (hora>=horasDisponibles[0] && hora < horasDisponibles[1]) {
                    servicioDisponible = true;
                }                
            }
        }
    );   
    if (servicioDisponible) {
        estadoHorario.innerHTML = 'Abierto';
        estadoHorario.classList.add('contact__schedule-state--open');
    } else {
        estadoHorario.innerHTML = 'Cerrado';
        estadoHorario.classList.add('contact__schedule-state--close');
    }
}

//--CÓDIGO
//Establecer fechas y pintar horarios
establecerHora();
pintarHorario();

