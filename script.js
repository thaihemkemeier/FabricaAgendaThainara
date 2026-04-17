let tasks = [];

// Permite adicionar tarefa com a tecla Enter
document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();

  if (!text) return;

  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = '';
  render();
}

function toggle(id) {
  tasks = tasks.map(function(t) {
    return t.id === id ? { id: t.id, text: t.text, done: !t.done } : t;
  });
  render();
}

function render() {
  const pend = tasks.filter(function(t) { return !t.done; });
  const done = tasks.filter(function(t) { return t.done; });

  document.getElementById('totalCount').textContent = tasks.length;
  document.getElementById('pendCount').textContent = pend.length;
  document.getElementById('doneCount').textContent = done.length;

  document.getElementById('emptyMsg').style.display = tasks.length === 0 ? 'block' : 'none';
  document.getElementById('pendSection').style.display = pend.length > 0 ? 'block' : 'none';
  document.getElementById('doneSection').style.display = done.length > 0 ? 'block' : 'none';

  document.getElementById('pendList').innerHTML = pend.map(taskHTML).join('');
  document.getElementById('doneList').innerHTML = done.map(taskHTML).join('');
}

function taskHTML(t) {
  return '<div class="task-item ' + (t.done ? 'done' : '') + '" onclick="toggle(' + t.id + ')">'
    + '<div class="checkbox ' + (t.done ? 'checked' : '') + '"></div>'
    + '<span class="task-text">' + t.text + '</span>'
    + '</div>';
}