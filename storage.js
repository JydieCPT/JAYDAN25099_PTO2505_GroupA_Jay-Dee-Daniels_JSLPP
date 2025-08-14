// storage.js
const STORAGE_KEY = 'kanban.tasks';
const THEME_KEY = 'kanban.theme';

/**
 * Load tasks from local storage.
 * @returns {Array} Tasks array
 */
export function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

/**
 * Save tasks to local storage.
 * @param {Array} tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load theme preference from local storage.
 * @returns {string} 'light' or 'dark'
 */
export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

/**
 * Save theme preference to local storage.
 * @param {string} theme
 */
export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
