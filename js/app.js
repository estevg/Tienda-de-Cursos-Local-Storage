// Variables
const carrito = document.getElementById('carrito');
const cursos  = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');




// Listeners 
cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona "Agregar Carrito"
    
    cursos.addEventListener('click', comprarCursos);

    // Cuando se elemina un curso
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito BTN
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento mostrar localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}




// Funciones
function comprarCursos(e){
    e.preventDefault();

    // Delegation para agrega-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        // Aqui enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}


// Lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> 
        <img src="${curso.imagen}" width=100>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

// Eliminar carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    let curso,
        cursoid;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoid = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoid);
}

// Elimina los cursos del carrito en el Dom
function vaciarCarrito(){
    // // forma corta
    // listaCursos.innerHTML = ''; 
    // // Se coloca para que no realice un salto
    // Forma rapida y recomendada 
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

    vaciarCarritoLocalStorage();

    return false;
}

// Alamacena curso al carrito en localstorage
function guardarCursoLocalStorage(curso){
    let cursos;
    
    // Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();

    // El curso seleccionado se agrega al array
    cursos.push(curso);
    
    localStorage.setItem('cursos', JSON.stringify(cursos));
}


function obtenerCursosLocalStorage(){
    let cursosLS;

    // comprobamos si hay algo en localStorage
    if(localStorage.getItem('cursos') == null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

// Imprime los cursos del LocalStorage en el Carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> 
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `
        listaCursos.appendChild(row);   
    });

}


function eliminarCursoLocalStorage(curso){
    let cursosLS;
    // Obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    // Iteramos comparando el id del curso borrado con los del localStorage
    cursosLS.forEach(function(cursoLS, index){
       if(cursoLS.id === curso){
           cursosLS.splice(index, 1);
       }
    }); 

    localStorage.setItem('cursos', JSON.stringify(cursosLS));

}

// Vacia carrito del localStorage
function vaciarCarritoLocalStorage(){
    localStorage.clear();
}