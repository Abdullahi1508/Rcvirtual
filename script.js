// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Placeholder for future JavaScript code
    console.log("Virtual Clinic app initialized");

    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    const logoutLink = document.getElementById('logoutLink');

    // Toggle between registration and login forms
    showLogin.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('register').classList.add('hidden');
        document.getElementById('login').classList.remove('hidden');
    });

    showRegister.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('login').classList.add('hidden');
        document.getElementById('register').classList.remove('hidden');
    });

    // Handle registration form submission
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = event.target.registerName.value;
        const email = event.target.registerEmail.value;
        const password = event.target.registerPassword.value;

        if (name && email && password) {
            localStorage.setItem(email, JSON.stringify({ name, email, password }));
            alert('Registration successful');
            document.getElementById('register').classList.add('hidden');
            document.getElementById('login').classList.remove('hidden');
        } else {
            alert('Please fill out all fields');
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = event.target.loginEmail.value;
        const password = event.target.loginPassword.value;

        const user = JSON.parse(localStorage.getItem(email));

        if (user && user.password === password) {
            alert('Login successful');
            showDashboard();
        } else {
            alert('Invalid login credentials');
        }
    });

    // Handle logout
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('loggedIn');
        showAuthSection();
    });

    // Show dashboard
    function showDashboard() {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        logoutLink.classList.remove('hidden');
        localStorage.setItem('loggedIn', 'true');
    }

    // Show authentication section
    function showAuthSection() {
        document.getElementById('auth-section').classList.remove('hidden');
        document.getElementById('dashboard').classList.add('hidden');
        logoutLink.classList.add('hidden');
    }

    // Check if user is logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        showDashboard();
    } else {
        showAuthSection();
    }

    // Handle navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Show specific section
    function showSection(sectionId) {
        document.querySelectorAll('.container').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }
});
