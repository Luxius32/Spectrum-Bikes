// Traemos todos los elementos necesarios del DOM
const registerForm = document.getElementById('register-form');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const mailInput = document.getElementById('mail');
const contraseñaInput = document.getElementById('contraseña');
const telefonoInput = document.getElementById('telefono');

//////////////////////// FUNCIONES AUXILIARES ////////////////////////////////////
// 

// Nos traemos los usuarios del localStorage o creamos un array vacio si no hay usuarios registrados
const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Función para guardar los usuarios en el LocalStorage 
const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Función para chequear si el campo esta vacio
const isEmpty = input => {
    // En JS el cero es un pseudo falso (falsy)
    return !input.value.trim().length;
};

// Función para determinar si el largo del value del input esta entre un minimo y un maximo de caracteres
const isBetween = (input, min, max) => {
    // Nos permite ver que los caracteres esten dentro del rango establecido
    return input.value.length >= min && input.value.length < max;
};

const showError = (input, message) => {
    // Si el input esta vacio, voy y a agarro el elemento padre del input, en este caso ".register-item" y lo guardo en registerItem.
    // Esto es poruqe debemos mostrar campo por campo donde esta el error
    const registerItem = input.parentElement;
    registerItem.classList.remove('success');
    registerItem.classList.add('error');
    const error = registerItem.querySelector('small');
    error.style.display = 'block';
    error.textContent = message;
};

const showSuccess = (input) => {
    const registerItem = input.parentElement;
    registerItem.classList.remove('error');
    registerItem.classList.add('success');
    const error = registerItem.querySelector('small');
    error.textContent = "";
}

// Función para validar una dirección de email con expresiones regulares
const isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    // testeamos
    return re.test(input.value.trim());
};

const isExistingEmail = (input) => {
    return users.some((user) => user.email === input.value.trim());
};

const isPassSecure = (input) => {
    // Lleva expresion regular
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // testeamos 
    return re.test(input.value.trim());
}

const isPhoneValid = (input) => {
    const re = /^[0-9]{10}$/;
    // testeamso
    return re.test(input.value.trim());
}

// FUNCIONES DE VALIDACION DE INPUTS // 

const checkTextInput = input => {
    // Seteamos la validez del value en false para empezar (las cosas arrancan sin estar, es decir, vacias)
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 28;
    // Si el input esta vacio 
    if (isEmpty(input)) {
        showError(input, `Este campo es obligatorio`);
        return;
    };
    // No esta entre los caracteres requeridos
    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, 'Este campo debe tener entre 3 y 28 caracteres.')
    };
    // Si pasa por ambas validaciones , llamamos a la función de éxito y le cambiamos el estado valid a true
    showSuccess(input);
    valid = true;
    return valid;
};

const checkEmail = (input) => {
    // Seteamos la validez del value en falsa   
    let valid = false;
    if (isEmpty(input)) {
        showError(input, 'El email es obligatorio.');
        return;
    }
    if (!isEmailValid(input)) {
        showError(input, 'El email no es valido.');
        return;
    }
    if (isExistingEmail(input)) {
        showError(input, 'El email ya se encuentra registrado.')
        return;
    }
    // Si pasa por todas las validaciones llamamos a la función de éxito y cambiamos la validación a true
    showSuccess(input);
    valid = true;
    // Lo retornamos para utilizarlo en otra parte
    return valid;
};

const checkPassword = (input) => {
    // Seteamos la validez del value en false
    let valid = false;
    if (isEmpty(input)) {
        showError(input, 'Debe ingresar una contraseña.');
        return;
    }
    if (!isPassSecure(input)) {
        showError(input, 'La contraseña no es válida, debe poseer al menos 8 caracteres, una mayúscula y una minúscula.');
        return;
    }
    // Si pasa por ambas validaciones llamamos a la función de exito
    showSuccess(input);
    valid = true;
    return valid;
}

const checkPhone = (input) => {
    // Seteamosla validez del value en false
    let valid = false;
    if (isEmpty(input)) {
        showError(input, 'Debe ingresar un número de teléfono.');
        return;
    }
    if (!isPhoneValid(input)) {
        showError(input, 'El teléfono no es válido.');
        return;
    }
    showSuccess(input);
    valid = true;
    return valid;
}

// VALIDACION GRAL Y ALMACENAMIENTO DE DATOS //

const validateForm = (e) => {
    // Evitar el comportamiento por default (SIEMPRE EN LOS FORM)
    e.preventDefault();
    // Guardamos el ESTADO de los inputs en variables
    // Almacenamos el valor de retorno de las funciones de validación, pero ademas se ejecutan las funciones para mostrar los msjes de error
    let isNameValid = checkTextInput(nombreInput);
    let isSurnameValid = checkTextInput(apellidoInput);
    let isEmailValid = checkEmail(mailInput);
    let isPassValid = checkPassword(contraseñaInput);
    let isPhoneValid = checkPhone(telefonoInput);

    // Checkear que todos los inputs sean válidos, un paso que nos permita guardar todo junto
    // Guardamos la valides de todos los inputs en una variable
    let isValidForm = isNameValid && isSurnameValid && isEmailValid && isPassValid && isPhoneValid;

    if (isValidForm) {
        // Guardamos todo dentro del array que creamos para guardar los usuarios
        // Armo el objeto que va a estar dentro del array
        users.push({
            name: nombreInput.value,
            lastName: apellidoInput.value,
            email: mailInput.value,
            pass: contraseñaInput.value,
            phone: telefonoInput.value
        })
        saveToLocalStorage(users);
        alert('La registración se ha realizado con éxito, te reedirigiremos a la página de logeo.');
        window.location.href = 'log.in.html'

    }
    // Si el input es válido, guardo la data 

    // Guardar en Local Storage

    // Feedback al usuario

    // Redirigir al login
};

// Funcion inicializadora para agregar los listeners a los inputs y al form

const init = () => {
    registerForm.addEventListener('submit', validateForm);
    // Validar cada campo por evento
    nombreInput.addEventListener('input', () => checkTextInput(nombreInput));
    apellidoInput.addEventListener('input', () => checkTextInput(apellidoInput));
    mailInput.addEventListener('input', () => checkEmail(mailInput));
    contraseñaInput.addEventListener('input', () => checkPassword(contraseñaInput));
    telefonoInput.addEventListener('input', () => checkPhone(telefonoInput));
};

init();    