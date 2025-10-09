const themeBtn = document.getElementById("themeBtn"); //motyw przycisk
const addBtn = document.getElementById("addBtn"); //dodaj zadanie przycisk
const input = document.getElementById("taskInput"); //input zadanie
const taskList = document.getElementById("taskList"); //lista tasków
const buttons = document.querySelectorAll(".btn"); //buttons
const state = { tasks: [], theme: "dark" }; // Struktura zadań, id, title, completed
let idCounter = 1;
//--------------------------------------------------------------------------
if (!themeBtn || !addBtn || !input || !taskList)
  throw new Error("Brak emelentu DOM!");

document.body.classList.contains("light")
  ? (state.theme = "white")
  : (state.theme = "black");

for (const task of state.tasks) {
  if (task.completed === true) {
    const id = task.id;
    const li = taskList.querySelector(`.task[data-id="${id}"]`);
    if (!li) throw new Error("Brak elementu listy zdanym id ");
    li.classList.add("task--completed");
  }
}

//listeners----------------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") input.value = "";
  if (e.key === "Enter") addTask();
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
addBtn.addEventListener("click", () => {
  addTask();
});
//theme switch
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.body.classList.contains("light")
    ? ((themeBtn.innerText = "Motyw ciemny"), (state.theme = "white"))
    : ((themeBtn.innerText = "Motyw jasny"), (state.theme = "black"));
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
  delBtn.textContent = "🗑";
  delBtn.dataset.action = "delete";
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn";
  toggleBtn.textContent = "✓";
  toggleBtn.dataset.action = "toggle";

  li.appendChild(actions);
  li.appendChild(name);
  actions.appendChild(delBtn);
  actions.appendChild(toggleBtn);
  return li;
}
