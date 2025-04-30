// script.js

const users = JSON.parse(sessionStorage.getItem('users')) || [];

function registerUser(event) {
  event.preventDefault();

  let fullnameInput = document.getElementById('fullname');
  let emailInput = document.getElementById('email');
  let phoneInput = document.getElementById('phone');
  let passwordInput = document.getElementById('password');
  let dobInput = document.getElementById('dob');

  let fullname = fullnameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();
  let password = passwordInput.value;
  let dob = dobInput.value;

  
  let birthDate = new Date(dob);
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDiff = today.getMonth() - birthDate.getMonth();
  let dayDiff = today.getDate() - birthDate.getDate();

  if (
    age < 18 ||
    (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
  ) {
    alert("You must be at least 18 years old to register.");
    return;
  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordPattern.test(password)) {
    alert("Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.");
    return;
  }

  users.push({ fullname, email, phone, dob, password });
  sessionStorage.setItem('users', JSON.stringify(users));

  // Clear input fields after registration
  fullnameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  passwordInput.value = "";
  dobInput.value = "";

  alert("Registration successful!");
  window.location.href = "login.html";
}

function loginUser(event) {
  event.preventDefault();

  let email = document.getElementById('loginEmail').value.trim();
  let password = document.getElementById('loginPassword').value;

  let users = JSON.parse(sessionStorage.getItem('users')) || [];
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid login credentials.");
    return;
  }

  sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  window.location.href = "profile.html";
}

function showUserDetails() {
  const user = JSON.parse(sessionStorage.getItem('loggedInUser'));

  if (!user) {
    document.body.innerHTML = "<p class='text-red-600 text-center mt-10'>No user found. Please log in.</p>";
    return;
  }

  const container = document.getElementById('profile');
  container.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Welcome, ${user.fullname}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Date of Birth:</strong> ${user.dob}</p>
    <p><strong>Password:</strong> ${user.password}</p>
  `;
}

function togglePassword(event, inputId) {
  const passwordField = document.getElementById(inputId);
  const toggleBtn = event.target;

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordField.type = "password";
    toggleBtn.textContent = "Show";
  }
}
