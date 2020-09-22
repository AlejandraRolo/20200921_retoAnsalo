/* DECLARAR ARRAYS DE COMPROBACIÓN*/
const letras= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const numeros= ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
let letrasSel = []
let numerosSel = []

// obtener controles
const inputletras = document.getElementById('txtLetras')
const inputNumeros = document.getElementById('txtNumeros')
const botones = document.getElementById('botones')
const temaOscuro = document.getElementById('temaOscuro')
const temaRetro = document.getElementById('temaRetro')

// TEMAS

const contenedor = document.getElementById('contenedor-prin')
let getlocalStorageTema = localStorage.getItem("classTema")
if(getlocalStorageTema != null){
    contenedor.classList.add(getlocalStorageTema)
    getlocalStorageTema== 'dark' ? temaOscuro.checked= true : temaOscuro.checked= false
    getlocalStorageTema== 'retro' ? temaRetro.checked= true : temaRetro.checked= false
}


/*      EVENTOS DE CONTROLES    */

botones.addEventListener("click", (e)=> {
    
    const valorSel= e.target.textContent
    const valorSelSplit = valorSel.split('-')
    let idx= 0

    switch(valorSel){
        case 'reset':{
            // resetear controles y arrays
            inputletras.value= ''
            inputNumeros.value= ''
            letrasSel= []
            numerosSel= []
        }
            break;
        default:{
            if(valorSel== '' || valorSel== 'reset'){
                swal("Alerta!", "Entrada no válida.!!", "warning");
            }else{
        
                if(letrasSel.length<= 10 && numerosSel.length== 0){ idx= 1 }
                if(letrasSel.length== 10 && numerosSel.length< 10){ idx= 2 }
                
                switch(idx){
                    case 1:{
                        operarLetraNumero(letrasSel, letras, inputletras, valorSelSplit[0], "La letra " + valorSelSplit[0] + " ya ha sido digitada!!", "Antes de digitar la letra " + valorSelSplit[0] + " debe digitar la(s) letra(s) ")
                    }
                        break;
                    case 2:{
                        operarLetraNumero(numerosSel, numeros, inputNumeros, valorSelSplit[1], "El número " + valorSelSplit[1] + " ya ha sido digitado!!", "Antes de digitar el número " + valorSelSplit[1] + " debe digitar el/los número(s) ")
                    }
                        break;
                    default:
                        break;
                }
                if(letrasSel.length== 10 && numerosSel.length== 10){ swal("OK!", "Ha finalizado con éxito la inserción de letras y números!!", "success"); }
            }
        }
            break;
    }
})

/**  
 * array1: array de entrada
 * array2: array de comparación
 * input: campo de display de datos
 * valorEntrada: valor seleccionado
 * mensaje: mensaje de alerta
 * mensajevalRepetido: indica si una letra o número ya ha sido seleccionado
 * mensajeValFaltante: en caso que no se digite en el orden correcto indica que letras o números deben ir antes
 */
const operarLetraNumero = (array1, array2, input, valorEntrada, mensajevalRepetido, mensajeValFaltante)=>{
    let valLetrasNum= true
    let arrayIndiceIni= 0
    let arrayIndiceFin= 0

    // validar si el número ya fue digitado
    for(let i= 0; i< array1.length; i++){
        if(array1[i]== valorEntrada){
            swal("Alerta!", mensajevalRepetido, "warning");
            return
         }
     }

     // validar si se están digitando los numeros en el orden correcto
     array1.push(valorEntrada)
     for(let i= 0; i< array1.length; i++){
         if(array1[i]!= array2[i]){
             valLetrasNum= false;
             arrayIndiceIni= i;
         }
     }

     if(!valLetrasNum){
        array1.pop() // Eliminar último elemento del array
         for(let i= 0; i< array2.length; i++){
             if(valorEntrada== array2[i]){
                 arrayIndiceFin= i;
             }
         }
         const secunciaFaltante= array2.slice(arrayIndiceIni, arrayIndiceFin)
         swal("Alerta!", mensajeValFaltante + secunciaFaltante + " !!", "warning");
     }else{
        input.value+= valorEntrada
     }
}

temaOscuro.addEventListener("change", (e)=>{
    let estado= e.target.checked;
    estado ? cambiarTema('dark') : cambiarTema('light')
    if(temaRetro.checked){ temaRetro.checked= false }
})

temaRetro.addEventListener("change", (e)=>{
    let estado= e.target.checked;
    estado ? cambiarTema('retro') : cambiarTema('light')
    if(temaOscuro.checked){ temaOscuro.checked= false }
})

const cambiarTema= (valorClase)=>{
    // remover todas las clases de temas
    contenedor.setAttribute("class", "contenedor-prin")
    contenedor.classList.add(valorClase)

    // almacenar en localStorage el tema seleccionado
    localStorage.setItem("classTema", valorClase);
}


/* ANÁLISIS INICIAL DE VALIDACIÓN DE ARRAYS

// validar si la letra ya fue digitada
for(let i= 0; i< letrasSel.length; i++){
    if(letrasSel[i]== valorSelSplit[0]){
        swal("Alerta!", "La letra " + valorSelSplit[0] + " ya ha sido digitada!!", "warning");
        return
    }
}

// validar si se están digitando las letras en el orden correcto
letrasSel.push(valorSelSplit[0])
for(let i= 0; i< letrasSel.length; i++){
    if(letrasSel[i]!= letras[i]){
        valLetrasNum= false;
        arrayIndiceIni= i;
    }
}

if(!valLetrasNum){
    letrasSel.pop() // Eliminar último elemento del array
    for(let i= 0; i< letras.length; i++){
        if(valorSelSplit[0]== letras[i]){
            arrayIndiceFin= i;
        }
    }
    const letrasFaltantes= letras.slice(arrayIndiceIni, arrayIndiceFin)
    swal("Alerta!", "Antes de digitar la letra " + valorSelSplit[0] + " debe digitar la(s) letra(s) " + letrasFaltantes + " !!", "warning");
}else{
    inputletras.value+= valorSelSplit[0]
}*/



