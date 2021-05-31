import React, { Component } from "react";
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { addTodo } from '../actions/todos'

export class AddTodo extends Component {
    // STATE
    state = {
        text: ""
    }

    // PROP TYPES
    static propTypes = {
        addTodo: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    // set text. 
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // create new todo
    onSubmit = e => {
        e.preventDefault();
        const { text } = this.state;
        const todo = {
            user: this.props.auth.user.id,
            text,
            completed: false
        }
        this.props.addTodo(todo)
        this.setState({
            text: ""
        })
    }

  render() {
    return (
      <div id="form-wrapper">
        <form>
          <div className="flex-wrapper">
            <div style={{ flex: 8 }}>
              <input
                type="text"
                name="text"
                className="form-control"
                value={this.state.text}
                onChange={this.onChange}
                placeholder="Today I must ..."
              />
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="submit"
                id="submit"
                className="btn btn-success"
                name="submit"
                onClick={this.onSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { addTodo })(AddTodo);
