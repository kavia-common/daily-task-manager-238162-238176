import React, { useMemo, useState } from "react";

/**
 * Home page for managing todos (add, complete, delete).
 * Note: This is a frontend-only implementation; backend integration can be added later.
 */
export default function HomePage() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => [
    { id: "seed-1", text: "Add your first todo", completed: false }
  ]);

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      { id: String(Date.now()), text: trimmed, completed: false },
      ...prev
    ]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="stack">
      <section className="card" aria-labelledby="todosTitle">
        <div className="rowBetween">
          <h1 id="todosTitle" className="pageTitle">
            Todos
          </h1>
          <div className="badge" aria-label={`${remainingCount} remaining`}>
            {remainingCount} remaining
          </div>
        </div>

        <form onSubmit={handleAdd} className="formRow" aria-label="Add todo">
          <label className="srOnly" htmlFor="newTodo">
            New todo
          </label>
          <input
            id="newTodo"
            className="input"
            type="text"
            value={text}
            placeholder="What do you need to do?"
            onChange={(e) => setText(e.target.value)}
            maxLength={140}
            autoComplete="off"
          />
          <button className="button" type="submit" disabled={!text.trim()}>
            Add
          </button>
        </form>
      </section>

      <section className="card" aria-label="Todo list">
        {todos.length === 0 ? (
          <p className="muted">No todos yet. Add one above.</p>
        ) : (
          <ul className="todoList">
            {todos.map((t) => (
              <li key={t.id} className="todoItem">
                <button
                  type="button"
                  className="checkButton"
                  aria-pressed={t.completed}
                  aria-label={
                    t.completed ? `Mark "${t.text}" incomplete` : `Mark "${t.text}" complete`
                  }
                  onClick={() => toggleTodo(t.id)}
                >
                  <span className={t.completed ? "checkDot checkDotOn" : "checkDot"} />
                </button>

                <div className="todoTextWrap">
                  <div className={t.completed ? "todoText todoTextDone" : "todoText"}>
                    {t.text}
                  </div>
                </div>

                <button
                  type="button"
                  className="iconButton"
                  aria-label={`Delete "${t.text}"`}
                  onClick={() => deleteTodo(t.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
