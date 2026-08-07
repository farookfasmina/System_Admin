import test from "node:test";
import assert from "node:assert/strict";
import {
  createTask,
  toggleTask,
  removeTask,
  filterTasks,
  clearCompleted,
  countActive,
} from "../src/scripts/logic.js";

test("createTask trims text and returns a task object", () => {
  const task = createTask("  Buy milk  ");
  assert.equal(task.text, "Buy milk");
  assert.equal(task.done, false);
  assert.ok(task.id);
});

test("createTask returns null for empty/whitespace input", () => {
  assert.equal(createTask("   "), null);
  assert.equal(createTask(""), null);
});

test("toggleTask flips done state for the matching task only", () => {
  const tasks = [
    { id: "1", text: "a", done: false },
    { id: "2", text: "b", done: false },
  ];
  const updated = toggleTask(tasks, "1");
  assert.equal(updated.find((t) => t.id === "1").done, true);
  assert.equal(updated.find((t) => t.id === "2").done, false);
});

test("removeTask removes only the matching task", () => {
  const tasks = [
    { id: "1", text: "a", done: false },
    { id: "2", text: "b", done: false },
  ];
  const updated = removeTask(tasks, "1");
  assert.equal(updated.length, 1);
  assert.equal(updated[0].id, "2");
});

test("filterTasks returns active, completed, or all tasks correctly", () => {
  const tasks = [
    { id: "1", text: "a", done: false },
    { id: "2", text: "b", done: true },
  ];
  assert.equal(filterTasks(tasks, "active").length, 1);
  assert.equal(filterTasks(tasks, "completed").length, 1);
  assert.equal(filterTasks(tasks, "all").length, 2);
});

test("clearCompleted removes all done tasks", () => {
  const tasks = [
    { id: "1", text: "a", done: false },
    { id: "2", text: "b", done: true },
  ];
  const updated = clearCompleted(tasks);
  assert.equal(updated.length, 1);
  assert.equal(updated[0].id, "1");
});

test("countActive counts only tasks that are not done", () => {
  const tasks = [
    { id: "1", text: "a", done: false },
    { id: "2", text: "b", done: true },
    { id: "3", text: "c", done: false },
  ];
  assert.equal(countActive(tasks), 2);
});
