let loginButton = document.querySelector(".loginButton");

const loginAPI = 'http://localhost:3000/api/login';

loginButton.addEventListener("click", () => {
    fetch(loginAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        alert('Login successfully!');
        window.location.href = '/';
        return response.json();
    }) 
    .catch((error) => {
        console.error('Error:', error);
    })
});