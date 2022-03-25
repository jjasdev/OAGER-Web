/**
 * @fileoverview Interactividad OAGER Ayuntamiento de Salamanca
 * @version 0.1
 * @author Juanjo Alonso Sánchez <jj.alonso@esla.com>
 * @copyright cgb@esla.com
 */
 "use strict";

 //--VARIABLES
 /**
 * Tipo de dato Slider
 * @typedef {Object} Slider
 * @property {number} indiceBanner Indice correspondiente de cada banner
 * @property {number} numeroBanners Número de banner que se van a mostrar
 * @property {number} tiempoBanner Tiempo que transcurre entre banner y banner
 */
/**
  * Configuración por defecto del slider
  * @type {Slider}
  */
    const configSlider = {
        indiceBanner: 0,
        numeroBanners: 1,
        tiempoBanner: 8000
    }
  /**
  * Array con los botones para avanzar en la muestra de banners en el slider
  * @type {Array}
  */
   let botonesSlider = [ "prev", "next" ];
  /**
  * Array con los nombres de los meses del año
  * @type {Array}
  */
   let monthNames = [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ];
  /**
  * Array con los nombres de los días de la semana
  * @type {Array}
  */
   let weekDaysNames = [ "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado" ];
   /**
  * Booleano que controla cuando desplegar y cuando ocultar el menú de navegación
  * @type {boolean}
  */
    let showMenu = false;  


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
/**
  * Muestra el menú principal al hacer clic en el icono de menú
  * @returns {void}
  */
 function desplegarMenu(){ 
    const slider = document.querySelector(".slider-menu");
    const mainNav = document.querySelector(".main-nav");
    const mainNavMenu = document.querySelector(".main-nav__menu");
    const menuNavIconOpen = document.querySelector(".fa-bars");
    const menuNavIconClose = document.querySelector(".fa-times");
    const menuSearch = document.querySelector(".main-nav__search");

    if (!showMenu) {
        slider.classList.add('slider-menu--open');
        mainNav.classList.add('main-nav--open');
        mainNavMenu.classList.add('main-nav__menu--open');
        menuNavIconClose.parentNode.classList.add('main-nav__icon--open');
        menuNavIconClose.parentNode.classList.remove('main-nav__icon--close');
        menuNavIconClose.parentNode.classList.add('main-nav__icon--big');
        menuSearch.classList.add('main-nav__search--open');
        menuNavIconOpen.parentNode.classList.add('main-nav__icon--close');
        body.style.overflow = 'hidden';

        showMenu = true;
    } else {
        slider.classList.remove('slider-menu--open');
        mainNav.classList.remove('main-nav--open');
        mainNavMenu.classList.remove('main-nav__menu--open');
        menuNavIconClose.parentNode.classList.remove('main-nav__icon--open');
        menuNavIconClose.parentNode.classList.add('main-nav__icon--close');
        menuNavIconClose.parentNode.classList.remove('main-nav__icon--big');
        menuSearch.classList.remove('main-nav__search--open');
        menuNavIconOpen.parentNode.classList.remove('main-nav__icon--close');
        body.style.overflow = 'auto';

        showMenu = false;
    }    
}
/**
  * Muestra por defecto el banner que hemos establecido en la configuración y le asocia su indicador
  * @returns {void}
  */
 function configurarBanner(){ 
     //Mostramos únicamente un banner, el resto los ocultamos
    for (let index = 0; index < configSlider.numeroBanners; index++) {
        if (index !== configSlider.indiceBanner) {
            contentBanner.item(index).setAttribute('data-active', 'false');
            contentBanner.item(index).classList.add('banner--hide');
        } else {
            contentBanner.item(index).setAttribute('data-active', 'true');
        }
    }
    //Marcamos el indicador
    indicatorBanner.item(configSlider.indiceBanner).classList.add('slider-banner__indicator-item--active');
}
/**
  * Muestra un nuevo banner en función si se ha indicado que sea el anterior o el posterior
  * @param {string} tipoBoton Tipo de botón seleccionado (anterior o posterior)
  * @returns {void}
  */
 function mostrarNuevoBanner(tipoBoton){ 
    let indiceNuevoBanner = 0;
    if (tipoBoton.includes('prev')) {
        //Comprobamos en qué banner nos encontramos.       
        contentBanner.forEach((banner)=> {
            if(banner.getAttribute('data-active') === 'true') {
                banner.classList.add('banner--hide');
                banner.setAttribute('data-active', 'false');
                indicatorBanner.item(Number(banner.getAttribute('data-indice'))).classList.remove('slider-banner__indicator-item--active');
                //Si estamos en el primero mostramos el último y sino mostramos el anterior
                if (banner.getAttribute('data-indice') === '0') { 
                    indiceNuevoBanner = configSlider.numeroBanners - 1;                      
                } else {
                    indiceNuevoBanner = Number(banner.getAttribute('data-indice')) - 1;
                }
            }
        });                       
    } else if (tipoBoton.includes('next')) {
        //Comprobamos en qué banner nos encontramos.       
        contentBanner.forEach((banner)=> {
            if(banner.getAttribute('data-active') === 'true') {
                banner.classList.add('banner--hide');
                banner.setAttribute('data-active', 'false');
                indicatorBanner.item(Number(banner.getAttribute('data-indice'))).classList.remove('slider-banner__indicator-item--active');
                //Si estamos en el último mostramos el primero y sino mostramos el posterior
                if (banner.getAttribute('data-indice') === String(configSlider.numeroBanners - 1)) { 
                    indiceNuevoBanner = 0;                      
                } else {
                    indiceNuevoBanner = Number(banner.getAttribute('data-indice')) + 1;
                }
            }
        });
    }
    //Activamos el nuevo banner y marcamos el indicador corresponidente
    contentBanner.item(indiceNuevoBanner).classList.remove('banner--hide');
    contentBanner.item(indiceNuevoBanner).setAttribute('data-active', 'true');
    indicatorBanner.item(indiceNuevoBanner).classList.add('slider-banner__indicator-item--active');
}

//--CÓDIGO
//Establecer fechas y pintar horarios
establecerHora();
setInterval(()=> {        
    establecerHora();
}, 1000);
pintarHorario();

//Menú de navegación
const body = document.querySelector("body");
const iconMenuOpen = document.querySelector(".fa-bars");
const iconMenuClose = document.querySelector(".fa-times");
iconMenuOpen.addEventListener('click', desplegarMenu);
iconMenuClose.addEventListener('click', desplegarMenu);

//Slider
const botonPrev = document.querySelector(".slider-banner__button--prev");
const botonNext = document.querySelector(".slider-banner__button--next");
const contentBanner = document.querySelectorAll(".banner");
const indicatorBanner = document.querySelectorAll(".slider-banner__indicator-item");
configSlider.numeroBanners = contentBanner.length;
//Solo mostramos el carrusel si tiene más de un banner
if (configSlider.numeroBanners > 1) {
    configurarBanner();
    botonPrev.addEventListener("click", (event) =>{       
        event.preventDefault();    
        mostrarNuevoBanner(botonesSlider[0]);
    });
    botonNext.addEventListener("click", (event) =>{       
        event.preventDefault();    
        mostrarNuevoBanner(botonesSlider[1]);
    });
    //Motrar banners en el slider automáticamente
    setInterval(()=> {        
        mostrarNuevoBanner(botonesSlider[1]);
    }, configSlider.tiempoBanner);
} else {
    botonPrev.style.display = 'none';
    botonNext.style.display = 'none';
    indicatorBanner.forEach(item => item.style.display = 'none')
}


