const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const buttonProject = document.getElementById('button-project');
const formContainer = document.getElementById('form-container');
const projectContainer = document.getElementById('project-container');
const formProfile = document.getElementById('form-profile');
const buttonProfile = document.getElementById('button-profile');
const registerForm = document.getElementById('register-form');
let currentUser;
let newProject = false;
const profiles = [];

(() => {
    currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    profileName.textContent = currentUser.name;
    profileImage.innerHTML = currentUser.profileImage ? currentUser.profileImage : "<i class='icon-badge'></i>"
    handleButtonProject();
    handleButtonProfile();
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