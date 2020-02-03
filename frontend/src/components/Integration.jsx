import React, { Component } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

import "mdbreact/dist/css/mdb.css";

class Integration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const bgPink = { backgroundColor: "#e91e63" };
    const container = { height: 1300 };
    return (
      <div>
        <Router>
          <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                <strong>Feed-Me-Back</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav right>
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
          </header>
        </Router>
        <center>
          {" "}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 style={heading}>Integrations</h1>
          <br />
          <h3 style={heading}>
            Connect to Feed-Me-Back via
            <br />
            your favourite platforms!
          </h3>
        </center>
        <MDBContainer className="text-center my-5">
          <table>
            <tr>
              <td width="37%">
                <img src={require("./linkedin.jpg")} style={image} />
              </td>

              <td width="37%%">
                <img src={require("./twitter.png")} style={image} />
              </td>
              <td width="37%%">
                <img src={require("./glassdoor.png")} style={image} />
              </td>
            </tr>
          </table>
          <br />
          <br />
          <br />
          <table>
            <tr>
              <td width="37%">
                <img src={require("./facebook.png")} style={image} />
              </td>
              <nbsp /> <nbsp />
              <td width="37%">
                <img src={require("./google.png")} style={image} />
              </td>{" "}
              <nbsp /> <nbsp />
              <td width="37%">
                <img src={require("./indeed.png")} style={image} />
              </td>
            </tr>
          </table>
          <br />
          <br />
          <br />
          <table>
            <tr>
              <td width="37%">
                <img src={require("./wix.png")} style={image} />
              </td>

              <td width="37%%">
                <img src={require("./monster.png")} style={image} />
              </td>
              <td width="37%%">
                <img src={require("./handshake.jpg")} style={image} />
              </td>
            </tr>
          </table>
          <br />
          <br />
          <br />
        </MDBContainer>
      </div>
    );
  }
}
var space = {
  padding: 20,
  color: "#ffffff"
};
var heading = {
  color: "black"
};
var para = {
  fontSize: 50,
  fontfamily: "ArialRoundedMTBold"
};
var para1 = {
  fontSize: 25
};
const image = {
  height: 150,
  width: 350
};
export default Integration;
