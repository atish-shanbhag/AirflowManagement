const express = require('express');
let cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addNewTask(taskId, text, priority, tasks) {
  let task = { taskId, text, priority };
  tasks.push(task);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addNewTask(taskId, text, priority, tasks);
  res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

function sortByPriority(tasks) {
  return tasks.sort((a, b) => a.priority - b.priority);
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = sortByPriority(tasks);
  res.json({ tasks: result });
});

app.get('/tasks/edit-priority', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);

  const task = tasks.find((t) => t.taskId === taskId);

  task.priority = priority;
  return res.json({ tasks });
});

app.get('/tasks/edit-text', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;

  const task = tasks.find((t) => t.taskId === taskId);

  task.text = text;
  return res.json({ tasks });
});

app.get('/tasks/delete', (req, res) => {
  const taskId = parseInt(req.query.taskId);

  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.taskId !== taskId);

  return res.json({ tasks });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  const priority = parseInt(req.query.priority);

  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.priority === priority);

  return res.json({ tasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
