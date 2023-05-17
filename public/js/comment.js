// select the post form and comment box elements
const postForm = document.querySelector('form');
const commentBox = document.querySelector('.commentbox');
var userId = sessionStorage.getItem('user_id')


// add an event listener to the form
postForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting normally

  // retrieve the post ID from the button's data attribute
  const postId = event.target.querySelector('button').getAttribute('data');

  // retrieve the comment content from the comment box
  const commentContent = commentBox.value;

  // send the comment data to the server (replace URL with your API endpoint)
  fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        post_id: postId, 
        content: commentContent,
        user_id: userId
     })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // if the comment was successfully posted, clear the comment box
    commentBox.value = '';
    location.reload();

  })
  .catch(error => {
    console.error('Error posting comment:', error);
  });
});
