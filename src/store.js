import { createStore } from "redux";

const initialState = {
  todos: JSON.parse(localStorage.getItem("myTodos")) || []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const updatedTodos = [
        ...state.todos,
        { id: Date.now(), text: action.payload }
      ];
      localStorage.setItem("myTodos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
    }

    case "DELETE_TODO": {
      const updatedTodos = state.todos.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem("myTodos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
    }

    case "EDIT_TODO": {
      const updatedTodos = state.todos.map((t) =>
        t.id === action.payload.id
          ? { ...t, text: action.payload.text }
          : t
      );
      localStorage.setItem("myTodos", JSON.stringify(updatedTodos));
      return { ...state, todos: updatedTodos };
    }

    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
