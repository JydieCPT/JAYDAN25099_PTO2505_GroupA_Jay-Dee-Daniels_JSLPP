/**
 * @typedef {Object} Task
 * @property {number} id - Unique identifier for the task
 * @property {string} title - Title of the task
 * @property {string} description - Description or details of the task
 * @property {'todo' | 'doing' | 'done'} status - Current status of the task
 * @property {string} board - Board or category this task belongs to
 */

/**
 * Array of predefined tasks used to seed the Kanban board on first load.
 * These tasks serve as initial data for the "Launch Career" board.
 * 
 * @type {Task[]}
 */
export const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
    board: "Launch Career",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
    board: "Launch Career",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
    board: "Launch Career",
  },
  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
    board: "Launch Career",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
    board: "Launch Career",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
    board: "Launch Career",
  },
];
