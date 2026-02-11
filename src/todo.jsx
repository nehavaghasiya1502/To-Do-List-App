import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./todo.css";

function Todo() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (input.trim() === "") return;

    if (editId === null) {
      dispatch({ type: "ADD_TODO", payload: input });
    } else {
      dispatch({
        type: "EDIT_TODO",
        payload: { id: editId, text: input }
      });
      setEditId(null);
    }
    setInput("");
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
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
              <button className="edit" onClick={() => handleEdit(t.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
