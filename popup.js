const newTaskInput = document.getElementById('newTask');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

function loadTasks() {
  chrome.storage.local.get(['tasks'], (result) => {
    tasks = result.tasks || [];
    renderTasks();
  });
}

function saveTasks() {
  chrome.storage.local.set({ tasks: tasks });
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const delButton = document.createElement('button');
    delButton.innerHTML = '&times;';
    delButton.className = 'delete-btn';
    delButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delButton);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const text = newTaskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    newTaskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

loadTasks();
