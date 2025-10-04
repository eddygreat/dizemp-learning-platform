// Function to handle user login
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('login-message');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            messageElement.className = 'message success';
            messageElement.textContent = data.message;
            window.location.href = 'index.html'; // Redirect to home page
        } else {
            messageElement.className = 'message error';
            messageElement.textContent = data.message || 'Login failed';
        }
    } catch (error) {
        console.error('Error during login:', error);
        messageElement.className = 'message error';
        messageElement.textContent = 'An error occurred during login.';
    }
}

// Function to handle user signup
async function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('signup-message');

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.text();

        if (response.ok) {
            messageElement.className = 'message success';
            messageElement.textContent = data;
            window.location.href = 'login.html'; // Redirect to login page after successful signup
        } else {
            messageElement.className = 'message error';
            messageElement.textContent = data || 'Signup failed';
        }
    } catch (error) {
        console.error('Error during signup:', error);
        messageElement.className = 'message error';
        messageElement.textContent = 'An error occurred during signup.';
    }
}

// Add event listeners based on the current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', handleLogin);
    }
    if (document.getElementById('signup-form')) {
        document.getElementById('signup-form').addEventListener('submit', handleSignup);
    }
});
