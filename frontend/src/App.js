import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // state values
  const [todoList, setTodoList] = useState([]);
  const [currItem, setCurrItem] = useState({
    id: null,
    text: "",
    completed: false,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTasks()
  })

  // Get tasks from API. 
  const fetchTasks = () => (
    fetch("http://127.0.0.1:8000/api/list/")
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data)
      }))
  

  // Update currItem
  const handleChange = (e) => {
    let value = e.target.value;

    setCurrItem({
      ...currItem,
      text: value
    });
  }

  // delete currItem
  const deleteItem = (todo) => {
    const url = `http://127.0.01:8000/api/delete/${todo.id}/`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      fetchTasks();
    });
  }

  // set current item and editing
  const makeEdit = (todo) => {
    setCurrItem(todo);
    setEditing(true);
  }

  // toggle completed value of todo, update on backend. 
  const toggleCompleted = (todo) => {
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
      fetchTasks();
    });
  }

  // Interact with the API to create, edit or delete an item.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('current item: ', currItem);

    var base_url = "http://127.0.0.1:8000/api/";

    if (editing == true) {
      // update existing item.
      base_url += `update/${currItem.id}/`;
      var method = "PUT";
      setEditing(false);
    } else {
      // create new item.
      base_url += "create/";
      var method = "POST";
    }

    fetch(base_url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(currItem),
    }).then((res) => {
      fetchTasks();
      // clear currItem
      setCurrItem({
        id: null,
        text: "",
        completed: false,
      });
    });
  }

  return (
    <div className="container">
      <div className="main-text-wrapper">
        <h1 className="text-center">My Todo List</h1>
      </div>
      <div id="todo-container">
        <div id="form-wrapper">
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
              <div style={{ flex: 6 }}>
                <input
                  className="form-control"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Add task ..."
                  onChange={handleChange}
                  value={currItem.text}
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

        {/* List of todo items */}
        <div id="list-wrapper">
          {todoList.map((item, index) => {
            return (
              <div className="list-wrapper flex-wrapper" key={index}>
                <div
                    style={{ flex: 8 }}
                    onClick={() => toggleCompleted(item)}
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
                      onClick={() => makeEdit(item)}
                    >
                      Edit
                    </button>
                  </div>
                  <div style={{ flex: 2 }}>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteItem(item)}
                    >
                      Delete
                    </button>
                  </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
