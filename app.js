import {
  initData,
  getTasks,
  addTask as addTaskData,
  toggleTask,
  removeTask,
  clearAll as clearAllData,
  reorderTasks, // ← import
} from "./data.js";
import { bindUI, renderTasks, getEls, getElementAfterY } from "./ui.js";

// Mały stan UI (temat zostaje tutaj)
const view = { theme: "dark" };

function refresh() {
  renderTasks(getTasks());
}

function handleThemeToggle() {
  const { themeBtn } = getEls();
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeBtn.innerText = "Dark theme";
    view.theme = "light";
  } else {
    themeBtn.innerText = "Light theme";
    view.theme = "dark";
  }
}

// Start
initData();
bindUI({
  onAdd: (text) => {
    addTaskData(text);
    refresh();
  },
  onToggle: (id) => {
    toggleTask(id);
    refresh();
  },
  onRemove: (id) => {
    removeTask(id);
    refresh();
  },
  onClear: () => {
    clearAllData();
    refresh();
  },
  onThemeToggle: handleThemeToggle,
  onReorder: (ids) => {
    reorderTasks(ids);
    refresh();
  },
});
refresh();
