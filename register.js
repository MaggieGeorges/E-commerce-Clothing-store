// Regestration authentication
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const closeButton = document.querySelector('.close-btn');

  
    if (registerForm) {
      registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
  
        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
  
        console.log('Register form submitted');
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
  
        // Validate input fields
        if (username === '') {
          alert('Username is required.');
          return;
        }
  
        if (username.length < 5) {
          alert('Username must be at least 5 characters long.');
          return;
        }
  
        if (email === '') {
          alert('Email is required.');
          return;
        }
  
        if (password === '') {
          alert('Password is required.');
          return;
        }
  
        if (password.length < 8) {
          alert('Password must be at least 8 characters long.');
          return;
        }
  
        try {
          const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`);
          }
  
          const result = await response.json();
          console.log(result);
          window.location.href = 'login.html';
        } catch (error) {
          console.error('Error registering user:', error);
          alert('An error occurred while registering. Please try again later.');
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

