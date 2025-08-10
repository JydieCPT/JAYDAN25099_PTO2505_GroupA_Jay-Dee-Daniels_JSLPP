// =========================
// Modal open/close
// =========================

/**
 * Open the task creation modal and reset the form.
 * Focuses the title input field for immediate user input.
 */
function openModal() {
  taskForm.reset();
  modal.hidden = false;
  modalOverlay.hidden = false;
  document.getElementById('title').focus();
}

/**
 * Close the task modal and hide its overlay.
 */
function closeModal() {
  modal.hidden = true;
  modalOverlay.hidden = true;
}

// Event listeners for opening and closing the modal
addTaskBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

/**
 * Close the modal when Escape key is pressed
 * @param {KeyboardEvent} e
 */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
