import React, { useState } from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      currItem: {
        id: null,
        text: "",
        completed: false,
      },
      editing: false, // true if creating new todo item, false if editing existing.
    };

    // bind functions
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    // Get tasks from api. Called when updates occur.
    fetch("http://127.0.0.1:8000/api/list/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          todoList: data,
        });
      });
  }

  handleChange(e) {
    // Handle typing of todo item.
    let value = e.target.value;

    // Update current item.
    this.setState({
      currItem: {
        ...this.state.currItem,
        text: value,
      },
    });
  }

  handleSubmit(e) {
    // Create new item using api.
    e.preventDefault();
    console.log(this.state.currItem);

    var base_url = "http://127.0.0.1:8000/api/";

    if (this.state.editing == true) {
      // update item.
      base_url += `update/${this.state.currItem.id}/`;
      var method = "PUT";
      this.setState({
        editing: false,
      });
    } else {
      // create item.
      base_url += "create/";
      var method = "POST";
    }

    fetch(base_url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state.currItem),
    }).then((res) => {
      this.fetchTasks();
      // clear active item
      this.setState({
        currItem: {
          id: null,
          text: "",
          completed: false,
        },
      });
    });
  }

  makeEdit(todo) {
    // set current item to one that is being edited.
    this.setState({
      currItem: todo,
      editing: true,
    });
  }

  deleteItem(todo) {
    // delete item
    const url = `http://127.0.01:8000/api/delete/${todo.id}/`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      this.fetchTasks();
    });
  }

  toggleComplete(todo) {
    // Toggle completed value of todo and update on backend.
    todo.completed = !todo.completed;
    fetch(`http://127.0.0.1:8000/api/update/${todo.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: todo.completed,
        text: todo.text,
      }),
    }).then((res) => {
      this.fetchTasks();
    });
  }

  render() {
    // = Define self for use of 'this' in for loop.
    const self = this;
    return (
      <div className="container">
        <div className="main-text-wrapper">
          <h1 className="text-center">My Todo List</h1>
        </div>
        <div id="todo-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={this.handleSubmit}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Add task ..."
                    onChange={this.handleChange}
                    value={this.state.currItem.text}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    name="Add"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* List todos */}
          <div id="list-wrapper">
            {this.state.todoList.map((item, index) => {
              return (
                <div className="list-wrapper flex-wrapper" key={index}>
                  <div
                    style={{ flex: 8 }}
                    onClick={() => this.toggleComplete(item)}
                  >
                    {item.completed == true ? (
                      <strike>{item.text}</strike>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                  <div style={{ flex: 2 }}>
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => self.makeEdit(item)}
                    >
                      Edit
                    </button>
                  </div>
                  <div style={{ flex: 2 }}>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => self.deleteItem(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
