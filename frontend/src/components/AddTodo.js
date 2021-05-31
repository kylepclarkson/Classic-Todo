import React, { Component } from "react";

export class AddTodo extends Component {
  render() {
    return (
      <div id="form-wrapper">
        <form>
          <div className="flex-wrapper">
            <div style={{flex: 6}}>
              <input 
                type="text" 
                className="form-change"
                id="text"
                name="text"
                placeholder="Today I must ..." />
            </div>
          </div>
          <div style={{flex:1}}>
            <input type="submit" id="submit" className="btn btn-success" name="Create"/>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTodo;
