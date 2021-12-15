import { sendImage } from '../javascript/cloudinary.mjs';
import { post, get } from '../javascript/CRUD.mjs';

const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const buttonProject = document.getElementById('button-project');
const profileAccessHome = document.getElementById('profile-access-home');
const fileInput = document.getElementById('fileInput');
const projectContainer = document.getElementById('project-container');

let currentUser;
const profiles = [];

(() => {
    currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    profileName.textContent = currentUser.name;
    profileImage.innerHTML = currentUser.profileUrl ?  `<img width="250px" src="${currentUser.profileUrl}">` : "<i class='icon-badge'></i>"
    profileAccessHome.innerHTML = `<a href="/home/${currentUser.company ? `gestor/${currentUser._id}` : `talentoso/${currentUser._id}`}">Home</a>`
    getEvidencesByUser();
})();


buttonProject.addEventListener('click', () => {
    fileInput.click();
});

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
                        handleEvidence(response.url, files[0].type).then((evidenceData) => {
                            if (evidenceData.status === 200 ) {
                                location.reload();
                            }
                        })
                    })
                }
            });
        };
    }
})


async function handleEvidence(url, type) {
    const urlApi = '/API/evidence';
    const evidenceInfo  = {
        url,
        user: currentUser._id,
        type
    }

    return post(urlApi, evidenceInfo);
}

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

