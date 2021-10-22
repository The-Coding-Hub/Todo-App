const addTodo = () => {
  let myForm = document.getElementById('addTodo');
  let formData = new FormData(myForm);
  const title = formData.get('title');
  const description = formData.get('description');
  console.log(title, description);
  fetch("https://api-tch-todoapp.herokuapp.com/api/add-todo", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ "title": title, "description": description })
  }).then(data => {
    return data.json();
  })
    .then(response => {
      confirm(response.message);
    })
}