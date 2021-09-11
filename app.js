// Define variables
const form = document.querySelector('#task-form');
const task = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#clear-tasks');
const filterBar = document.querySelector('#filter');


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
  
  taskList.appendChild(createTaskHTML(newTask));

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

  return li;
}

// Delete Task function
function deleteTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

// Clear Task list
function clearTasks(e) {
  if(confirm('Clear all tasks?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

// Filter task function
function filterTasks(e) {
  const filterValue = e.target.value.toLowerCase();
  const tasksArray = Array.from(document.querySelectorAll('li'));
  
  tasksArray.forEach(function(task) {
    hideTasks(task, filterValue);
  })
}

function hideTasks(task, filterValue) {
  if(!task.innerText.toLowerCase().includes(filterValue)){
    task.style.display = "none";
  }
  else if(task.innerText.toLowerCase().includes(filterValue)){
    task.style.display = "block";
  }
}