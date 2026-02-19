document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;

            if (password !== password2) {
                alert('Passwords do not match.');
                return;
            }

            const user = {
                name,
                email,
                password
            };

            localStorage.setItem('user', JSON.stringify(user));
            alert('You have successfully registered. Please login.');
            window.location.href = 'login.html';
        });
    }
});