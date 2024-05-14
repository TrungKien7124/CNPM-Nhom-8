let loginButton = document.querySelector(".loginButton");

const loginAPI = 'http://localhost:3000/api/login';
const logoutAPI = 'http://localhost:3000/api/logout';

loginButton.addEventListener("click", () => {
    fetch(loginAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {

        // Thong bao ra man hinh
        alert('Login successfully!');

        // Chuyen huong sang home page
        window.location.href = '/';
        return response.json();
    }) 
    .catch((error) => {
        console.error('Error:', error);
    })
});