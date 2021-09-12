// Define variables
const form = document.querySelector('#task-form');
const task = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#clear-tasks');
const filterBar = document.querySelector('#filter');
let tasks = setTasksArray();

// Add event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
clearBtn.addEventListener('click', clearTasks);
filterBar.addEventListener('keyup', filterTasks);

// Add Task function
function addTask(e){
  const newTask = task.value;
  if(newTask === '') {
    alert('Please add a task');
  }

  e.preventDefault();

  tasks.push(newTask);
  setLocalStorage(tasks);;
  
  createTaskHTML(newTask);

  // Clear form
  task.value = '';
}

function createTaskHTML(newTask){
  // Create new list item
  const li = document.createElement('li');
  li.classList.add('collection-item');
  li.innerText = newTask;

  // Create anchor and icon for deleting task
  const a = document.createElement('a');
  a.href = '#';
  a.classList.add('delete-item', 'secondary-content');
  const i = document.createElement('i');
  i.classList.add('fa', 'fa-remove');

  // Append new elements
  a.appendChild(i);
  li.appendChild(a);

  taskList.appendChild(li);
  
}

// Delete Task function
function deleteTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    const removedTask = e.target.parentElement.parentElement;
    removedTask.remove();
    tasks.splice(tasks.indexOf(removedTask), 1);
    setLocalStorage(tasks);
  }
}

// Clear Task list
function clearTasks() {
  if(confirm('Clear all tasks?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    tasks = [];
    setLocalStorage(tasks);
  }
}

// Filter task function
function filterTasks(e) {
  const filterText = e.target.value.toLowerCase();
  const tasksArray = document.querySelectorAll('li');
  
  tasksArray.forEach(function(task) {
    hideTasks(task, filterText);
  })
}

function hideTasks(task, filterText) {
  if(!task.innerText.toLowerCase().includes(filterText)){
    task.style.display = "none";
  }
  else if(task.innerText.toLowerCase().includes(filterText)){
    task.style.display = "block";
  }
}

function setTasksArray() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task) {
      createTaskHTML(task);
    })
  }
  return tasks
}

function setLocalStorage(arr) {
  localStorage.setItem('tasks', JSON.stringify(arr));
}