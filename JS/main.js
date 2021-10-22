function deleteTodo(id) {
  fetch(`https://api-tch-todoapp.herokuapp.com/api/delete-todo/${id}`, {
    method: "DELETE"
  }).then(data => {
    return data.json();
  })
    .then(response => {
      confirm(response.message);
      location.reload();
    })
}

const updateTodo = (id) => {
  let myForm = document.getElementById('editTodo');
  let formData = new FormData(myForm);
  const title = formData.get('title');
  const description = formData.get('description');
  fetch(`https://api-tch-todoapp.herokuapp.com/api/update-todo/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ "title": title, "description": description })
  }).then(data => {
    return data.json();
  })
    .then(response => {
      confirm(response.message);
      location.reload();
    })
}

const fetchData = () => {
  fetch('https://api-tch-todoapp.herokuapp.com/api/fetch-todos')
    .then(data => {
      return data.json();
    })
    .then(todos => {
      for (const key in todos) {
        if (Object.hasOwnProperty.call(todos, key)) {
          const todo = todos[key];
          const html = `
          <div class="card my-2">
            <div class="card-header">
              Added On: ${todo.datetime}
            </div>
            <div class="card-body">
              <div class="d-flex">
                <h5 class="card-title">${todo.title}</h5>
                <img src="SVG/pencil.svg" class="mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Edit Todo</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form id="editTodo">
                          <h6>Existing Title: ${todo.title}</h6>
                          <h6>Existing Description: ${todo.description}</h6>
                          <div class="mb-3">
                            <label for="title" class="form-label">New Title</label>
                            <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp">
                          </div>
                          <div class="mb-3">
                            <label for="description" class="form-label">New Description</label>
                            <input type="text" class="form-control" id="description" name="description">
                          </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateTodo(${todo.sno})">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                <img src="SVG/trash.svg" class="mx-1" onclick="deleteTodo(${todo.sno})">
              </div>
              <p class="card-text">${todo.description}</p>
            </div>
          </div>
          `;
          document.getElementById('allTodos').innerHTML += html;
        }
      }
    });
}

fetchData();