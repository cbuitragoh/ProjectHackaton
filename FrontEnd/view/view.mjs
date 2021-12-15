import { post, get } from '../javascript/CRUD.mjs';

const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profilePhone = document.getElementById('profile-phone');
const profileCompany = document.getElementById('profile-company');
const profileTitle = document.getElementById('profile-title');
const profileTags = document.getElementById('profile-tags');
const profileDescription = document.getElementById('profile-description');
const projectContainer = document.getElementById('project-container');
const mailerIcon = document.getElementById('mailer-icon');
const mailer = document.getElementById('mailer');
const mailerForm = document.getElementById('mailer-form');

const loginSuccess = document.getElementsByClassName('login-success');
const loginFail = document.getElementsByClassName('login-fail');

let currentUser;
let currentVisitor;

(() => {
    const userId = window.location.pathname.split("/");
    currentVisitor = localStorage.getItem("CURRENT_USER");
    const url = `/API/register/${userId[2]}`
    get(url).then((data) => {
        if (data.status === 200) {
            data.json().then((user) => {
                currentUser = user;
                profileName.textContent = currentUser.name;
                profileEmail.textContent = currentUser.email;
                profilePhone.textContent = currentUser.phone;
                profileCompany.textContent = currentUser.company ? currentUser.company : currentUser.talent;
                profileTitle.textContent = currentUser.company ? "GESTOR DEL TALENTO" : "TALENTOSO";
                profileImage.innerHTML = currentUser.profileUrl ? `<img src="${currentUser.profileUrl}">` : "<i class='icon-badge'></i>"
                profileDescription.innerHTML = currentUser.description ? currentUser.description : ''
                if (currentUser.tags.length) {
                    currentUser.tags.forEach(tag => {
                        const tagElement = document.createElement('span');
                        tagElement.setAttribute('class','tag');
                        tagElement.textContent = tag;
                        profileTags.appendChild(tagElement)
                    });
                }

                if (userId[1] === 'talentoso') {
                    getEvidencesByUser();
                }
            })
        }
    })
})();

async function getEvidencesByUser() {
    const url = `/API/evidence/${currentUser._id}`;
    await get(url).then((data) => {
        if (data.status === 200) {
            data.json().then((evidences) => {
                projectContainer.innerHTML = '';

                evidences.forEach((evidence) => {
                    projectContainer.innerHTML += `<embed src="${evidence.url}" type="${evidence.type}" width="350px" height="250px" />`
                })
            })
        }
    })
}

mailerIcon.addEventListener('click', () => {
    mailer.style.display = "block";
})

mailerForm.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const url = '/API/mail'
    const formElements = mailerForm.elements;

    const mailOptions = {
        from: currentVisitor.name,
        to: [currentUser.email, currentVisitor.email],
        subject: "Me interesa tu perfil",
        text: formElements[0].value
    }

    post(url, mailOptions).then((data) => {
        if (data.status === 200) {
            loginSuccess[0].style.display = 'block';
            location.reload()
        } else {
            loginFail[0].style.display = 'block';
            setTimeout(() => {
                loginFail[0].style.display = 'none'
            }, 2000);
        }
    })
    
    

})