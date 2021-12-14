import { checkContrasena, checkEmail, checkPhone, checkName, checkTags } from "../register-gestor/formGestor.mjs";

//validación tags

export function checkTalent(valor){

    const passregex = /[a-zA-Z\t\h]+|(^$)/;
    const talentError = document.querySelector("#talentError");

    if (!valor) {
        talentError.textContent = "El campo talento no puede estar vacío";
        document.getElementById("talent").focus();
        return false;
      }
    
      talentError.textContent = valor.match(passregex) ? "" : "El campo sólo recibe letras o números"
      return valor.match(passregex) ? true : false;

  }

  //validación completa del formulario talentoso

  export function validateFormTalentoso() {
    const formElements = document.getElementById('register-form').elements
    const validation = checkName(formElements[0].value) && 
                    checkEmail(formElements[1].value) && 
                    checkPhone(formElements[2].value) &&
                    checkTalent(formElements[3].value) &&
                    checkContrasena(formElements[4].value) &&
                    checkTags(formElements[5].value);

    return validation;
  
  }