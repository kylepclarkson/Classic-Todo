import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTodos, deleteTodo, toggleTodo } from "../actions/todos";

import AddTodo from "./AddTodo";

export class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    getTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Get todo items
    this.props.getTodos();
  }

  render() {
    return (
      <div className="container mx-auto">
        <AddTodo />
        <div className="todo-container">
          <div id="list-wrapper">
            {this.props.todos.map((todo) => (
              <div key={todo.id} className="task-wrapper flex-wrapper">
                <div 
                    style={{ flex: 7 }}
                    onClick={() => this.props.toggleTodo.bind(this, todo)} >
                  {todo.completed ? (
                    <span>{todo.text}</span>
                  ) : (
                    <strike>{todo.text}</strike>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <button className="btn btn-sm btn-outline-info">Edit</button>
                </div>
                <div 
                    style={{ flex: 1 }}
                    onClick={this.props.deleteTodo.bind(this, todo.id)} >
                  <button className="btn btn-sm btn-outline-dark">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

export default connect(mapStateToProps, { getTodos, deleteTodo, toggleTodo })(TodoList);
