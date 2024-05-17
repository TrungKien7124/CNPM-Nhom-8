const logoutAPI = 'http://localhost:3000/api/logout';

let dateContainer = document.querySelector('.header .left .date'),
    login_button = document.querySelector('.header .right .login-button'),
    logout_button = document.querySelector('.header .right .logout-button');

let date = new Date();

dateContainer.innerText = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
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