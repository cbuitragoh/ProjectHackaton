import { post, get } from '../javascript/CRUD.mjs';

const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const buttonProject = document.getElementById('button-project');
const formContainer = document.getElementById('form-container');
const projectContainer = document.getElementById('project-container');
const formProfile = document.getElementById('form-profile');
const buttonProfile = document.getElementById('button-profile');
const registerForm = document.getElementById('register-form');
let currentUser;
const profiles = [];

(() => {
    currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    profileName.textContent = currentUser.name;
    profileImage.innerHTML = currentUser.profileImage ? currentUser.profileImage : "<i class='icon-badge'></i>"
    handleButtonProject();
    handleButtonProfile();
    ownProjects();
})();


function handleButtonProject() {
    buttonProject.addEventListener('click', () => {
        formContainer.style.display = 'block';
        projectContainer.style.display = 'none';
    })
}

function handleButtonProfile() {
    buttonProfile.addEventListener('click', () => {
        formProfile.style.display = 'block';
        
        const formElements = document.getElementById('register-form').elements;
        let group = {
            name: formElements[3].value,
            experience: formElements[4].value,
            location: formElements[5].value,
            compensation: formElements[6].value,
        }

        profiles.push(group);
        formElements[3].value = null;
        formElements[4].value = null;
        formElements[5].value = null;
        formElements[6].value = null;

        const profileList = document.getElementById('profile-list');

        profileList.innerHTML = "";

        profiles.slice(1).forEach((profile) => {
            profileList.innerHTML += `<div class="profile-item">
                    <div class="profile-title">
                        ${profile.name}
                    </div>
                    <div class="profile-footer">
                        <span>${profile.location}</span>
                        <span>${profile.compensation}</span>
                    </div>
                    <hr>
                    <div class="profile-description">
                        ${profile.experience}
                    </div>
                </div>`
        })
        

    })
}

registerForm.addEventListener('submit', async ($event) => {
    $event.preventDefault();
    await createProject().then((data) => {
        if (data.status === 200) {
            loginSuccess[0].style.display = 'block'
            ownProjects();
        } else {
            loginFail[0].style.display = 'block';
        }
    });
})

async function createProject() {
    const formElements = document.getElementById('register-form').elements;
    const url = '/API/project';

    const project = {
        name: formElements[0].value,
        description: formElements[1].value,
        profiles: profiles.slice(1),
        idGestor: currentUser._id
    }

    return post(url, project);
 
}

async function ownProjects() {
    const url = `/API/project/${currentUser._id}`;

    await get(url).then((data) => {
        if(data.status === 200) {
            data.json().then((projects) => {
                projectContainer.innerHTML = '';

                projects.forEach((project) => {
                    project.profiles = project.profiles.map((profile) => `<li>${profile}</li>`)
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