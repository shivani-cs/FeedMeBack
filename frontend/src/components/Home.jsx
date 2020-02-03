import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: localStorage.getItem("usertype")
    };
  }

  render() {
    let redirectVar = null;
    let a = localStorage.getItem("usertype");
    console.log("usertype " + a);
    if (a == "student") {
      redirectVar = <Redirect to="/homeStudent" />;
    } else {
      if (a == "interviewer") {
        redirectVar = <Redirect to="/homeInterviewer" />;
      } else {
        if (a == "admin") {
          redirectVar = <Redirect to="/homeAdmin" />;
        }
      }
    }
    return <div>{redirectVar}</div>;
  }
}

export default Home;
