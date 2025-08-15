/**
 * Opens a modal for creating or editing a task.
 *
 * The modal includes form fields for title, description, and priority, along
 * with save and delete actions. The priority dropdown dynamically changes style
 * based on the selected value.
 *
 * @param {Object} [task] - The task to edit. If omitted, a new task will be created.
 * @param {number} [task.id] - Unique identifier for the task.
 * @param {string} [task.title] - The title of the task.
 * @param {string} [task.description] - The description of the task.
 * @param {'high'|'medium'|'low'} [task.priority='medium'] - The priority level of the task.
 */
export function openModal(task) {
  /** 
   * @section Create modal elements
   * Creates the modal overlay and main modal container elements.
   * Inserts the HTML structure for the task form, including title,
   * description, priority select, and action buttons.
   */
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.innerHTML = `
    <div class="modal-header">
      <h2>${task ? 'Edit Task' : 'New Task'}</h2>
      <button class="close">&times;</button>
    </div>
    <div class="field">
      <label class="label" for="title">Title</label>
      <input type="text" id="title" value="${task?.title || ''}">
    </div>
    <div class="field">
      <label class="label" for="description">Description</label>
      <textarea id="description">${task?.description || ''}</textarea>
    </div>
    <div class="field">
      <label class="label" for="priority">Priority</label>
      <div class="select-wrapper">
        <select id="priority" class="priority-select">
          <option value="high" data-priority="high">High</option>
          <option value="medium" data-priority="medium">Medium</option>
          <option value="low" data-priority="low">Low</option>
        </select>
        <span class="chevron">▼</span>
      </div>
    </div>
    <div class="modal-actions">
      ${task ? '<button class="btn delete">Delete</button>' : ''}
      <button class="btn save">${task ? 'Save' : 'Add Task'}</button>
    </div>
  `;

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  /** 
   * @section Close modal handlers
   * Adds click event listeners to close the modal when the user clicks
   * the close button or outside the modal area.
   */
  modal.querySelector('.close').addEventListener('click', () => modalOverlay.remove());
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.remove();
  });

  /** 
   * @section Priority dropdown styling
   * Updates the CSS class of the select element to reflect the chosen priority.
   * Also ensures the initial state matches the provided task or defaults to "medium".
   */
  const prioritySelect = modal.querySelector('#priority');

  /**
   * Updates the select element's CSS class to match the current value.
   */
  function updatePriorityClass() {
    prioritySelect.classList.remove('high', 'medium', 'low');
    prioritySelect.classList.add(prioritySelect.value);
  }

  prioritySelect.addEventListener('change', updatePriorityClass);
  updatePriorityClass();

  if (task) {
    modal.querySelector('#priority').value = task.priority || 'medium';
    updatePriorityClass();
  }

  /** 
   * @section Save task handler
   * Collects input values from the modal and logs the updated task object.
   * Intended to be connected to a save or update function in the main app logic.
   */
  modal.querySelector('.save').addEventListener('click', () => {
    const updatedTask = {
      ...task,
      title: modal.querySelector('#title').value,
      description: modal.querySelector('#description').value,
      priority: modal.querySelector('#priority').value
    };
    // TODO: Integrate with save/update task logic
    console.log('Saving task:', updatedTask);
    modalOverlay.remove();
  });

  /** 
   * @section Delete task handler
   * Only shown when editing an existing task. Logs the task ID to be deleted.
   * Intended to be connected to a delete function in the main app logic.
   */
  if (task) {
    modal.querySelector('.delete').addEventListener('click', () => {
      // TODO: Integrate with delete task logic
      console.log('Deleting task:', task.id);
      modalOverlay.remove();
    });
  }
}
