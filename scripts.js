/* =========================
   State & Persistence
   ========================= */

/** @constant {string} Key used for saving tasks in localStorage */
const STORAGE_KEY = 'kanban.tasks';

/** @type {Array<Object>} All current tasks in memory */
let tasks = loadTasks();

/**
 * Load tasks from localStorage or return default seed tasks
 * @returns {Array<Object>} Array of task objects
 */
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  // Default seeded tasks
  return [
    { id: uid(), title: 'Launch Epic Career 🚀', description: '', status: 'todo' },
    { id: uid(), title: 'Conquer React 💜', description: '', status: 'todo' },
    { id: uid(), title: 'Understand Databases 🧠', description: '', status: 'todo' },
    { id: uid(), title: 'Crush Frameworks 📚', description: '', status: 'todo' },
    { id: uid(), title: 'Master JavaScript 💛', description: '', status: 'doing' },
    { id: uid(), title: 'Never Give Up 🏆', description: '', status: 'doing' },
    { id: uid(), title: 'Explore ES6 Features 🚀', description: '', status: 'done' },
    { id: uid(), title: 'Have fun🤯', description: '', status: 'done' }
  ];
}

/**
 * Save current tasks array to localStorage
 */
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* =========================
   Elements
   ========================= */

// General elements
const addTaskBtn = document.getElementById('addTaskBtn');
const modal = document.getElementById('taskModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskForm = document.getElementById('taskForm');
const themeSwitch = document.getElementById('themeSwitch');

// Sidebar toggling
const hideSidebarBtn = document.getElementById('hideSidebarBtn');
const showSidebarBtn = document.getElementById('showSidebarBtn');
const sidebar = document.getElementById('sidebar');

// Columns and counters
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

/* =========================
   Init
   ========================= */

/**
 * Initialize theme and render tasks on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  const storedTheme = localStorage.getItem('kanban.theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
  themeSwitch.checked = storedTheme === 'dark';

  renderAll();
});

/* =========================
   Theme Toggle
   ========================= */

/**
 * Toggle between light and dark theme
 */
themeSwitch.addEventListener('change', () => {
  const theme = themeSwitch.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('kanban.theme', theme);
});

/* =========================
   Sidebar Toggle
   ========================= */

/**
 * Hide the sidebar
 */
hideSidebarBtn.addEventListener('click', () => {
  sidebar.classList.add('hidden');
  showSidebarBtn.hidden = false;
});

/**
 * Show the sidebar
 */
showSidebarBtn.addEventListener('click', () => {
  sidebar.classList.remove('hidden');
  showSidebarBtn.hidden = true;
});

/* =========================
   Modal open/close
   ========================= */

/**
 * Show the task modal for creating a new task
 */
addTaskBtn.addEventListener('click', openModal);

/**
 * Close the task modal
 */
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/**
 * Open the modal and reset the form
 */
function openModal() {
  taskForm.reset();
  modal.hidden = false;
  modalOverlay.hidden = false;
  document.getElementById('title').focus();
}

/**
 * Close the modal
 */
function closeModal() {
  modal.hidden = true;
  modalOverlay.hidden = true;
}

/* =========================
   Create Task
   ========================= */

/**
 * Handle task form submission and add new task
 * @param {SubmitEvent} e 
 */
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!taskForm.reportValidity()) return;

  const formData = new FormData(taskForm);
  const newTask = {
    id: uid(),
    title: formData.get('title').trim(),
    description: formData.get('description').trim(),
    status: formData.get('status')
  };
  tasks.push(newTask);
  saveTasks();
  renderAll();
  closeModal();
});

/* =========================
   Render
   ========================= */

/**
 * Render all tasks into their respective columns
 */
function renderAll() {
  // Clear existing tasks
  Object.values(columns).forEach(col => col.innerHTML = '');

  const counts = { todo: 0, doing: 0, done: 0 };

  tasks.forEach(task => {
    counts[task.status]++;
    const el = createTaskElement(task);
    columns[task.status].appendChild(el);
  });

  counters.todo.textContent = `(${counts.todo})`;
  counters.doing.textContent = `(${counts.doing})`;
  counters.done.textContent = `(${counts.done})`;

  setUpDnD();
}

/**
 * Create a DOM element representing a task
 * @param {Object} task - Task object
 * @returns {HTMLElement} DOM element for task
 */
function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = 'task';
  div.draggable = true;
  div.dataset.id = task.id;

  const title = document.createElement('div');
  title.className = 'task-title';
  title.textContent = task.title;

  div.appendChild(title);
  return div;
}

/* =========================
   Drag & Drop
   ========================= */

/**
 * Set up drag-and-drop behavior for tasks
 */
function setUpDnD() {
  const taskEls = document.querySelectorAll('.task');
  const dropZones = document.querySelectorAll('.tasks');

  taskEls.forEach(task => {
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragend', handleDragEnd);
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('drop', handleDrop);
    zone.addEventListener('dragenter', () => zone.classList.add('drag-over'));
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  });
}

let draggedId = null;

/**
 * Handle task drag start event
 * @param {DragEvent} e 
 */
function handleDragStart(e) {
  draggedId = this.dataset.id;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

/**
 * Handle task drag end event
 */
function handleDragEnd() {
  this.classList.remove('dragging');
  draggedId = null;
}

/**
 * Allow drop target to accept a dragged item
 * @param {DragEvent} e 
 */
function handleDragOver(e) {
  e.preventDefault();
}

/**
 * Handle drop event and update task status
 * @param {DragEvent} e 
 */
function handleDrop(e) {
  e.preventDefault();
  const status = this.parentElement.dataset.status;
  const idx = tasks.findIndex(t => String(t.id) === String(draggedId));
  if (idx !== -1) {
    tasks[idx].status = status;
    saveTasks();
    renderAll();
  }
}

/* =========================
   Utils
   ========================= */

/**
 * Generate a unique ID string
 * @returns {string} Unique ID
 */
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
