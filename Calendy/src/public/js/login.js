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

const wrapper = document.querySelector('.loginPage .wrapper');
const loginLink = document.querySelector('.loginPage .wrapper .login-form');
const registerLink = document.querySelector('.loginPage .wrapper .register-form');
const registerForm = document.querySelector('.loginPage .wrapper .form-box-register');
const LoginForm = document.querySelector('.loginPage .wrapper .form-box-login');
const ResetLink = document.querySelector('.loginPage .wrapper .form-box-login .forget-password a');
const ResetForm = document.querySelector('.loginPage .wrapper .form-box-reset-password');
const LoginResetLink = document.querySelector('.loginPage .wrapper .form-box-reset-password .register a');
registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

ResetLink.addEventListener('click', ()=> {
  wrapper.classList.add('reset');
});
LoginResetLink.addEventListener('click', ()=> {
  wrapper.classList.remove('reset');
});







const registerButton = document.querySelector('.register-submit-btn');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const reenterPasswordInput = document.getElementById('reenterPasswordInput');
const securityPasswordInput = document.getElementById('securityPasswordInput');

registerButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const reenterPassword = reenterPasswordInput.value;
  const securityPassword = securityPasswordInput.value;

  if (username.length < 8) {
    alert('Username phải có ít nhất 8 ký tự');
    return;
  }

  if (password.length < 6) {
    alert('Password phải có ít nhất 6 ký tự');
    return;
  }

  if (password !== reenterPassword) {
    alert('Xác nhận password không khớp');
    return;
  }

  if (securityPassword.length < 6) {
    alert('Security Password phải có ít nhất 6 ký tự');
    return;
  }

  const user = { username, password, securityPassword };

  const isUsernameExist = await fetch('/api/is-username-exist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then((response) => response.json())
    .then((data) => data.isUsernameExist)
    .catch((error) => {
      console.error('Error:', error);
      return false;
    });

  if (isUsernameExist) {
    alert('Username đã tồn tại');
    return;
  }

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      alert('Đăng ký thành công');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});



const resetSubmitBtn = resetForm.querySelector('.reset-submit-btn');
const resetFormUsername = document.getElementById('username-reset-Input');
const resetFormPassword = document.getElementById('password-reset-Input');
const resetFormReenterPassword = document.getElementById('reenterPassword-reset-Input');
const resetFormSecurityPassword = document.getElementById('securityPassword-reset-Input');

resetSubmitBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const username = resetFormUsername.value;
  const securityPassword = resetFormSecurityPassword.value;
  const password = resetFormPassword.value;
  const reenterPassword = resetFormReenterPassword.value;

  try {
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, securityPassword, password, reenterPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});