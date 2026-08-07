// Ledger — a small localStorage-backed todo app
// Data shape: { id: string, text: string, done: boolean }

const STORAGE_KEY = "ledger.tasks.v1";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const countLabel = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filters__btn");

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read saved tasks:", err);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  tasks.push({ id: makeId(), text: trimmed, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.done = !task.done;
  saveTasks();
  render();
}

function removeTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  render();
}

function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.done);
  if (currentFilter === "completed") return tasks.filter((t) => t.done);
  return tasks;
}

function render() {
  const visible = getVisibleTasks();
  list.innerHTML = "";

  visible.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "ledger__item" + (task.done ? " is-done" : "");

    const indexEl = document.createElement("span");
    indexEl.className = "ledger__index";
    indexEl.textContent = String(index + 1).padStart(2, "0");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "ledger__check";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.done ? "active" : "complete"}`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const textEl = document.createElement("span");
    textEl.className = "ledger__text";
    textEl.textContent = task.text;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "ledger__remove";
    removeBtn.textContent = "remove";
    removeBtn.setAttribute("aria-label", `Remove "${task.text}"`);
    removeBtn.addEventListener("click", () => removeTask(task.id));

    li.append(indexEl, checkbox, textEl, removeBtn);
    list.appendChild(li);
  });

  emptyState.hidden = visible.length !== 0;

  const activeCount = tasks.filter((t) => !t.done).length;
  countLabel.textContent = `${activeCount} item${activeCount === 1 ? "" : "s"} left`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
    render();
  });
});

render();
