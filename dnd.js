// dnd.js
export function setUpDnD(tasks, saveTasks, renderAll) {
  const taskEls = document.querySelectorAll('.task');
  const dropZones = document.querySelectorAll('.tasks');
  let draggedId = null;

  taskEls.forEach(task => {
    task.addEventListener('dragstart', e => {
      draggedId = task.dataset.id;
      task.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    task.addEventListener('dragend', () => {
      task.classList.remove('dragging');
      draggedId = null;
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', () => {
      const status = zone.parentElement.dataset.status;
      const idx = tasks.findIndex(t => String(t.id) === String(draggedId));
      if (idx !== -1) {
        tasks[idx].status = status;
        saveTasks(tasks);
        renderAll(tasks);
      }
    });
  });
}
