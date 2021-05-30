import { DELETE_TODO, GET_TODOS, ADD_TODO } from "../actions/types";

const initialState = {
  todos: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case DELETE_TODO:
      return {
        ...state,
        // Filter out the todo that was deleted.
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case ADD_TODO:
      return {
        ...state,
        // Add new todo to list.
        todos: [...state.todos, action.payload],
      };

    default:
      return state;
  }
}
