document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');
  
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;
    if (!name || !email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    
    if (!terms) {
      alert('You must agree to the terms and conditions');
      return;
    }
    const user = {
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    console.log('User signed up:', user);
    alert('Account created successfully! Redirecting to dashboard...');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  });
  document.querySelector('.google-btn').addEventListener('click', function() {
    console.log('Google sign-in clicked');
    alert('Google sign-in would be implemented here');
  });
});