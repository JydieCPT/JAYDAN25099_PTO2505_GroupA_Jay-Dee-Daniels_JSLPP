// main.js
import { loadTasks, saveTasks, loadTheme, saveTheme } from './storage.js';
import { fetchTasks } from './api.js';
import { initRender, renderAll } from './render.js';
import { initModal } from './modal.js';

let tasks = [];

// Element references
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const taskForm = document.getElementById('taskForm');
const themeSwitch = document.getElementById('themeSwitch');

const columns = {
  todo: document.getElementById('col-todo'),
  doing: document.getElementById('col-doing'),
  done: document.getElementById('col-done')
};
const counters = {
  todo: document.getElementById('count-todo'),
  doing: document.getElementById('count-doing'),
  done: document.getElementById('count-done')
};

// Theme init
document.documentElement.setAttribute('data-theme', loadTheme());
themeSwitch.checked = loadTheme() === 'dark';
themeSwitch.addEventListener('change', () => {
  const theme = themeSwitch.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  saveTheme(theme);
});

// Init render + modal
initRender(columns, counters);
initModal(addTaskBtn, closeModalBtn, modalOverlay, taskForm, (formData) => {
  const newTask = {
    id: Math.random().toString(36).slice(2) + Date.now().toString(36),
    title: formData.get('title').trim(),
    description: formData.get('description').trim(),
    status: formData.get('status')
  };
  tasks.push(newTask);
  saveTasks(tasks);
  renderAll(tasks);
});

// Load tasks
document.addEventListener('DOMContentLoaded', async () => {
  tasks = loadTasks();
  if (!tasks.length) {
    try {
      tasks = await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }
  renderAll(tasks);
});
