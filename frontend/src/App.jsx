import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await fetch("/api/v1/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setText("");
      setLoading(false);
      fetchTodos();
    } catch (e) {
      toast.error("Error Adding Todo");
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    const res = await fetch("/api/v1/todo");
    const data = await res.json();
    setTodos(data);
  };

  const remove = async (id) => {
    await fetch(`/api/v1/todo/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const toggle = async (id) => {
    await fetch(`/api/v1/todo/${id}`, { method: "PUT" });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1>Simple-List Todo</h1>
        <form
          style={{ display: "flex", gap: 8, marginBottom: 16 }}
          onSubmit={addTodo}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            style={{ flex: 1, padding: 8 }}
          />
          <button type="submit" disabled={loading}>
            Add
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((t) => (
            <li
              key={t._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t._id)}
              />
              <span
                style={{ textDecoration: t.done ? "line-through" : "none" }}
              >
                {t.text}
              </span>
              <button
                onClick={() => remove(t._id)}
                style={{ marginLeft: "auto" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
