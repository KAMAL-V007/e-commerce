document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate a successful login
            localStorage.setItem('loggedIn', 'true');
            alert('You are now logged in.');
            window.location.href = 'index.html';
        });
    }
});