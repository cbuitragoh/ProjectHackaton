
const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profilePhone = document.getElementById('profile-phone');
const profileCompany = document.getElementById('profile-company');
const profileTitle = document.getElementById('profile-title');
const profileTags = document.getElementById('profile-tags');

let currentUser;

(() => {
    currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));


    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;
    profilePhone.textContent = currentUser.phone;
    profileCompany.textContent = currentUser.company ? currentUser.company : currentUser.talent;
    profileTitle.textContent = currentUser.company ? "GESTOR DEL TALENTO" : "TALENTOSO";
    profileImage.innerHTML = currentUser.profileImage ? currentUser.profileImage : "<i class='icon-badge'></i>"
    if (currentUser.tags.length) {
        currentUser.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.setAttribute('class','tag');
            tagElement.textContent = tag;
            profileTags.appendChild(tagElement)
        });
    }

})();