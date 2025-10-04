const themeBtn = document.getElementById("themeBtn"); //motyw przycisk
const addBtn = document.getElementById("addBtn"); //dodaj zadanie przycisk
const input = document.getElementById("taskInput"); //input zadanie
const taskList = document.getElementById("taskList"); //lista tasków
const buttons = document.querySelectorAll(".btn"); //buttons
if (!themeBtn || !addBtn || !input || !taskList)
  throw new Error("Brak emelentu DOM!");
//--------------------------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") input.value = "";
  if (e.key === "Enter") addTask();
});
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 200);
  });
});
addBtn.addEventListener("click", () => {
  addTask();
});
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.body.classList.contains("light")
    ? (themeBtn.innerText = "Motyw ciemny")
    : (themeBtn.innerText = "Motyw jasny");
});

function addTask() {
  const title = input.value.trim();
  if (title != "") {
    const li = document.createElement("li");
    li.className = "task";
    li.textContent = title;
    taskList.appendChild(li);
    input.value = "";
  }
}
