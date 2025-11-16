
import { v4 as uuidv4 } from 'uuid';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form')
  const tasksList = document.querySelector("#tasks-list")
  const completedTasks = document.querySelector("#completed-tasks")
  const allTasks = document.querySelector("#all-tasks")

  form.addEventListener("submit", (e) => {
    e.preventDefault();


    if (e.target.task.value != "" && e.target.task.value.length > 3) {

      const payload = {
        id: uuidv4(),
        task: e.target.task.value,
        isCompleted: false
      };


      fetch("http://localhost:3333/tasks", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(() => getTasks())
        .catch(error => console.log("Error:", error))
        .finally(() => e.target.reset());
    } else {
      alert("please type your task..")
    }
  });

  function getTasks() {
    tasksList.innerHTML = "";
    fetch("http://localhost:3333/tasks/")
      .then(response => response.json())
      .then(data => {
        data.forEach(({ id, task, isCompleted }) => {
          tasksList.innerHTML += `
            <div class="tasks-list_item">
              <label>
                <input type="checkbox" ${isCompleted ? "checked" : ""} data-id=${id}>
                <h3>${task}</h3>
              </label>
              <button class='remove' data-id=${id} >Remove</button>
            </div>
          `;
        });
        document.querySelectorAll("input[type='checkbox']").forEach(item => {
          item.addEventListener("change", (e) => {
            const id = e.target.dataset.id
            fetch(`http://localhost:3333/tasks/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isCompleted: e.target.checked
              })
            })
              .then(() => getTasks())
              .catch(e => console.log(e));
          })
        });
        document.querySelectorAll(".remove").forEach(item => {
          item.addEventListener("click", (e) => {
            const id = e.target.dataset.id

            fetch(`http://localhost:3333/tasks/${id}`, {
              method: "DELETE",
            })
              .then(() => getTasks())
              .catch(error => console.log("Error", error));
          })
        });
        allTasks.textContent = data.length;
        completedTasks.textContent = data.filter(task => task.isCompleted).length;

        const lastFive = data.slice(-5);
        const arrJSON = JSON.stringify(lastFive);
        localStorage.setItem('array-item', arrJSON);

        

      })
      .catch(error => {

        alert("Server isn't available, Showing 5 latest todos", error)

        renderLastFiveTodosFromLocalStorage(getFromLocalStorageLastFiveTodos())
      })
  }

  function getFromLocalStorageLastFiveTodos() {
    const getFromLocalStorage = localStorage.getItem("array-item")
    const lastFiveTasks = JSON.parse(getFromLocalStorage)

    console.log(lastFiveTasks)
    return lastFiveTasks;
  }

  function renderLastFiveTodosFromLocalStorage(data) {

    tasksList.innerHTML += "<h3 class='server-disabled-text' >server isn't available, Showing 5 latest Todos</h3>"

    data.forEach(({ id, task, isCompleted }) => {
      tasksList.innerHTML += `
        <div class="tasks-list_item">
            <label>
                <input type="checkbox" ${isCompleted ? "checked" : ""} data-id=${id} disabled>
            <h3>${task}</h3>
            </label>
          <button class='remove' data-id=${id} disabled >Remove</button>
        </div>
      `;
    })

    allTasks.textContent = data.length;
    completedTasks.textContent = data.filter(task => task.isCompleted).length;
  }

  getTasks();
  getFromLocalStorageLastFiveTodos()
});