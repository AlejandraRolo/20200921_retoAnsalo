// obtener datos de usuario registrado
const usrRegistrado = JSON.parse(localStorage.getItem("usrRegistrado"))

// validación inicial de categorías en el localStorage
let lstCategoriaStorage = localStorage.getItem('lstCategorias')===null ? [] : JSON.parse(localStorage.getItem('lstCategorias'));

 // validación inicial de categorias vs tareas en el localStorage
let listaCategoriaTareaStorage = localStorage.getItem('lstCategoriaTarea')===null ? [] : JSON.parse(localStorage.getItem('lstCategoriaTarea'));

// obtener controles
const frmCategoria = document.getElementById("frmCategoria")
const frmTareas = document.getElementById("frmTareas")
const inputCategoria = document.getElementById("categoria")
const lstCategorias = document.getElementById('listaCategoria')
const selCategoria = document.getElementById('selCategoria')
const tablaCategoriaTarea = document.getElementById('tablaCategoriaTarea')
const teclado = document.getElementById('teclado')
const tarea = document.getElementById('tarea')

// Declarar variables
let categoriaSel = '';
let categoriaPersisitido = '';

// recuperar nombre de usuario que hace login
const usrvalido = document.getElementById('usrvalido')
usrvalido.innerHTML = `<b>${usrRegistrado.nombre}<b>`

/*  EVENTOS    */
frmCategoria.addEventListener("submit", (e) => {
    e.preventDefault()
    inputCategoria.value.length > 0 ? agregarCategoria(inputCategoria.value) : swal("Alerta!", "No olvide ingresar una Categoría!!", "warning");
})

selCategoria.addEventListener("change", (e)=> {
    categoriaPersisitido = selCategoria.value
    categoriaSel = selCategoria.value.replace(' ', '').toLowerCase()
})

teclado.addEventListener("click", (e)=>{
    const valor = e.target.textContent;
    let nuevoValor = tarea.value;

    if(e.target.textContent == "ESPACIO"){
        nuevoValor += " "
    }else if(e.target.textContent == "<--"){
        nuevoValor = (tarea.value).slice(0,(tarea.value).length-1);
    }else{
        nuevoValor += valor
    }
    tarea.value = nuevoValor;
})

frmTareas.addEventListener("submit", (e) => {
    e.preventDefault()
    const selCategoria = categoriaSel;
    const inputTarea = tarea.value;

    if(categoriaSel.length== 0 || tarea.value.length== 0) { swal("Alerta!", "No olvide seleccionar una Categoría y asociar una tarea!!", "warning"); }
    else{
        // generar objeto Categoria-Tarea
        const categoria = {
            categoria: categoriaPersisitido,
            tarea: inputTarea
        }
        agregarCategoriaTarea(categoria)
    }
})


/*  FUNCIONES    */

/* CATEGORIAS PADRE */
const renderCategorias = (valor)=>{
    let etiqueta_li = document.createElement("li");
    etiqueta_li.innerHTML = `<div>${valor}</div>`
    lstCategorias.appendChild(etiqueta_li)
    selCategoria.innerHTML += `<option>${valor}</option>`
}

const agregarCategoria = (valor)=> {
    lstCategoriaStorage.push(valor);
    localStorage.setItem('lstCategorias', JSON.stringify(lstCategoriaStorage));
    renderCategorias(valor)
    inputCategoria.value = ''
}

// cargar inicial de categorías
const cargarCategoria = ()=> {
    if(lstCategoriaStorage.length> 0){
        for(let i= 0; i< lstCategoriaStorage.length; i++){ renderCategorias(lstCategoriaStorage[i]) }
    }
}
cargarCategoria()

/* CATEGORIAS VS TAREAS */
const renderCategoriaTarea = (indice, valor)=>{
   tablaCategoriaTarea.innerHTML += `
        <tr>
            <th>${indice+1}</th>
            <td>${valor.categoria}</td>
            <td>${valor.tarea}</td>
        <tr>
        `
}

const agregarCategoriaTarea = (valor)=> {
    listaCategoriaTareaStorage.push(valor);
    localStorage.setItem('lstCategoriaTarea', JSON.stringify(listaCategoriaTareaStorage));
    renderCategoriaTarea(0, valor)
    tarea.value = ''
}

// cargar inicial de categorías
const cargarCategoriaTarea = ()=> {
    if(listaCategoriaTareaStorage.length> 0){
        for(let i= 0; i< listaCategoriaTareaStorage.length; i++){ renderCategoriaTarea(i, listaCategoriaTareaStorage[i]) }
    }
}
cargarCategoriaTarea()
