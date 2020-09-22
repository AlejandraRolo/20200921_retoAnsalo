// obtener lista de usuarios para validar ingreso
const listaUsuarioStorage = localStorage.getItem("lstUsuario")=== null ? [] : JSON.parse(localStorage.getItem("lstUsuario"))
const frmLogin = document.getElementById('frmLogin')


/* INPUTS */

// correo
const inputCorreo = document.getElementById('usuarioCorreo'); // obtener todas las propiedades del control
const correoMensaje = document.getElementById('correoMensaje'); // obtener todas las propiedades del control

// clave
const inputClave = document.getElementById('usuarioPsw'); // obtener todas las propiedades del control
const claveMensaje = document.getElementById('claveMensaje'); // obtener todas las propiedades del control


frmLogin.addEventListener("submit", (e)=> {
    e.preventDefault()

    if(inputCorreo.value == ""){ insertarMensajeValidacion(inputCorreo, correoMensaje, 'Debe ingresar un Correo') }
    if(inputClave.value == ""){ insertarMensajeValidacion(inputClave, claveMensaje, 'Debe ingresar una Contraseña')}

    if(inputCorreo.value != "" && inputClave.value != ""){
        validarUsuario(inputCorreo.value, inputClave.value) ? window.location = './organizador.html' : swal("Alerta!", "Usuario no registrado. Usuario o contraseña Inválida!!", "warning");
    }else{
        swal("Alerta!", "Por favor no olvide completar todos los campos!!", "warning");
    }
})

inputCorreo.addEventListener("keydown", ()=>{
    removerMensajeValidacion(inputCorreo, correoMensaje)
})

inputClave.addEventListener("keydown", ()=>{
    removerMensajeValidacion(inputClave, claveMensaje)
})

/* Validar ingreso de usuario */
const validarUsuario = (correoInptu, claveInput)=> {
    let valOk = false;
    
    if(listaUsuarioStorage.length> 0){
        for(let i=0; i< listaUsuarioStorage.length; i++){
            if(listaUsuarioStorage[i].correo === correoInptu && listaUsuarioStorage[i].clave === claveInput){ 
                localStorage.setItem("usrRegistrado", JSON.stringify(listaUsuarioStorage[i]))
                valOk = true 
            }
        }
    }
    return valOk;
}