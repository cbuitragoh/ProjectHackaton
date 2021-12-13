import { post } from '../javascript/CRUD.mjs';

const loginForm = document.getElementById('form-login');
const loginFail = document.getElementsByClassName('login-fail')
const loginSuccess = document.getElementsByClassName('login-success')

loginForm.addEventListener('submit', async ($event) => {
    $event.preventDefault();
    await login().then((data) => {
            if (data.status === 200) {
                loginSuccess[0].style.display = 'block'
                window.location('home');
            } else {
                loginFail[0].style.display = 'block';
            }
        });
        
})

async function login() {
    const formElements = document.getElementById('form-login').elements;
    const url = '/API/login';
    
    const credentials = {
         username: formElements[0].value ,
         contrasena: formElements[1].value,
    }
    
    return await post(url, credentials);
 
}