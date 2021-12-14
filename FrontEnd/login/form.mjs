//validación email

export function checkEmail(valor) {
 
    let regxp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const emailError = document.querySelector("#emailError");
  
    if (valor) {
      if (regxp.test(valor) == true) {
        emailError.textContent = "";
        return true;
      } else {
        emailError.textContent =  "Ingrese un correo de tipo válido";
        document.getElementById("email").focus();
        return false;
      }
    } else {
      emailError.textContent = "El campo username no puede estar vacío.";
      document.getElementById("email").focus();
      return false;
    }
  }
  
  //Validación Contraseña
  
  export function checkContrasena(valor) {
    const passregex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    const contrasenaError = document.querySelector("#contrasenaError");
  
    if (!valor) {
      contrasenaError.textContent = "El campo contraseña no puede estar vacío.";
      document.getElementById("contrasena").focus();
      return false;
    }
  
    contrasenaError.textContent = valor.match(passregex) ? "" : "La contraseña debe contener almenos una letra mayúscula, una minúscula, un número y con una longitud mayor o igual a 8 dígitos"
    return valor.match(passregex) ? true : false;
  }

  //validación completa del formulario

  export function validateForm() {
    const formElements = document.getElementById('form-login').elements
    const validation = checkEmail(formElements[0].value) && checkContrasena(formElements[1].value);
    return validation;
  }