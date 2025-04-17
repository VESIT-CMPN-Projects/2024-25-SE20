document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form'); // Use the correct selector
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-button');
    const rememberMeCheckbox = document.getElementById('remember');

    // Initialize Google Sign-In
    window.onload = function() {
        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("g_id_signin"),
            { theme: "outline", size: "large", width: 350 }  // customization attributes
        );

        google.accounts.id.prompt(); // also display the One Tap dialog
    };

    // Handle Google Sign-In response
    function handleCredentialResponse(response) {
        console.log("Google Sign-In response:", response);

        // Verify the credential on your backend
        fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential: response.credential })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Google authentication successful:", data);

            // Store the user token (in a real app, you might use cookies or localStorage)
            localStorage.setItem('authToken', data.token);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';  // Ensure dashboard.html is in the correct directory
        })
        .catch(error => {
            console.error("Google authentication failed:", error);
            alert("Google Sign-In failed. Please try again.");
        });
    }

    // Handle form submission for regular login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simple form validation (you can add more validations if needed)
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === '' || password === '') {
            alert("Please fill in all fields.");
            return;
        }

        // Simulate a successful login process
        loginBtn.disabled = true;
        loginBtn.textContent = 'Signing in...';

        // Simulate checking credentials with the server
        setTimeout(() => {
            const rememberMe = rememberMeCheckbox.checked;
            console.log('Login successful:', { email, rememberMe });

            // Store login state (in a real app, you would get a token from your server)
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            // Redirect to dashboard
            window.location.href = 'dashboard.html';  // Redirect after successful login

            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign in';
        }, 1500);  // Simulated delay
    });
});