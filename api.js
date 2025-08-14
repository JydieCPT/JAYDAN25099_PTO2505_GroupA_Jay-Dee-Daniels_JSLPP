// api.js
import { saveTasks } from './storage.js';

const API_URL = 'https://jsl-kanban-api.vercel.app/';

/**
 * Fetch tasks from API.
 * @returns {Promise<Array>} Tasks array
 */
export async function fetchTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  const tasks = await res.json();
  saveTasks(tasks);
  return tasks;
}
