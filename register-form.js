// Traemos todos los elementos necesarios del DOM
const registerForm = document.getElementById('register-form');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const mailInput = document.getElementById('mail');
const contraseñaInput = document.getElementById('contraseña');

//////////////////////// FUNCIONES AUXILIARES ////////////////////////////////////

// FUNCIONES DE VALIDACION DE INPUTS // 

const checkInput = input => {
    // Seteamos la validez del value en false para empezar (las cosas arrancan sin estar, es decir, vacias)
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 28; 
}

// VALIDACION GRAL Y ALMACENAMIENTO DE DATOS //

const validateForm = () => {
    // Evitar el comportamiento por default (SIEMPRE EN LOS FORM)
    
    // Checkear que todos los inputs sean válidos

    // Si el input es válido, guardo la data 

    // Guardar en Local Storage

    // Feedback al usuario

    // Redirigir al login
};

// Funcion inicializadora para agregar los listeners a los inputs y al form

const init = () => {
    registerForm.addEventListener('submit', validateForm);
    // Validar cada campo por evento
    nombreInput.addEventListener('input', () => checkTextInput (nombreInput) );
    apellidoInput.addEventListener('input', () => checkTextInput (apellidoInput) );

} 