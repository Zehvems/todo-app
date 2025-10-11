const buttons = document.querySelectorAll(".btn"); //Bottons
const themeBtn = document.getElementById("themeBtn");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

const input = document.getElementById("taskInput"); //Other
const taskList = document.getElementById("taskList");
const form = document.getElementById("taskForm");
const STORAGE_KEY = "tasks";
let idCounter = 1;

const state = { tasks: [], theme: "dark" }; //State
//--------------------------------------------------------------------------
if (!themeBtn || !saveBtn || !input || !taskList || !clearBtn || !form)
  throw new Error("Missing DOM element!");
try {
  state.tasks = load();
  renderTasks();
} catch (err) {
  console.error("Błąd przy wczytywaniu localStorage:", err);
  state.tasks = [];
}
document.body.classList.contains("light")
  ? (state.theme = "light")
  : (state.theme = "dark");

for (const task of state.tasks) {
  if (task.completed === true) {
    const id = task.id;
    const li = taskList.querySelector(`.task[data-id="${id}"]`);
    if (task.completed) li.classList.add("task--completed");
  }
}
//listeners----------------------------------------------------------------
clearBtn.addEventListener("click", () => {
  clearAll();
});
saveBtn.addEventListener("click", () => {
  save();
});
//KeyListener
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") input.value = "";
  if (e.key === "i") console.log(state);
});
//blink btn
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 200);
  });
});

//add task btn
form.addEventListener("submit", (e) => {
  e.preventDefault(); // zatrzymaj wysyłanie
  addTask();
});

//theme switch
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.body.classList.contains("light")
    ? ((themeBtn.innerText = "Dark theme"), (state.theme = "light"))
    : ((themeBtn.innerText = "Light theme"), (state.theme = "dark"));
});
//remove/complete task btn
taskList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  if (action !== "delete" && action !== "toggle") return; // AND

  const li = btn.closest(".task");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (action === "delete") {
    state.tasks = state.tasks.filter((t) => t.id !== id);
    li.remove();
  } else if (action === "toggle") {
    const t = state.tasks.find((t) => t.id === id);
    if (!t) return;
    t.completed = !t.completed;
    li.classList.toggle("task--completed");
  }
});
//functions------------------------------------------------------------------
//add task
function addTask() {
  //add task
  const title = input.value.trim();
  if (title != "") {
    const task = addToState(title, false);
    const li = createTaskNode(task);
    taskList.appendChild(li);
    input.value = "";
  }
}
//addtask to state , generate ID
function addToState(title) {
  const task = { id: Date.now() + idCounter++, title, completed: false };
  state.tasks.push(task);
  console.log("addToState() -> Added/returned task:", task);
  return task;
}
//tworzenie struktury taska
function createTaskNode(task) {
  const li = document.createElement("li");
  li.className = "task";
  li.dataset.id = task.id; // dla późniejszych akcji
  const name = document.createElement("span");
  name.className = "task__name";
  name.textContent = task.title;
  const actions = document.createElement("div");
  actions.className = "actions";
  const delBtn = document.createElement("button");
  delBtn.className = "btn-sm";
  delBtn.textContent = "Delete task";
  delBtn.dataset.action = "delete";
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn";
  toggleBtn.textContent = "Done";
  toggleBtn.dataset.action = "toggle";
  delBtn.type = "button";
  toggleBtn.type = "button";

  li.appendChild(name);
  li.appendChild(actions);
  actions.appendChild(delBtn);
  actions.appendChild(toggleBtn);
  return li;
}
function renderTasks() {
  taskList.innerHTML = "";
  for (const task of state.tasks) {
    taskList.appendChild(createTaskNode(task));
  }
}

function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
  state.tasks = [];
  taskList.innerHTML = "";
}
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
