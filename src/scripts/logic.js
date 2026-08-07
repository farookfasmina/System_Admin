// Pure, DOM-free task logic — imported by test/logic.test.js in CI,
// and mirrored by the DOM wiring in app.js for the live app.

export function createTask(text, existingTasks = []) {
  const trimmed = (text || "").trim();
  if (!trimmed) return null;
  return {
    id: `${Date.now().toString(36)}-${existingTasks.length}`,
    text: trimmed,
    done: false,
  };
}

export function toggleTask(tasks, id) {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function removeTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

export function filterTasks(tasks, filter) {
  if (filter === "active") return tasks.filter((t) => !t.done);
  if (filter === "completed") return tasks.filter((t) => t.done);
  return tasks;
}

export function clearCompleted(tasks) {
  return tasks.filter((t) => !t.done);
}

export function countActive(tasks) {
  return tasks.filter((t) => !t.done).length;
}
