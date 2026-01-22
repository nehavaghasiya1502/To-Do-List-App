import React, { useState, useEffect } from "react";
import "./todo.css";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    console.log("Todos updated", todos);
  }, [todos]);

  const handleSubmit = () => {
    if (input.trim() === "") return;

    if (editId === null) {
      setTodos([...todos, { id: Date.now(), text: input }]);
    } else {
      setTodos(
        todos.map((t) =>
          t.id === editId ? { ...t, text: input } : t
        )
      );
      setEditId(null);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const selected = todos.find((t) => t.id === id);
    setInput(selected.text);
    setEditId(id);
  };

  return (
    <div className="todo-container">
      <h2>My To-Do List</h2>

      <div className="todo-input-box">
        <input
          type="text"
          placeholder="Enter your task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id}>
            <span>{t.text}</span>
            <div>
              <button className="edit" onClick={() => handleEdit(t.id)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
