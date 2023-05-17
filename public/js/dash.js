

document.addEventListener('DOMContentLoaded', () => {
    const deletebtn = document.querySelector('.deletebtn')
    const editbtn = document.querySelector('.editbtn')
  
    editbtn.addEventListener("click", async function(event) {
        event.preventDefault()
  
        const postId = editbtn.getAttribute("data")
        document.location.replace(`/posts/edit/${postId}`)
    })
  
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
            console.log(data.message); // or display the message in the UI
            document.location.reload();

          } else {
            console.error('Error:', response.status);
          }
        } catch (err) {
          console.error('Error:', err);
        }
      });
  })
  