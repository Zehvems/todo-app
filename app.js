const themeBtn = document.getElementById("themeBtn"); //motyw przycisk
const addBtn = document.getElementById("addBtn"); //dodaj zadanie przycisk
const input = document.getElementById("taskInput"); //input zadanie
const taskList = document.getElementById("taskList"); //lista tasków
const buttons = document.querySelectorAll(".btn"); //buttons
if (!themeBtn || !addBtn || !input || !taskList)
  throw new Error("Brak emelentu DOM!");
//--------------------------------------------------------------------------

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 200);
  });
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
