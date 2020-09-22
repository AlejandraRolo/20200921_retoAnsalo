// establecer mensaje de validacion

let insertarMensajeValidacion = (input, span, mensaje) => {
    input.classList.add('alert');
    span.innerText = mensaje;
}

let removerMensajeValidacion = (input, span) => {
    input.classList.remove('alert');
    span.innerText = '';
}