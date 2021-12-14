

const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');
let currentUser;

(() => {
    const userId = window.location.pathname.split("/")[3];
    currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

    if (currentUser._id !== userId) {
        window.location.href = "/";
    }

    profileName.textContent = currentUser.name;
    profileImage.innerHTML = currentUser.profileImage ? currentUser.profileImage : "<i class='icon-badge'></i>"

})();