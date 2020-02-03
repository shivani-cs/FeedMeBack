import React, { Component } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import "./leftbar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    console.log("inside logout");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("usertype");
    localStorage.removeItem("company");
    localStorage.removeItem("gender");
  };
  render() {
    let navLogin = null;

    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="/" onClick={this.handleLogout}>
            <Button variant="light" style={style}>
              Logout
            </Button>
          </a>
        </li>
      </ul>
    );

    return (
      <div>
        <div className="header"></div>
        <div className="topcorner"> {navLogin}</div>
      </div>
    );
  }
}

const style = {
  margin: 20,
  color: "#bd0d39",
  top: 10,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontStyle: "normal"
  //border: "solid #bd0d39"
};
export default NavBar;
