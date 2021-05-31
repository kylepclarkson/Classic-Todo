import axios from "axios";

// TODO messages
import { GET_TODOS, DELETE_TODO, ADD_TODO, TOGGLE_TODO } from "./types";

import { addTokenConfig } from "./auth";

// GET TODOS
export const getTodos = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/todos/", addTokenConfig(getState))
    .then((res) => {
      console.log("todos: ", res.data);
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("error getting todos", err);
      // TODO
      // dispatch(returnErrors(err.response.data, err.response.status))
    });
};

// DELETE TODO
export const deleteTodo = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/todos/${id}`, addTokenConfig(getState))
    .then((res) => {
      // TODO
      // dispatch(createMessage({ deleteTodo: 'Item deleted'}))
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
    })
    .catch((err) => console.log("error deleting todo", err));
};

// ADD TODO
export const addTodo = (todo) => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/todos/", todo, addTokenConfig(getState))
    .then((res) => {
      // TODO
      // dispatch(createMessage({ addTodo: 'Todo added'}))
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
    });
  // .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

// TOGGLE TODO
export const toggleTodo = (todo) => (dispatch, getState) => {
  console.log('Todo before call', todo)
  const body = JSON.stringify({
    ...todo,
    completed: !todo.completed,
  });
  axios
    .put(
      `http://localhost:8000/api/todos/${todo.id}/`,
      body,
      addTokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: TOGGLE_TODO,
        payload: res.data,
      });
    })
    .catch(err => console.log('toggle: ', err));
};
