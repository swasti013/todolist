function handleFormSubmit(event) {
    event.preventDefault();
  
    const taskDetails = {
      todo : event.target.todo.value,
      desc : event.target.desc.value,
    };
    if (taskId) {
        axios
          .delete(`https://crudcrud.com/api/6773e6e58f7b4edeaeffd0c45b0a17a6/task/${taskId}`)
          .then(() => {
            return axios.post("https://crudcrud.com/api/6773e6e58f7b4edeaeffd0c45b0a17a6/task", taskDetails);
          })
          .then((response) => {
            displayTaskOnScreen(response.data); 
          })
          .catch((error) => console.error(error));
      } else {
        
        axios
          .post("https://crudcrud.com/api/6773e6e58f7b4edeaeffd0c45b0a17a6/task", taskDetails)
          .then((response) => displayTaskOnScreen(response.data))
          .catch((error) => console.error(error));
      }
      document.getElementById("todo").value = "";
      document.getElementById("desc").value = "";
}
function displayTaskOnScreen(taskDetails) {
    const taskItem = document.createElement("li");
    taskItem.appendChild(
      document.createTextNode(
        `${taskDetails.todo}: ${taskDetails.desc}`
      )
    );
  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  taskItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  taskItem.appendChild(editBtn);

  const taskList = document.querySelector("ul");
  taskList.appendChild(taskItem);
  
  deleteBtn.addEventListener("click", function (event) {
    axios
      .delete(`https://crudcrud.com/api/6773e6e58f7b4edeaeffd0c45b0a17a6/task/${taskDetails._id}`)
      .then(() => {
        taskList.removeChild(event.target.parentElement);
      })
      .catch((error) => console.error(error));
  });

  editBtn.addEventListener("click", function (event) {
    taskList.removeChild(event.target.parentElement);
    document.getElementById("todo").value = taskDetails.todo;
    document.getElementById("desc").value = taskDetails.desc;
    taskId = taskDetails._id; 
  });
}
function loadTasks() {
    axios
      .get("https://crudcrud.com/api/6773e6e58f7b4edeaeffd0c45b0a17a6/task")
      .then((response) => {
        response.data.forEach((task) => displayTaskOnScreen(task));
      })
      .catch((error) => console.error(error));
  }
  let taskId = null;



