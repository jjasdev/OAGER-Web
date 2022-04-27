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
 * @property {number} indice Indice correspondiente de cada elemento
 * @property {number} tiempo Tiempo que transcurre entre elemento y elemento
 */
/**
  * Configuración por defecto del slider de banners
  * @type {Slider}
  */
    const configSliderBanners = {
        indice: 0,
        tiempo: 8000
    }
  /**
  * Array con los botones para avanzar en la muestra de banners en el slider
  * @type {Array}
  */
   let botonesSlider = [ "anterior", "siguiente" ];
   /**
  * Array con los botones para avanzar en la muestra de banners en el slider
  * @type {Array}
  */
    let typesAvisos = [ "noticia", "aviso" ];
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
  * Comprueba si existe un nodo
  * @param {Element} data Nodo del DOM
  * @returns {boolean}
  */
function exists(data){
    if (data !== null && data !== undefined){
      return true;    
    }else{
        return false;
    }
  }
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
    const nodoYear = document.querySelector(".footer__copy-year");
    let horas = rellenarCeros(today.getHours(), longitudCifra);
    let minutos = rellenarCeros(today.getMinutes(), longitudCifra);
    let diaSemana = weekDaysNames[today.getDay()];
    const hour = horas + ':' + minutos;    
    const getDia = rellenarCeros(today.getDate(), longitudCifra);
    const day = `${diaSemana}, ${getDia} de ${monthNames[today.getMonth()]} de ${today.getFullYear()}`;
    
    nodoHora.innerHTML = hour;  
    nodoDia.innerHTML = day; 
    nodoYear.innerHTML = today.getFullYear();
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
        menuNavIconOpen.parentNode.classList.add('main-nav__icon--close');
        body.style.overflow = 'hidden';
        if (responsive) {
            menuSearch.classList.add('main-nav__search--open');
        } else {
            menuSearch.classList.add('main-nav__search--hide');
        }

        showMenu = true;
    } else {
        slider.classList.remove('slider-menu--open');
        mainNav.classList.remove('main-nav--open');
        mainNavMenu.classList.remove('main-nav__menu--open');
        menuNavIconClose.parentNode.classList.remove('main-nav__icon--open');
        menuNavIconClose.parentNode.classList.add('main-nav__icon--close');
        menuNavIconClose.parentNode.classList.remove('main-nav__icon--big');
        menuNavIconOpen.parentNode.classList.remove('main-nav__icon--close');
        body.style.overflow = 'auto';
        if (responsive) {
            menuSearch.classList.remove('main-nav__search--open');
        } else {
            menuSearch.classList.remove('main-nav__search--hide');
        }

        showMenu = false;
    }    
}
/**
  * Muestra por defecto el elemento que hemos establecido en la configuración y le asocia su indicador
  * @param {NodeList} nodosElemento Contenedores que alojan los elementos
  * @param {number} elementoInicial Índice del elemento a mostrar inicialmente
  * @param {Node} nodoIndicador Contenedor que aloja los indicadores
  * @param {number} numeroElementos Número de elementos a mostrar
  * @returns {void}
  */
 function configurarSlider(nodosElemento, elementoInicial, nodoIndicador, numeroElementos){ 
     //Mostramos únicamente un banner, el resto los ocultamos
    for (let index = 0; index < numeroElementos; index++) {
        if (index !== elementoInicial) {
            nodosElemento.item(index).setAttribute('data-active', 'false');
            nodosElemento.item(index).classList.add(`${nodosElemento.item(index).className}--hide`);
        } else {
            nodosElemento.item(index).setAttribute('data-active', 'true');
        }
    }
    //Creamos los indicadores    
    crearIndicadores(nodoIndicador, numeroElementos)
}
/**
  * Crea los indicadores correspondientes y marca el inicial
  * @param {Node} nodoIndicador Contenedor que aloja los indicadores
  * @param {number} numeroElementos Número de indicadores
  * @returns {void}
  */
 function crearIndicadores(nodoIndicador, numeroElementos){ 
   //Creamos los indicadores    
   for (let indice = 0; indice < numeroElementos; indice++) {
       let indicator = document.createElement('div');
       indicator.classList.add(`${nodoIndicador.className}-item`);
       indicator.setAttribute("data-indice", String(indice));
       nodoIndicador.append(indicator);
   }    
   //Marcamos el indicador inicial
   nodoIndicador.firstElementChild.classList.add(`${nodoIndicador.className}-item--active`);
}
/**
  * Muestra un nuevo elemento en función de si se ha indicado que sea el anterior o el posterior
  * @param {string} tipoBoton Tipo de botón seleccionado (anterior o posterior)
  * @param {NodeList} nodosElemento Contenedores que alojan los elementos
  * @param {Node} nodoIndicador Contenedor que aloja los indicadores
  * @param {number} numeroElementos Número de elementos del nodo
  * @returns {void}
  */
 function mostrarNuevoElemento(tipoBoton, nodosElemento, nodoIndicador, numeroElementos){ 
    const indicators = document.querySelectorAll(`.${nodoIndicador.className}-item`);
    let indiceNuevoElemento = 0;
    let claseNodo = '';
    if (tipoBoton.includes('anterior')) {
        //Comprobamos en qué elemento nos encontramos.       
        nodosElemento.forEach((elemento, index)=> {
            if(elemento.getAttribute('data-active') === 'true') {
                claseNodo = `${nodosElemento[index].className}`;
                elemento.classList.add(`${nodosElemento[index].className}--hide`);
                elemento.setAttribute('data-active', 'false');
                indicators.item(Number(elemento.getAttribute('data-indice'))).classList.remove(`${nodoIndicador.className}-item--active`);
                //Si estamos en el primero mostramos el último y sino mostramos el anterior
                if (elemento.getAttribute('data-indice') === '0') { 
                    indiceNuevoElemento = numeroElementos - 1;                      
                } else {
                    indiceNuevoElemento = Number(elemento.getAttribute('data-indice')) - 1;
                }
            }
        });                       
    } else if (tipoBoton.includes('siguiente')) {
        //Comprobamos en qué elemento nos encontramos.       
        nodosElemento.forEach((elemento, index)=> {
            if(elemento.getAttribute('data-active') === 'true') {
                claseNodo = `${nodosElemento[index].className}`;
                elemento.classList.add(`${nodosElemento[index].className}--hide`);
                elemento.setAttribute('data-active', 'false');
                indicators.item(Number(elemento.getAttribute('data-indice'))).classList.remove(`${nodoIndicador.className}-item--active`);
                //Si estamos en el último mostramos el primero y sino mostramos el posterior
                if (elemento.getAttribute('data-indice') === String(numeroElementos - 1)) { 
                    indiceNuevoElemento = 0;                      
                } else {
                    indiceNuevoElemento = Number(elemento.getAttribute('data-indice')) + 1;
                }
            }
        });
    }
    //Activamos el nuevo elemento y marcamos el indicador corresponidente
    nodosElemento.item(indiceNuevoElemento).classList.remove(`${claseNodo}--hide`);
    nodosElemento.item(indiceNuevoElemento).setAttribute('data-active', 'true');
    indicators.item(indiceNuevoElemento).classList.add(`${nodoIndicador.className}-item--active`);
}
/**
  * Muestra diferentes avisos en función del tipo seleccionado
  * @param {NodeList} nodoAvisos Contenedor que aloja los nodos de un tipo de aviso
  * @returns {void}
  */
 function configurarAvisos(nodoAvisos){ 
    let numeroAvisos = nodoAvisos.length;
    //Solo mostramos el carrusel si tiene más de un aviso
    if (numeroAvisos > 1) {
        botonPrevAvisos.style.display = 'block';
        botonNextAvisos.style.display = 'block';
        indicatorContainerAvisos.style.display = 'flex';
        configurarSlider(nodoAvisos, 0, indicatorContainerAvisos, numeroAvisos);        
    } else {
        botonPrevAvisos.style.display = 'none';
        botonNextAvisos.style.display = 'none';
        indicatorContainerAvisos.style.display = 'none';
    }
 }
 /**
  * Oculta los nodos seleccionados
  * @param {NodeList} nodoAvisos Contenedor que aloja los nodos de un tipo de aviso
  * @returns {void}
  */
  function ocultarAvisos(nodoAvisos){ 
    nodoAvisos.forEach((elemento, index)=> {
        if (nodoAvisos[index].classList.length === 1) {
            elemento.classList.add(`${nodoAvisos[index].className}--hide`);
        }
    });
 }
 /**
  * Muestra los nodos seleccionados
  * @param {NodeList} nodoAvisos Contenedor que aloja los nodos de un tipo de aviso
  * @returns {void}
  */
  function mostrarAvisos(nodoAvisos){ 
    nodoAvisos.forEach((elemento, index)=> {
        if (nodoAvisos[index].classList.length > 1) {
            elemento.classList.remove(nodoAvisos[index].classList[1]);
        }        
    });
 }
 /**
  * Muestra la oficina en el mapa
  * @param {Node} nodoOficina Nodo correspondiente a la oficina
  * @returns {void}
  */
  function mostrarOficina(nodoOficina){ 
        let oficina = nodoOficina.getAttribute('data-item');
        oficinasMapa.forEach(item=> {
            if (item.getAttribute('data-item') === oficina) {
                item.classList.add('mapa__office--visible');
            }
        });
        markersMapa.forEach(item=> {
            if (item.getAttribute('data-item') === oficina) {
                item.classList.add('mapa__marker--visible');
            }
        });
 }
 /**
  * Oculta la oficina en el mapa
  * @param {Node} nodoOficina Nodo correspondiente a la oficina
  * @returns {void}
  */
  function ocultarOficina(nodoOficina){ 
        let oficina = nodoOficina.getAttribute('data-item');
        oficinasMapa.forEach(item=> {
            if (item.getAttribute('data-item') === oficina) {
                item.classList.remove('mapa__office--visible');
            }
        });
        markersMapa.forEach(item=> {
            if (item.getAttribute('data-item') === oficina) {
                item.classList.remove('mapa__marker--visible');
            }
        });
 }

//--CÓDIGO
//Establecer fechas y pintar horarios
establecerHora();
setInterval(()=> {        
    establecerHora();
}, 1000);
pintarHorario();

//Controlar responsive
const mediaQuery768 = window.matchMedia('(max-width: 768px)');
let responsive = false;
if (window.innerWidth < 768){
    responsive = true;
}
mediaQuery768.addEventListener('change', function() {
    let cambioPantalla = this.matches;  
    if(cambioPantalla){
        responsive = true;
    }else{
        responsive = false;
    }
}); 

//Menú de navegación
const body = document.querySelector("body");
const iconMenuOpen = document.querySelector(".fa-bars");
const iconMenuClose = document.querySelector(".fa-times");
iconMenuOpen.addEventListener('click', desplegarMenu);
iconMenuClose.addEventListener('click', desplegarMenu);

//Slider
const botonPrevSlider = document.querySelector(".slider-banner__button--anterior");
const botonNextSlider = document.querySelector(".slider-banner__button--siguiente");
const contentBanner = document.querySelectorAll(".banner");
const indicatorContainerSlider = document.querySelector(".slider-banner__indicator");
//Solo mostramos el carrusel si tiene más de un banner
if (exists(contentBanner) && exists(botonPrevSlider) && exists(botonNextSlider)){
    if (contentBanner.length > 1) {
        configurarSlider(contentBanner, configSliderBanners.indice, indicatorContainerSlider, contentBanner.length);
        botonPrevSlider.addEventListener("click", (event) =>{       
            event.preventDefault();    
            mostrarNuevoElemento(botonesSlider[0], contentBanner, indicatorContainerSlider, contentBanner.length);
        });
        botonNextSlider.addEventListener("click", (event) =>{       
            event.preventDefault();    
            mostrarNuevoElemento(botonesSlider[1], contentBanner, indicatorContainerSlider, contentBanner.length);
        });
        //Motrar banners en el slider automáticamente
        setInterval(()=> {        
            mostrarNuevoElemento(botonesSlider[1], contentBanner, indicatorContainerSlider, contentBanner.length);
        }, configSliderBanners.tiempo);
    } else {
        botonPrevSlider.style.display = 'none';
        botonNextSlider.style.display = 'none';
        indicatorContainerSlider.style.display = 'none';
    }
}

//Avisos
const avisos = document.querySelector(".avisos");
const botonPrevAvisos = document.querySelector(".avisos__button--anterior");
const botonNextAvisos = document.querySelector(".avisos__button--siguiente");
const contentNoticias = document.querySelectorAll('.avisos__notification[data-type="noticia"]');
const contentAvisos = document.querySelectorAll('.avisos__notification[data-type="aviso"]');
const indicatorContainerAvisos = document.querySelector(".avisos__indicator"); 
const tabNoticias = document.querySelector('.avisos__tabs-item[data-type="noticia"]');
const tabAvisos = document.querySelector('.avisos__tabs-item[data-type="aviso"]');

//Por defecto mostramos los avisos del tipo NOTICIA
if (exists(avisos)){
    ocultarAvisos(contentAvisos);
    configurarAvisos(contentNoticias);
    tabNoticias.addEventListener("click", () =>{        
        tabNoticias.classList.remove('avisos__tabs-item--no-active');
        tabNoticias.classList.add('avisos__tabs-item--active');
        tabAvisos.classList.add('avisos__tabs-item--no-active');
        tabAvisos.classList.remove('avisos__tabs-item--active');
        for (let i = indicatorContainerAvisos.childNodes.length - 1; i >= 0; i--) {
            indicatorContainerAvisos.removeChild(indicatorContainerAvisos.childNodes[i]);
        } 
        ocultarAvisos(contentAvisos);
        mostrarAvisos(contentNoticias);
        configurarAvisos(contentNoticias);
    });
    tabAvisos.addEventListener("click", () =>{       
        tabAvisos.classList.remove('avisos__tabs-item--no-active');
        tabAvisos.classList.add('avisos__tabs-item--active');
        tabNoticias.classList.add('avisos__tabs-item--no-active');
        tabNoticias.classList.remove('avisos__tabs-item--active');
        for (let i = indicatorContainerAvisos.childNodes.length - 1; i >= 0; i--) {
            indicatorContainerAvisos.removeChild(indicatorContainerAvisos.childNodes[i]);
        }
        ocultarAvisos(contentNoticias);
        mostrarAvisos(contentAvisos);
        configurarAvisos(contentAvisos);
    });
    avisos.addEventListener("click", (event) =>{    
        //Arrows avance 
        if(event.target.classList.contains('fa-angle-left')){
            if (event.target.parentNode.parentNode.parentNode.previousElementSibling.firstElementChild.className === 'avisos__tabs-item avisos__tabs-item--active') {
                mostrarNuevoElemento(botonesSlider[0], contentNoticias, indicatorContainerAvisos, contentNoticias.length);
            } else if (event.target.parentNode.parentNode.parentNode.previousElementSibling.firstElementChild.className === 'avisos__tabs-item avisos__tabs-item--no-active') {
                mostrarNuevoElemento(botonesSlider[0], contentAvisos, indicatorContainerAvisos, contentAvisos.length);
            }         
        }
        if(event.target.classList.contains('fa-angle-right')){
            if (event.target.parentNode.parentNode.parentNode.previousElementSibling.firstElementChild.className === 'avisos__tabs-item avisos__tabs-item--active') {
                mostrarNuevoElemento(botonesSlider[1], contentNoticias, indicatorContainerAvisos, contentNoticias.length);
            } else if (event.target.parentNode.parentNode.parentNode.previousElementSibling.firstElementChild.className === 'avisos__tabs-item avisos__tabs-item--no-active') {
                mostrarNuevoElemento(botonesSlider[1], contentAvisos, indicatorContainerAvisos, contentAvisos.length);
            }        
        }
        //Leer más
        if(event.target.classList.contains('avisos__notification-leer-mas')){
            event.preventDefault();
            event.target.previousElementSibling.classList.toggle("avisos__notification-texto--acortar");
            if(event.target.previousElementSibling.classList.contains('avisos__notification-texto--acortar')){
                event.target.innerHTML = 'Leer [+]'
            } else {
                event.target.innerHTML = 'Leer [-]'
            }
        }
    });
}

//Leer más
const texto = document.querySelectorAll('.avisos__notification-texto');
if (exists(texto)){
    texto.forEach(elemento=> {
        //Queremos limitar el número de palabras a mostrar
        let textoAviso = elemento.innerHTML;
        let numeroPalabras = textoAviso.split(" ").length;
    
        if (numeroPalabras >= 60) {
            elemento.nextElementSibling.style.display = 'block';
            elemento.classList.add('avisos__notification-texto--acortar');
        } else {
            elemento.nextElementSibling.style.display = 'none';        
        }
    });
}

//Secciones
const cards = document.querySelector('.cards');
if (exists(cards)){
    cards.addEventListener("click", (event) =>{
        if(event.target.classList.contains('cards__button')){
            event.target.nextElementSibling.nextElementSibling.classList.toggle("cards__list--visible");
            if(event.target.nextElementSibling.nextElementSibling.classList.contains('cards__list--visible')){
                event.target.innerHTML = 'Ver -'
            } else {
                event.target.innerHTML = 'Ver +'
            }
        }
    });
}

//Oficinas
const mapa = document.querySelector('.mapa__oficinas');
const oficinasMapa = document.querySelectorAll('.mapa__office');
const markersMapa = document.querySelectorAll('.mapa__marker');

if (exists(mapa)){
    mapa.addEventListener("mouseover", (event) =>{
        if( (event.target.classList.contains('mapa__oficinas-title')) || (event.target.classList.contains('mapa__oficinas-detalles'))){
            mostrarOficina(event.target.parentNode);
        }
        if( (event.target.classList.contains('mapa__oficinas-text')) || (event.target.classList.contains('mapa__oficinas-nombre'))){
            mostrarOficina(event.target.parentNode.parentNode);
        }
        if( (event.target.classList.contains('mapa__oficinas-servicio')) || (event.target.classList.contains('mapa__oficinas-barrio'))){
            mostrarOficina(event.target.parentNode.parentNode.parentNode);
        }
    });
    mapa.addEventListener("mouseout", (event) =>{
        if( (event.target.classList.contains('mapa__oficinas-title')) || (event.target.classList.contains('mapa__oficinas-detalles'))){
            ocultarOficina(event.target.parentNode);
        }
        if( (event.target.classList.contains('mapa__oficinas-text')) || (event.target.classList.contains('mapa__oficinas-nombre'))){
            ocultarOficina(event.target.parentNode.parentNode);
        }
        if( (event.target.classList.contains('mapa__oficinas-servicio')) || (event.target.classList.contains('mapa__oficinas-barrio'))){
            ocultarOficina(event.target.parentNode.parentNode.parentNode);
        }
    });
}

//Menú lateral
const menuLateralSection = document.querySelectorAll('.menu-lateral__section');

if (exists(menuLateralSection)){
    menuLateralSection.forEach(
        function(enlace) {
            enlace.addEventListener("mouseover", (event) =>{       
                enlace.nextElementSibling.style.display = 'block';
                enlace.firstElementChild.style.background = 'transparent';
                enlace.style.background = 'rgba(255, 255, 255, 0.1)';
            });            
            enlace.addEventListener("mouseout", (event) =>{       
                enlace.nextElementSibling.style.display = 'none';
                enlace.style.background = 'transparent';
            });
            enlace.nextElementSibling.addEventListener("mouseover", (event) =>{       
                enlace.nextElementSibling.style.display = 'block';
            });
            enlace.nextElementSibling.addEventListener("mouseout", (event) =>{       
                enlace.nextElementSibling.style.display = 'none';
                enlace.style.background = 'transparent';
            });
        }
    );
}






