import { post } from '../javascript/CRUD.mjs';

const registerForm = document.getElementById('register-form');
const registerFail = document.getElementsByClassName('register-fail')
const registerSuccess = document.getElementsByClassName('register-success')

registerForm.addEventListener('submit', async ($event) => {
    $event.preventDefault();
    await register().then((data) => {
            if (data.status === 200) {
                registerSuccess[0].style.display = 'block';

                window.location.href = "/login";
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
        talent: path[2] === 'talentoso' ? formElements[3].value : null
    }
    
    return await post(url, credentials);
 
}