document.addEventListener('DOMContentLoaded', () => {
    // Forgot Password Form Logic
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const messageElement = document.getElementById('forgot-password-message');

            try {
                const response = await fetch('/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username })
                });

                const message = await response.text();

                if (response.ok) {
                    messageElement.className = 'message success';
                    messageElement.textContent = message;
                } else {
                    messageElement.className = 'message error';
                    messageElement.textContent = message || 'Failed to send reset link.';
                }
            } catch (error) {
                console.error('Error during forgot password request:', error);
                messageElement.className = 'message error';
                messageElement.textContent = 'An error occurred.';
            }
        });
    }

    // Reset Password Form Logic
    const resetPasswordForm = document.getElementById('reset-password-form');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const messageElement = document.getElementById('reset-password-message');

            if (newPassword !== confirmPassword) {
                messageElement.className = 'message error';
                messageElement.textContent = 'Passwords do not match.';
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (!token) {
                messageElement.className = 'message error';
                messageElement.textContent = 'Invalid or missing reset token.';
                return;
            }

            try {
                const response = await fetch('/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, newPassword })
                });

                const message = await response.text();

                if (response.ok) {
                    messageElement.className = 'message success';
                    messageElement.textContent = message;
                    // Optionally redirect to login page after successful reset
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 3000);
                } else {
                    messageElement.className = 'message error';
                    messageElement.textContent = message || 'Failed to reset password.';
                }
            } catch (error) {
                console.error('Error during password reset:', error);
                messageElement.className = 'message error';
                messageElement.textContent = 'An error occurred.';
            }
        });
    }
});
