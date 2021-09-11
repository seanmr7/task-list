// Define variables
const form = document.querySelector('form');
const collection = document.querySelector('.collection');

// Add event listeners
form.addEventListener('submit', addTask);


// Add Task function
function addTask(e){
  e.preventDefault();
  
  const task = document.querySelector('#task').value;
  collection.appendChild(createTaskHTML(task));

}

function createTaskHTML(task){
  // Create new list item
  const li = document.createElement('li');
  li.classList.add('collection-item');
  li.innerText = task;

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