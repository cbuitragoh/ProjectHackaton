import { checkEmail, checkContrasena, validateForm } from './form.mjs';
import { post } from '../javascript/CRUD.mjs';

const loginForm = document.getElementById('form-login');
const loginFail = document.getElementsByClassName('login-fail');
const loginSuccess = document.getElementsByClassName('login-success');
const userEmail = document.getElementById('email');
const userContrasena = document.getElementById('contrasena');


userEmail.addEventListener('input', () => {
    checkEmail(userEmail.value);
})

userContrasena.addEventListener('input', () => {
    checkContrasena(userContrasena.value);
})



loginForm.addEventListener('submit', async ($event) => {
    $event.preventDefault();
    if(validateForm()){
        await login().then((data) => {
            if (data.status === 200) {
                loginSuccess[0].style.display = 'block'
                data.json().then((user) => {
                    localStorage.setItem("CURRENT_USER", JSON.stringify(user));
                    window.location.href = user.company ? `/home/gestor/${user._id}` :  `/home/talentoso/${user._id}` ;
                })
            } else {
                loginFail[0].style.display = 'block';
            }
        });
        
    }
    
})

async function login() {
    const formElements = document.getElementById('form-login').elements;
    const url = '/API/login';
    

    const credentials = {
         email: formElements[0].value ,
         password: formElements[1].value,
    }
    
    return await post(url, credentials);
 
}

