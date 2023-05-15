const signupFormHandler = async (event) => {
    // prevents the default action when we click on login buttin 
    event.preventDefault();
  
    // grabs form data from our email, username and password fields and trims it and formats into something we can use 
    const email = document.querySelector('#email-signup').value.trim();
    const name = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const password_check = document.querySelector('#password-check').value.trim();
  
    if (!email || !name || !password || !password_check) {
        alert('Please enter all fields.')
    } else {
        if (password === password_check) {

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert('Failed to signup');
        }
        } else {
            alert('Passwords must match!')
        }
      }
    }
      
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  