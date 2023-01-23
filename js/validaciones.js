// esta funcion se manda a llamar cada ves que el usuario sale del campo que estaba rellenando
export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");//remueve la clase
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else{
        input.parentElement.classList.add("input-container--invalid");//Agrega la clase
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    };
};

const tipoDeErrore =[
    "valueMissing",
    "typeMissmatch",
    "patterMismatch",
    "customerror",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo email no puede estar vacio",
        typeMissmatch: "El formato correo no es valido",
    },
    password: {
        valueMissing: "El campo password no puede estar vacio",
        pattermMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },

    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacio",
        customerror: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo N° de telefono no puede estar vacio",
        pattermMismatch: "El formato requerido es: +xxxxxxxxxxx"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrore.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    //Modificacion mensaje de validacion del formulario
    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFecha  <= fechaActual;
};

