import axios from "axios";

import { createMessage, returnErrors } from './messages'
import { GET_TODOS, DELETE_TODO, ADD_TODO, TOGGLE_TODO } from "./types";

import { addTokenConfig } from "./auth";

// GET TODOS
export const getTodos = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/todos/", addTokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
    });
};

// DELETE TODO
export const deleteTodo = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/todos/${id}/`, addTokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteTodo: 'Item deleted'}))
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
    })
    .catch((err) => console.log("error deleting todo", err));
};

// ADD TODO
export const addTodo = (todo) => (dispatch, getState) => {
  console.log('adding todo: ', todo)
  axios
    .post("http://localhost:8000/api/todos/", todo, addTokenConfig(getState))
    .then((res) => {
      console.log('add resp:', res)
      dispatch(createMessage({ addTodo: "Todo added" }));
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// TOGGLE TODO
export const toggleTodo = (todo) => (dispatch, getState) => {
  console.log("Todo before call", todo);
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
    .catch((err) => console.log("toggle: ", err));
};
