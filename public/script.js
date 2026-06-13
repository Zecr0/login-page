let isLoginMode = true;

const form = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const toggleLink = document.getElementById('toggleLink');
const messageDiv = document.getElementById('message');
const formTitle = document.querySelector('h1');
const toggleText = document.querySelector('.toggle-text');
const userInfo = document.getElementById('userInfo');
const userEmail = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('authToken');
  const email = localStorage.getItem('userEmail');
  if (token && email) {
    showUserInfo(email);
  }
});

// Toggle between login and signup
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isLoginMode = !isLoginMode;
  updateFormMode();
});

function updateFormMode() {
  if (isLoginMode) {
    formTitle.textContent = 'Login';
    submitBtn.textContent = 'Login';
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign up</a>`;
  } else {
    formTitle.textContent = 'Sign Up';
    submitBtn.textContent = 'Sign Up';
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Login</a>`;
  }
  document.getElementById('toggleLink').addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    updateFormMode();
  });
  clearMessages();
}

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage('All fields required', 'error');
    return;
  }

  if (password.length < 6) {
    showMessage('Password must be at least 6 characters', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Loading...';

  try {
    const endpoint = isLoginMode ? '/api/login' : '/api/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      showMessage(data.error || 'Something went wrong', 'error');
      return;
    }

    showMessage(data.message, 'success');

    if (isLoginMode && data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', email);
      setTimeout(() => {
        showUserInfo(email);
      }, 1000);
    } else if (!isLoginMode) {
      setTimeout(() => {
        isLoginMode = true;
        updateFormMode();
        form.reset();
      }, 1500);
    }
  } catch (error) {
    showMessage('Network error', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = isLoginMode ? 'Login' : 'Sign Up';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  hideUserInfo();
  form.reset();
  isLoginMode = true;
  updateFormMode();
});

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
}

function clearMessages() {
  messageDiv.className = 'message';
  messageDiv.textContent = '';
}

function showUserInfo(email) {
  form.style.display = 'none';
  toggleText.style.display = 'none';
  userEmail.textContent = email;
  userInfo.style.display = 'block';
  formTitle.textContent = 'Dashboard';
}

function hideUserInfo() {
  form.style.display = 'block';
  toggleText.style.display = 'block';
  userInfo.style.display = 'none';
  formTitle.textContent = 'Login';
}
