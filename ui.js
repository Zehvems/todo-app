export function getEls() {
  return {
    form: document.getElementById("taskForm"),
    input: document.getElementById("taskInput"),
    taskList: document.getElementById("taskList"),
    clearBtn: document.getElementById("clearBtn"),
    themeBtn: document.getElementById("themeBtn"),
  };
}

export function createTaskNode(task) {
  const li = document.createElement("li");
  li.className = "task";
  li.dataset.id = task.id;
  li.draggable = true;
  if (task.completed) li.classList.add("task--completed");

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

  actions.appendChild(delBtn);
  actions.appendChild(toggleBtn);
  li.appendChild(name);
  li.appendChild(actions);
  return li;
}
export function getElementAfterY(container, y) {
  const items = [...container.querySelectorAll(".task:not(.dragging)")];
  return items.find((el) => {
    const rect = el.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    return y <= mid; // pierwsze, którego środek jest poniżej kursora
  });
}
export function renderTasks(tasks) {
  const { taskList } = getEls();
  taskList.innerHTML = "";
  for (const t of tasks) taskList.appendChild(createTaskNode(t));
}

/** Podłącza zdarzenia i deleguje do handlerów z app.js */
export function bindUI({
  onAdd,
  onToggle,
  onRemove,
  onClear,
  onThemeToggle,
  onReorder,
}) {
  const { form, input, taskList, clearBtn, themeBtn } = getEls();

  if (!form || !input || !taskList || !clearBtn || !themeBtn)
    throw new Error("Missing DOM element!");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;
    onAdd(title);
    input.value = "";
  });

  taskList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const li = btn.closest(".task");
    if (!li) return;
    const id = Number(li.dataset.id);
    if (btn.dataset.action === "delete") onRemove(id);
    else if (btn.dataset.action === "toggle") onToggle(id);
  });
  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = taskList.querySelector(".task.dragging");
    if (!dragging) return;
    const after = getElementAfterY(taskList, e.clientY);
    if (!after) taskList.appendChild(dragging);
    else taskList.insertBefore(dragging, after);
  });
  taskList.addEventListener("dragstart", (e) => {
    const li = e.target.closest(".task");
    if (!li) return;
    li.classList.add("dragging");
  });

  taskList.addEventListener("dragend", (e) => {
    const li = e.target.closest(".task");
    if (!li) return;
    li.classList.remove("dragging");
    const ids = [...taskList.querySelectorAll(".task")].map((li) =>
      Number(li.dataset.id)
    );
    onReorder?.(ids);
  });
  clearBtn.addEventListener("click", () => onClear());

  themeBtn.addEventListener("click", () => {
    onThemeToggle?.();
  });
}
