const logoutAPI = 'http://localhost:3000/api/logout';

let dateContainer = document.querySelector('.header .left .date'),
    login_button = document.querySelector('.header .right .login-button'),
    logout_button = document.querySelector('.header .right .logout-button');

const currentDate = new Date();
const options = { month: 'long', day: 'numeric', year: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);
const day = currentDate.getDate();
const formattedDay = addSuffix(day); 

function addSuffix(day) {
    if (day >= 11 && day <= 13) {
        return day + "th";
    }
    switch (day % 10) {
        case 1: return day + "st";
        case 2: return day + "nd";
        case 3: return day + "rd";
        default: return day + "th";
    }
}

dateContainer.textContent = formattedDate.replace(/(\d+)/, formattedDay);

login_button.addEventListener("click", function () {
    window.location.href = "/login";
});
logout_button.addEventListener("click", function () {
    fetch(logoutAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(data => {
            window.location.href = "/login";
        })
        .catch((error) => {
            console.error('Error:', error);
            reject(error);
        });
});

const dropdowns = document.querySelectorAll('.header .right .profile');
dropdowns.forEach(dropdown => {
    const profile_button = dropdown.querySelector('.profile-button')
    const menu = dropdown.querySelector('.menu')
    const options = dropdown.querySelectorAll('.selection')
    profile_button.addEventListener('click', function () {
        menu.classList.toggle('menu-open');
    });
});

options.forEach(option => {
    option.addEventListener('click', function () {
        menu.classList.remove('menu-open');
        logout_button.addEventListener("click", function () {
            fetch(logoutAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                    window.location.href = "/login";
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    });
});