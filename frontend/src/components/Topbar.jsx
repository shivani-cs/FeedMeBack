import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBMask,
  MDBView
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "mdbreact/dist/css/mdb.css";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div>
        <header>
          <Router>
            <MDBNavbar
              color="bg-primary"
              fixed="top"
              dark
              expand="md"
              scrolling
              transparent
            >
              <MDBNavbarBrand href="/">
                <div style={para}>Feed-Me-Back</div>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && (
                <MDBNavbarToggler onClick={this.onClick} />
              )}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav right style={para1}>
                  <MDBNavItem>
                    <a href="./" style={space}>
                      Features
                    </a>
                    {"    "}
                  </MDBNavItem>
                  <MDBNavItem>
                    <a href="./integration" style={space}>
                      Integration
                    </a>
                  </MDBNavItem>{" "}
                  <MDBNavItem>
                    <a href="./login" style={space}>
                      Login
                    </a>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </Router>

          <MDBView src={require("./image.jpg")}>
            <MDBMask
              overlay="purple-light"
              className="flex-center flex-column text-white text-center"
            >
              <br />
              <br />
              <br />
              <br />
              <h2>
                Make Interview scheduling and giving feedback a piece of Cake
              </h2>
              <br />
              <h5>
                Smarter way of scheduling Appointments, Interviews
                <br />
                <br />
                and Feedback.
              </h5>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}
var para = {
  fontSize: 50,
  fontfamily: "ArialRoundedMTBold"
};
var para1 = {
  fontSize: 25
};
var space = {
  padding: 20,
  color: "#ffffff"
};
export default Topbar;
