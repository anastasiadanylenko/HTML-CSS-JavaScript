"use strict";

const form = document.querySelector(".create-task-form");
const taskInput = document.querySelector(".task-input");
const filterInput = document.querySelector(".filter-input");
const clearTasksButton = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");

document.addEventListener("DOMContentLoaded", renderTasks);
form.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTodoUpdate);
clearTasksButton.addEventListener("click", removeAllTasks);
filterInput.addEventListener("input", filterTasks);



function renderTasks() {
  taskList.innerHTML = "";
  if (localStorage.getItem("tasks")) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      const editButton = document.createElement("button");
      li.innerHTML = task.value;
      button.innerHTML = "X";
      editButton.innerHTML = "Edit";
      button.classList.add("delete-btn");
      editButton.classList.add("edit-btn");
      li.append(button);
     li.append(editButton);
     li.setAttribute('data-id', task.id);
      taskList.append(li);
    });
  }
}

function handleTodoUpdate(event){
  if (event.target.classList.contains("edit-btn")) {
            const listItem = event.target.parentElement;
            const taskId = listItem.getAttribute('data-id');
            editTask(taskId);
        }
      if (event.target.classList.contains("delete-btn")) {
        const taskId = event.target.parentElement.getAttribute('data-id');
     removeTaskItem(taskId);
      }
    }


function editTask(taskId) {
    const newTaskText = prompt("Enter the new text");
    if (newTaskText !== null && newTaskText !== "") {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
     const index = tasks.findIndex(task => task.id.toString() === taskId);
      tasks[index].value = newTaskText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
    }


function addTask(event) {
  event.preventDefault();
const currentDate = Date.now();
  const value = event.target.task.value;
  if (value.trim() === "") {
    return;
  }
  const li = document.createElement("li");
  const button = document.createElement("button");
  const editButton = document.createElement("button");
const taskId = Date.now();
  li.innerHTML = value;
  editButton.innerHTML = "Edit";
li.setAttribute('data-id', taskId);
  button.innerHTML = "X";
  button.classList.add("delete-btn");
  editButton.classList.add("edit-btn");
  li.append(button);
  li.append(editButton);
  taskList.append(li);
storeTaskInLocalStorage({id: taskId, value: value});
  taskInput.value = "";
}

function storeTaskInLocalStorage(taskValue) {
  let tasks = [];
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(taskValue);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeTaskItem(taskId) { 
   let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks = tasks.filter(task => task.id.toString() !== taskId);
localStorage.setItem("tasks", JSON.stringify(tasks));
   renderTasks();
}

function removeAllTasks() {
  localStorage.removeItem("tasks");
  renderTasks();
}

function filterTasks(event) {
  const searchQuery = event.target.value;
  const liCollection = taskList.querySelectorAll("li");
  liCollection.forEach((task) => {
    const liValue = task.firstChild.textContent;
    if (liValue.includes(searchQuery)) {
      task.style.display = "list-item";
    } else {
      task.style.display = "none";
    }
  });
}