import { post } from '../javascript/CRUD.mjs';
import { validateFormGestor, checkName, checkCompany, checkEmail, checkPhone, checkContrasena, checkTags} from './register-gestor/formGestor.mjs';
import { checkTalent } from './register-talentoso/formTalentoso.mjs';

const registerForm = document.getElementById('register-form');
const registerFail = document.getElementsByClassName('register-fail');
const registerSuccess = document.getElementsByClassName('register-success');

registerForm[0].addEventListener('input', () => {
    checkName(registerForm[0].value);
})

registerForm[1].addEventListener('input', () => {
    checkEmail(registerForm[1].value);
})

registerForm[2].addEventListener('input', () => {
    checkPhone(registerForm[2].value);
})

registerForm[3].addEventListener('input', () => {
    if(registerForm.id=='company'){
        checkCompany(registerForm[3].value);
    }else{
        checkTalent(registerForm[3].value);
    }
})

registerForm[4].addEventListener('input', () => {
    checkContrasena(registerForm[4].value);
})

registerForm[5].addEventListener('input', () => {
    checkTags(registerForm[5].value);
})

registerForm.addEventListener('submit', async ($event) => {
    $event.preventDefault();
    await register().then((data) => {
            if (data.status === 200) {
                registerSuccess[0].style.display = 'block';

                window.location.href = "/";
            } else {
                registerFail[0].style.display = 'block';
                setTimeout(() => {
                    registerFail[0].style.display = 'none'
                }, 2000);
            }
        });
        
})

async function register() {
    const formElements = document.getElementById('register-form').elements;
    const url = '/API/register';
    const path = window.location.pathname.split('/');
    
    let credentials = {
         name: formElements[0].value ,
         email: formElements[1].value,
         phone: formElements[2].value,
         password: formElements[4].value,
         tags: formElements[5].value
    }

    credentials = {
        ...credentials,
        company: path[2] === 'gestor' ? formElements[3].value : null,
        talent: path[2] === 'talentoso' ? formElements[3].value : null,
        description: formElements[6] ? formElements[6].value : null
    }
    
    return await post(url, credentials);
 
}