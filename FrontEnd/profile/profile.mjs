import { sendImage } from '../javascript/cloudinary.mjs';
import { put } from '../javascript/CRUD.mjs';

const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profilePhone = document.getElementById('profile-phone');
const profileCompany = document.getElementById('profile-company');
const profileTitle = document.getElementById('profile-title');
const profileTags = document.getElementById('profile-tags');
const profileDescription = document.getElementById('profile-description');
const fileInput = document.getElementById('fileInput');


let currentUser;

(() => {
    currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));


    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;
    profilePhone.textContent = currentUser.phone;
    profileCompany.textContent = currentUser.company ? currentUser.company : currentUser.talent;
    profileTitle.textContent = currentUser.company ? "GESTOR DEL TALENTO" : "TALENTOSO";
    profileImage.innerHTML = currentUser.profileUrl ?  `<img width="250px" src="${currentUser.profileUrl}">` : "<i class='icon-badge'></i>"
    profileDescription.innerHTML = currentUser.description
    if (currentUser.tags.length) {
        currentUser.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.setAttribute('class','tag');
            tagElement.textContent = tag;
            profileTags.appendChild(tagElement)
        });
    }

})();

profileImage.addEventListener('click', () => {
    fileInput.click();
})

fileInput.addEventListener('change', async ($event) => {
    const files = fileInput.files;

    if (files && files.length && files[0]) {

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = (e) => {
            const fileInfo = {
                fileName: files[0].name,
                file: files[0]
            }
            sendImage(`evidences/${currentUser._id}`, fileInfo).then(async(data) => {

                if (data.status === 200) {
                    data.json().then((response) => {
                        setImage(response.url).then((dataUrl) => {
                            if(dataUrl.status === 200) {
                                getUser();
                            }
                        })
                    })
                }
            });
        };
    }
})

async function setImage(urlImage) {
    const url = `/API/register/${currentUser._id}`;

    return put(url, {profileUrl: urlImage})
}


async function getUser() {
    const userId = window.location.pathname.split("/");
    const url = `/API/register/${userId[3]}`
    get(url).then((data) => {
        if (data.status === 200) {
            data.json().then((user) => {
                localStorage.setItem('CURRENT_USER', user)
                location.reload();
            })
        }
    })
}