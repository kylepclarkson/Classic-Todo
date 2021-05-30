import axios from 'axios';

// TODO messages
import { GET_TODOS, DELETE_TODO, ADD_TODO } from './types'

import { addTokenConfig } from "./auth"

// GET TODOS
export const getTodos = () => (dispatch, getState) => {
    axios
        .get('http://localhost:8000/api/todos/', addTokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TODOS,
                payload: res.data
            })
        })
        .catch(err => {
            // TODO 
            // dispatch(returnErrors(err.response.data, err.response.status))
        })
}