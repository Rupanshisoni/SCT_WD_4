
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      ${task.text} <br>
      <small>${new Date(task.datetime).toLocaleString()}</small>
      <div class="actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = document.getElementById('task-input').value.trim();
  const datetime = document.getElementById('task-datetime').value;
  if (text && datetime) {
    tasks.push({ text, datetime, completed: false });
    saveTasks();
    renderTasks();
    form.reset();
  }
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();
