const themeBtn = document.getElementById("themeBtn"); //motyw przycisk
const addBtn = document.getElementById("addBtn"); //dodaj zadanie przycisk
const input = document.getElementById("taskInput"); //input zadanie
const taskList = document.getElementById("taskList"); //lista tasków
const buttons = document.querySelectorAll(".btn"); //buttons
const state = { tasks: [], theme: "dark" }; // Struktura zadań, id, title, completed
let idCounter = 1;
if (!themeBtn || !addBtn || !input || !taskList)
  throw new Error("Brak emelentu DOM!");
//--------------------------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") input.value = "";
  if (e.key === "Enter") addTask();
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
function addToState(title) {
  const task = { id: Date.now() + idCounter++, title, completed: false };
  state.tasks.push(task);
  console.log("addToState() -> Added/returned task:", task);
  return task;
}

document.body.classList.contains("light")
  ? (state.theme = "white")
  : (state.theme = "black");

function createTaskNode(task) {
  //tworzenie struktury taska
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

  li.appendChild(actions);
  li.appendChild(name);
  actions.appendChild(delBtn);
  return li;
}
