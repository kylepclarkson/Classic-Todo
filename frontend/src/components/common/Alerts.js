import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * Users React-Alert to display messages to user.
 */
export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    console.log('Alert did update.')
    console.log('message', message)
    // check if new error is present
    if (error !== prevProps.error) {
      if (error.msg.name) {
        alert.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.email) {
        alert.error(`Name: ${error.msg.email.join()}`);
      }
      if (error.msg.message) {
        alert.error(`Name: ${error.msg.message.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors.join());
      }
      if (error.msg.username) {
        alert.error(error.msg.username.join());
      }
    }
    // Check if new message is present
    if (message !== prevProps.message) {
      if (message.deleteTodo) {
        alert.success(message.deleteTodo);
      }
      if (message.addTodo) {
        alert.success(message.addTodo);
      }
      if (message.passwordsNotMatch) {
        alert.error(message.passwordsNotMatch);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
