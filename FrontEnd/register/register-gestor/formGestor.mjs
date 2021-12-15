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

  // validación nombre

  export function checkName(valor){

    const passregex = /[a-zA-Z\t\h]+|(^$)/;
    const nameError = document.querySelector("#nameError");

    if (!valor) {
        nameError.textContent = "El campo nombre no puede estar vacío.";
        document.getElementById("name").focus();
        return false;
      }
    
      nameError.textContent = valor.match(passregex) ? "" : "El campo nombre sólo recibe letras"
      return valor.match(passregex) ? true : false;

  }

  // validación teléfono

  export function checkPhone(valor){

    const passregex = /^[0-9,$]*$/;
    const phoneError = document.querySelector("#phoneError");

    if (!valor) {
        phoneError.textContent = "El campo teléfono no puede estar vacío.";
        document.getElementById("phone").focus();
        return false;
      }
    
      phoneError.textContent = valor.match(passregex) ? "" : "El campo teléfono sólo recibe números"
      return valor.match(passregex) ? true : false;
    
    }
  
  //validación nombre de empresa

  export function checkCompany(valor){

    const passregex = /[a-zA-Z\t\h]+|(^$)/;
    const companyError = document.querySelector("#companyError");

    if (!valor) {
        companyError.textContent = "El campo nombre de empresa no puede estar vacío.";
        document.getElementById("company").focus();
        return false;
      }
    
      companyError.textContent = valor.match(passregex) ? "" : "El campo nombre de empresa sólo recibe letras o números"
      return valor.match(passregex) ? true : false;

  }

   //validación tags

   export function checkTags(valor){

    const passregex = /[a-zA-Z\t\h\0-9]+|(^$)/;
    const tagsError = document.querySelector("#tagsError");

    if (!valor) {
        tagsError.textContent = "Escribe por lo menos un interés o tag.";
        document.getElementById("tags").focus();
        return false;
      }
    
      tagsError.textContent = valor.match(passregex) ? "" : "El campo sólo recibe letras o números"
      return valor.match(passregex) ? true : false;

  }

  //validación completa del formulario gestor

  export function validateFormGestor() {
    const formElements = document.getElementById('register-form').elements
    const validation = checkName(formElements[0].value) && 
                    checkEmail(formElements[1].value) && 
                    checkPhone(formElements[2].value) &&
                    checkCompany(formElements[3].value) &&
                    checkContrasena(formElements[4].value) &&
                    checkTags(formElements[5].value);

    return validation;
  
  }