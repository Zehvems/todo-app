let tasks = [];
const STORAGE_KEY = "tasks";
let idCounter = 1;
export function reorderTasks(orderIds) {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const reordered = orderIds.map((id) => byId.get(id)).filter(Boolean);
  // dopnij ewentualne brakujące (gdyby coś nie było w DOM)
  for (const t of tasks) if (!orderIds.includes(t.id)) reordered.push(t);
  tasks = reordered;
  save(tasks);
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function initData() {
  tasks = load();
}
export function getTasks() {
  return tasks.slice();
}

export function addTask(title) {
  const t = { id: Date.now() + idCounter++, title, completed: false };
  tasks.push(t);
  save(tasks);
  return t;
}
export function toggleTask(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  save(tasks);
}
export function removeTask(id) {
  tasks = tasks.filter((x) => x.id !== id);
  save(tasks);
}
export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
  tasks = [];
}
