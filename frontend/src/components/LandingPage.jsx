import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "./Topbar";
import Calender from "./Calender";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <Calender />
      </div>
    );
  }
}
export default LandingPage;
