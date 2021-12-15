import { post, get } from '../javascript/CRUD.mjs';

const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const projectContainer = document.getElementById('project-container');
let currentUser;

(() => {
    const userId = window.location.pathname.split("/")[3];
    currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    if (currentUser._id !== userId) {
        window.location.href = "/";
    }

    profileName.textContent = currentUser.name;
    profileImage.innerHTML = currentUser.profileUrl ?  `<img width="250px" src="${currentUser.profileUrl}">` : "<i class='icon-badge'></i>"
    
    if(currentUser.talent) {
        getProjectsByTalent()
    } else {
        getTalentosos()
    }
})();

async function getProjectsByTalent() {
    
    const url = `/API/project/talent/${currentUser.talent}`;

    await get(url).then((data) => {
        if(data.status === 200) {
            data.json().then((projects) => {
                projectContainer.innerHTML = '';

                projects.forEach((project) => {
                    project.profiles = project.profiles.map((profile) => `<li>${profile.name}</li>`)
                    projectContainer.innerHTML += `<div class="project-item">
                            <div class="project-name">${project.name}</div>
                            <div class="project-description">${project.description}</div>
                            <span>Perfiles</span>
                            <hr>
                            <ul class="project-profile">
                                ${project.profiles}
                            </ul>
                        </div>`
                })
            })
        }
    })
}

async function getTalentosos() {
    
    const url = `/API/register/tags/${currentUser.tags.join(",")}`;

    await get(url).then((data) => {
        if(data.status === 200) {
            data.json().then((talentosos) => {
                projectContainer.innerHTML = '';

                talentosos.forEach((talentoso) => {
                    projectContainer.innerHTML += `<div class="project-item" id="item_${talentoso._id}"">
                            <div class="project-name">${talentoso.name}</div>
                            <div class="project-description">${talentoso.description}</div>
                            <hr>
                            <div>${talentoso.talent}</div>
                        </div>`
                })
            })
        }
    })

}

projectContainer.addEventListener('click', (event) => {
    const eventPath = event.composedPath().filter((path) => path && path.id && path.id.includes('item_'));
    window.location.href = `/talentoso/${eventPath[0].id.split("item_")[1]}`;
})