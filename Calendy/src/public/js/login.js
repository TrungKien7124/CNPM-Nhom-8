
const loginAPI = 'http://localhost:3000/api/login';
const logoutAPI = 'http://localhost:3000/api/logout';



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
const registerErrorContainer = document.querySelector('.register-error');

registerButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const reenterPassword = reenterPasswordInput.value;
  const securityPassword = securityPasswordInput.value;

  // Kiểm tra dữ liệu ở phía client
  if (password !== reenterPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, securityPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      // Xóa dữ liệu trong các trường input
      usernameInput.value = '';
      passwordInput.value = '';
      reenterPasswordInput.value = '';
      securityPasswordInput.value = '';
      wrapper.classList.remove('active');
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
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





const loginForm = document.getElementById('loginForm');




loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById('login-usernameInput');
  const passwordInput = document.getElementById('login-passwordInput');

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch(loginAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('Response status:', response.status);

    if (response.ok) {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        alert(data.message);
        window.location.href = '/';
      } else {
        alert('Unexpected response from server');
      }
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while logging in');
  }
});