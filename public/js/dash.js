
// makes constants for delete and edit buttons on dash
    const deletebtn = document.querySelector('.deletebtn')
    const editbtn = document.querySelector('.editbtn')
  // redirects user to edit page
    editbtn.addEventListener("click", async function(event) {
        event.preventDefault()
  
        const postId = editbtn.getAttribute("data")
        document.location.replace(`/posts/edit/${postId}`)
    })
  
    // calls the delete method on the post using the data attribute to get the post ID
    deletebtn.addEventListener("click", async function(event) {
        event.preventDefault();
        const postId = deletebtn.getAttribute("data");
      
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data.message); /
            document.location.reload();

          } else {
            console.error('Error:', response.status);
          }
        } catch (err) {
          console.error('Error:', err);
        }
      });
  