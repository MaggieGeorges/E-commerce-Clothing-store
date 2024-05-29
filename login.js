document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const closeButton = document.querySelector('.close-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            console.log('Login form submitted');
            console.log('Username:', username);
            console.log('Password:', password);

            // Validate input fields
            if (username === '') {
                alert('Username is required.');
                return;
            }

            if (password === '') {
                alert('Password is required.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
                const users = await response.json();

                if (users.length > 0) {
                    const user = users[0];
                    console.log('User authenticated:', user);

                    // Save user data in localStorage
                    localStorage.setItem('userDetails', JSON.stringify(user));

                    window.location.href = 'index.html';
                } else {
                    alert('Invalid username or password.');
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred while logging in. Please try again later.');
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('X button clicked');
            window.location.href = 'index.html';
        });
    }
});
