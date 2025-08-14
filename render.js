// render.js
import { saveTasks } from './storage.js';
import { setUpDnD } from './dnd.js';

let columns = {};
let counters = {};

/**
 * Initialize render with column & counter elements
 */
export function initRender(colRefs, counterRefs) {
  columns = colRefs;
  counters = counterRefs;
}

/**
 * Render all tasks into columns.
 * @param {Array} tasks
 */
export function renderAll(tasks) {
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

  setUpDnD(tasks, saveTasks, renderAll);
}

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
