import React, { Component } from "react";
import axios from "axios";

class login extends Component {
  constructor() {
    super();
    this.state = {
      username: " "
    };
  }
  render() {
    return (
      <form>
        <h1>Login</h1>
        <label>
          Name:
          <input type="text" name="username" />
        </label>
      </form>
    );
  }
}
const style = {
  margin: 15
};

export default login;
