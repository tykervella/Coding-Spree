const createFormHandler = async (event) => {
    // prevents the default action when we click on login buttin 
    event.preventDefault();
  
    // grabs form data from our login and password fields and trims it and formats into something we can use 
    const title = document.querySelector('.post-title').value.trim();
    const content = document.querySelector('.post-content').value.trim();
    var user_id = sessionStorage.getItem('user_id')



    if (title && content && user_id) {
      // makes an api post request to user/login with the inputted data and checks to see if it matches the response. if so it directs the user to the homepage. otherwise the user gets an error. 
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // if response ok, gets user_id to save in session storage and sends user back to their dash
      if (response.ok) {
      
        document.location.replace('/dash');
      } else {
        alert('Failed to post');
      }
    }
  };
  
  document
    .querySelector('.create-post')
    .addEventListener('submit', createFormHandler);
  